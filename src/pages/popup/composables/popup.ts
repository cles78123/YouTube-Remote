import {ref} from "vue";

export let switchStates = {
    blockVideoKeyword: ref(false),
    blockViewCount: ref(false),
    blockChannelKeyword: ref(false),
    blockWatchedVideos: ref(false)
};

export function initializeSwitchStates(items) {
    switchStates.blockVideoKeyword.value = items.blockVideoKeyword;
    switchStates.blockViewCount.value = items.blockViewCount;
    switchStates.blockChannelKeyword.value = items.blockChannelKeyword;
    switchStates.blockWatchedVideos.value = items.blockWatchedVideos;
}