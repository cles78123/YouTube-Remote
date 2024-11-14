<script setup lang="ts">
import {initLocalization} from '../../composables/localization.ts';
import {getPopupSwitch, saveSwitchChange} from '../../modules/storage.ts';
import {initializeSwitchStates, switchStates} from './composables/popup.ts';
import {onMounted} from "vue";

const localization = initLocalization();

onMounted(() => {
  getPopupSwitch(initializeSwitchStates);
});

</script>

<template>
  <div class="title">
    <label>
      {{ localization.extensionName }}
      <a href="../options/index.html" target="_blank" class="settings-icon">
        <i class="fa-solid fa-gear"></i>
      </a>
    </label>
  </div>
  <div class="switch-container">
    <div class="switch-item">
      <label class="switch">
        <input type="checkbox" v-model="switchStates.blockVideoKeyword.value"
               @change="saveSwitchChange('blockVideoKeyword')">
        <span class="slider round"></span>
      </label>
      <div class="switch-label">
        <span>{{ localization.blockVideoKeyword }}</span>
        <i class="fa-solid fa-circle-question" v-bind:title="localization.blockVideoKeywordNote"></i>
      </div>
    </div>
    <div class="switch-item">
      <label class="switch">
        <input type="checkbox" v-model="switchStates.blockViewCount.value" @change="saveSwitchChange('blockViewCount')">
        <span class="slider round"></span>
      </label>
      <div class="switch-label">
        <span>{{ localization.blockViewCount }}</span>
        <i class="fa-solid fa-circle-question" v-bind:title="localization.blockViewCountNote"></i>
      </div>
    </div>
    <div class="switch-item">
      <label class="switch">
        <input type="checkbox" v-model="switchStates.blockChannelKeyword.value"
               @change="saveSwitchChange('blockChannelKeyword')">
        <span class="slider round"></span>
      </label>
      <div class="switch-label">
        <span>{{ localization.blockChannelKeyword }}</span>
        <i class="fa-solid fa-circle-question" v-bind:title="localization.blockChannelKeywordNote"></i>
      </div>
    </div>
    <div class="switch-item">
      <label class="switch">
        <input type="checkbox" v-model="switchStates.blockWatchedVideos.value"
               @change="saveSwitchChange('blockWatchedVideos')">
        <span class="slider round"></span>
      </label>
      <div class="switch-label">
        <span>{{ localization.blockWatchedVideos }}</span>
      </div>
    </div>
  </div>
</template>