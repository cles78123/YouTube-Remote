import {showCustomPopup} from "../pages/modal/main.ts";
import {saveAppearedVideos} from "../modules/storage.ts";

export class IndexVideoList {
    getVideos() {
        return document.querySelectorAll('ytd-rich-item-renderer:not([style*="display: none"])');
    }

    checkByVideosName(video, videosName) {
        if (!video.title) return false;
        return videosName.has(video.title);
    }

    checkByKeyword(video, keyword) {
        if (!video.title) return false;
        return keyword.some(k => video.title.includes(k));
    }

    checkByViewCount(video, viewCounts) {
        if (!video.viewCount) return false;
        return viewCounts.some(vc => video.viewCount < parseInt(vc, 10));
    }

    checkByChannelName(video, channelNames) {
        if (!video.channelName) return false;
        return channelNames.has(video.channelName);
    }

    checkByChannelKeyword(video, channelNames) {
        if (!video.channelName) return false;
        return channelNames.some(cn => video.channelName.includes(cn));
    }

    checkByWatched(video, WatchedVideos) {
        if (!video.title) return false;
        return WatchedVideos.has(video.title);
    }

    checkLimitOccurrencesInChannel(cards, limitOccurrencesInChannel) {
        const groupedByChannel = cards.reduce((acc, card) => {
            if (!acc[card.channelName]) {
                acc[card.channelName] = [];
            }
            acc[card.channelName].push(card);
            return acc;
        }, {});

        let totalBlocked = 0;
        const titlesToRemove = new Set();

        Object.values(groupedByChannel).forEach(cardsGroup => {
            if (cardsGroup.length > limitOccurrencesInChannel) {
                const videosToRemove = cardsGroup.slice(limitOccurrencesInChannel);
                videosToRemove.forEach(video => {
                    this.removeElement(video.item);
                    titlesToRemove.add(video.title); // 将需要删除的视频标题添加到集合中
                });
                totalBlocked += videosToRemove.length;
            }
        });

        return [totalBlocked, cards.filter(card => !titlesToRemove.has(card.title))];
    }

    triggerOnExceedCount(video, exceedCount, appearedVideos) {
        if (!video.title||!appearedVideos) return false;
        const target = appearedVideos[video.title];
        return target && target > exceedCount;
    }

    removeElement(element) {
        element.style.display = 'none';
    }

    processVideos(conditions, timestamp) {
        const videos = this.getVideos();
        let number = videos.length;
        let cards = [];
        let limitOccurrencesInChannel;

        if (conditions.limitOccurrencesInChannel) {
            limitOccurrencesInChannel = conditions.limitOccurrencesInChannel;
            delete conditions.limitOccurrencesInChannel;
        }

        videos.forEach((item) => {
            const videoTitleElement = item.querySelector('h3 a');
            const ariaLabel = videoTitleElement ? videoTitleElement.getAttribute('aria-label') : null;
            const videoTitle = videoTitleElement ? videoTitleElement.textContent.trim() : null;
            let uploaderMatch;
            let viewsMatch;
            let channelName;
            let viewCount;

            if (!videoTitle || !videoTitleElement) {
                return;
            }

            if (ariaLabel) {
                uploaderMatch = ariaLabel.match(/上傳者：(.+?) 觀看次數/);
                viewsMatch = ariaLabel.match(/觀看次數：([\d,]+次)/);
                channelName = uploaderMatch ? uploaderMatch[1] : '未知上传者';
                viewCount = viewsMatch ? viewsMatch[1].replace(/[,次]/g, '') : '0';
            } else {
                channelName = null;
                viewCount = 0;
            }

            const card = {
                item: item,
                title: videoTitle,
                viewCount: viewCount,
                channelName: channelName
            };

            let shouldRemove = conditions.some(condition => condition(card));

            if (shouldRemove) {
                this.removeElement(item);
                number--;
                return;
            }

            cards.push(card);
            this.injectButton(videoTitleElement, videoTitle, channelName);
        });

        if (limitOccurrencesInChannel) {
            let blockedNumber;

            [blockedNumber, cards] = this.checkLimitOccurrencesInChannel(cards, limitOccurrencesInChannel);
            number = number - blockedNumber;
        }

        saveAppearedVideos(cards, timestamp);
        chrome.storage.local.set({'countBlockedVideos': number.toString()});
    }

    injectButton(target, videoTitle, channelName) {
        if (!target) return;

        const existingButton = target.nextElementSibling;

        if (existingButton && existingButton.tagName === 'BUTTON' && existingButton.textContent === 'X') {
            return;
        }

        const button = document.createElement('button');
        button.textContent = 'X';

        target.after(button);

        button.addEventListener('click', () => {
            showCustomPopup(videoTitle, channelName);
        });
    }
}