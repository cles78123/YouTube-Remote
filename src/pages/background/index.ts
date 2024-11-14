import {isYouTubePage, isYouTubeWatchPage} from "../../modules/conditions.ts";

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete' && tab.url) {
        const currentUrl = tab.url;
        if (isYouTubePage(currentUrl)) {
            setTimeout(function () {
                chrome.tabs.sendMessage(tabId, {message: "activateBlock"});
            }, 1000);
        } else if (isYouTubeWatchPage(currentUrl)) {
            setTimeout(function () {
                chrome.tabs.sendMessage(tabId, {message: "saveVideoTitle"});
            }, 1000);
        }
    }
});