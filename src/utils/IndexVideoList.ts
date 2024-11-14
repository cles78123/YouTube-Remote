import {showCustomPopup} from "../pages/modal/main.ts";

export class IndexVideoList {
    getVideos() {
        return document.querySelectorAll('ytd-rich-item-renderer:not([style*="display: none"])');
    }

    checkByKeyword(video, keyword) {
        if (!video.title) return false;
        const keywordsArray = keyword.split('\n').filter(k => k.trim() !== '');
        return keywordsArray.some(k => video.title.includes(k));
    }

    checkByViewCount(video, viewCounts) {
        if (!video.viewCount) return false;
        const viewCountsArray = viewCounts.split('\n').filter(vc => vc.trim() !== '');
        return viewCountsArray.some(vc => video.viewCount < parseInt(vc, 10));
    }

    checkByChannelName(video, channelNames) {
        if (!video.channelName) return false;
        const channelNamesArray = channelNames.split('\n').filter(cn => cn.trim() !== '');
        return channelNamesArray.some(cn => video.channelName.includes(cn));
    }

    checkByWatched(video, WatchedVideos) {
        if (!video.title) return false;
        const WatchedVideosArray = WatchedVideos.split('\n').filter(wv => wv.trim() !== '');
        return WatchedVideosArray.some(wv => wv == video.title);
    }

    removeElement(element) {
        element.style.display = 'none';
    }

    processVideos(conditions) {
        const videos = this.getVideos();
        let number = videos.length;

        videos.forEach((item) => {
            const videoTitleElement = item.querySelector('h3 a');
            const videoDetail = item.querySelectorAll('.yt-content-metadata-view-model-wiz__metadata-text');

            const videoTitle = videoTitleElement ? videoTitleElement.textContent.trim() : '无标题';

            if (videoTitle === '无标题') {
                return;
            }

            const viewCount = parseViewCount(videoDetail[1].textContent.trim());
            const channelName = videoDetail[0].textContent;

            const card = {
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

            this.injectButton(videoDetail[2], videoTitle, channelName);
        });

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

function parseViewCount(viewCountText) {
    viewCountText = viewCountText.replace('觀看次數：', '').replace('次', '');

    const hasWan = viewCountText.includes('萬');
    const hasYi = viewCountText.includes('億');

    let count = parseFloat(viewCountText.replace('萬', '').replace('億', ''));

    if (hasYi) {
        count *= 100000000;
    } else if (hasWan) {
        count *= 10000;
    }

    return count;
}