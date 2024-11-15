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
            const ariaLabel = videoTitleElement ? videoTitleElement.getAttribute('aria-label') : '';
            const videoTitle = videoTitleElement ? videoTitleElement.textContent.trim() : '无标题';

            if (videoTitle === '无标题') {
                return;
            }

            const uploaderMatch = ariaLabel.match(/上傳者：(.+?) 觀看次數/);
            const viewsMatch = ariaLabel.match(/觀看次數：([\d,]+次)/);
            const channelName = uploaderMatch ? uploaderMatch[1] : '未知上传者';
            const viewCount = viewsMatch ? viewsMatch[1].replace(/[,次]/g, '') : '0';

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

            this.injectButton(videoTitleElement,videoTitle, channelName);
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