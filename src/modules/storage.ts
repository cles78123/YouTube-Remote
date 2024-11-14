// import { cloneDeep } from 'lodash-es'
import {reloadYouTubePage} from "./tabAction.ts";

export function getPopupSwitch(callback) {
    fetchFromStorage({
        blockVideoKeyword: false,
        blockViewCount: false,
        blockChannelKeyword: false,
        blockWatchedVideos: false,
    }, callback);
}

export function getBlockList(callback) {
    fetchFromStorage({
        blockVideoKeywordList: null,
        blockViewCountList: null,
        blockChannelKeywordList: null,
        blockWatchedVideosList: null
    }, callback);
}

export function getPopupSwitchAndBlockList(callback) {
    fetchFromStorage({
        blockVideoKeyword: false,
        blockViewCount: false,
        blockChannelKeyword: false,
        blockWatchedVideos: false,
        blockVideoKeywordList: null,
        blockViewCountList: null,
        blockChannelKeywordList: null,
        blockWatchedVideosList: null,
    }, callback);
}

export function getCountBlockedVideos(callback) {
    fetchFromStorage({
        countBlockedVideos: false
    }, callback);
}

export function saveSwitchChange(settingName) {
    const checked = event.target.checked;
    chrome.storage.local.set({
        [settingName]: checked,
        countBlockedVideos: null
    });

    if (!checked) {
        reloadYouTubePage();
    }
}

export function saveInputToStorage(name, inputString) {
    chrome.storage.local.set({
        [name]: inputString,
        countBlockedVideos: null
    });
}

export function saveWatchedVideo(tryNumber?: number) {
    if (tryNumber && tryNumber > 0) {
        return;
    }

    const element = document.querySelector('h1.style-scope.ytd-watch-metadata yt-formatted-string');

    if (!element) {
        setTimeout(saveWatchedVideo(1), 3000);
        return;
    }

    const title = element.textContent;

    if (title) {
        chrome.storage.local.get({blockWatchedVideosList: null}, function (items) {
            if (!items.blockWatchedVideosList) {
                chrome.storage.local.set({blockWatchedVideosList: title});
            } else {
                const list = items.blockWatchedVideosList.split('\n').filter(k => k.trim() !== '');

                if (!list.some(wvl => wvl == title)) {
                    chrome.storage.local.set({blockWatchedVideosList: `${items.blockWatchedVideosList}\n${title}`});
                }
            }
        });
    }
}

export function addBlockVideoKeywordList(title) {
    chrome.storage.local.get({blockVideoKeywordList: null}, function (items) {
        if (!items.blockVideoKeywordList) {
            chrome.storage.local.set({blockVideoKeywordList: title});
        } else {
            const list = items.blockVideoKeywordList.split('\n').filter(k => k.trim() !== '');

            if (!list.some(vkl => vkl == title)) {
                chrome.storage.local.set({blockVideoKeywordList: `${items.blockVideoKeywordList}\n${title}`});
            }
        }
    });
}

export function addBlockChannelKeywordList(title) {
    chrome.storage.local.get({blockChannelKeywordList: null}, function (items) {
        if (!items.blockChannelKeywordList) {
            chrome.storage.local.set({blockChannelKeywordList: title});
        } else {
            const list = items.blockChannelKeywordList.split('\n').filter(k => k.trim() !== '');

            if (!list.some(ckl => ckl == title)) {
                chrome.storage.local.set({blockChannelKeywordList: `${items.blockChannelKeywordList}\n${title}`});
            }
        }
    });
}

function fetchFromStorage(keys, callback) {
    chrome.storage.local.get(keys, function (items) {
        if (typeof callback === 'function') {
            callback(items);
        }
    });
}