export function initLocalization() {
    return {
        extensionName: chrome.i18n.getMessage('extensionName'),
        blockVideoKeyword: chrome.i18n.getMessage('blockVideoKeyword'),
        blockViewCount: chrome.i18n.getMessage('blockViewCount'),
        blockChannelKeyword: chrome.i18n.getMessage('blockChannelKeyword'),
        blockVideoKeywordNote: chrome.i18n.getMessage('blockVideoKeywordNote'),
        blockViewCountNote: chrome.i18n.getMessage('blockViewCountNote'),
        blockChannelKeywordNote: chrome.i18n.getMessage('blockChannelKeywordNote'),
        blockWatchedVideos: chrome.i18n.getMessage('blockWatchedVideos'),
        optionsNote: chrome.i18n.getMessage('optionsNote'),
        textareaNote: chrome.i18n.getMessage('textareaNote'),
        cancel: chrome.i18n.getMessage('cancel'),
        confirm: chrome.i18n.getMessage('confirm')
    };
}