import {ref} from "vue";

export let blockList = {
    blockVideoKeywordList: ref(null),
    blockViewCountList: ref(null),
    blockChannelKeywordList: ref(null),
    blockWatchedVideosList: ref(null)
};

export function initializeBlockList(items) {
    blockList.blockVideoKeywordList.value = items.blockVideoKeywordList;
    blockList.blockViewCountList.value = items.blockViewCountList;
    blockList.blockChannelKeywordList.value = items.blockChannelKeywordList;
    blockList.blockWatchedVideosList.value = items.blockWatchedVideosList;
}