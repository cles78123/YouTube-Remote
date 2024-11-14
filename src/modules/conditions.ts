export function isYouTubePage(url) {
    return url === 'https://www.youtube.com/';
}

export function isYouTubeWatchPage(url) {
    return url.includes('https://www.youtube.com/watch');
}

export function checkShouldBlock(countVideosOnPage, countBlockedVideos) {
    return countVideosOnPage != countBlockedVideos;
}

export function loadVideoBlockConditions(videoList, storage) {
    let conditions = [];

    if (storage.blockViewCount && storage.blockViewCountList) {
        conditions.push((video) => videoList.checkByViewCount(video, storage.blockViewCountList));
    }
    if (storage.blockVideoKeyword && storage.blockVideoKeywordList) {
        conditions.push((video) => videoList.checkByKeyword(video, storage.blockVideoKeywordList));
    }
    if (storage.blockChannelKeyword && storage.blockChannelKeywordList) {
        conditions.push((video) => videoList.checkByChannelName(video, storage.blockChannelKeywordList));
    }
    if (storage.blockWatchedVideos && storage.blockWatchedVideosList) {
        conditions.push((video) => videoList.checkByWatched(video, storage.blockWatchedVideosList));
    }

    return conditions;
}