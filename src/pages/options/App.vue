<script setup lang="ts">
import {initLocalization} from "../../composables/localization.ts";
import {initializeBlockList, blockList} from './composables/options.ts';
import {getBlockList, saveInputToStorage} from "../../modules/storage.ts";
import {onMounted} from "vue";

const localization = initLocalization();

onMounted(() => {
  getBlockList(initializeBlockList);
  document.title = localization.extensionName;
});
</script>

<template>
  <div class="container">
    <h1>
      {{ localization.blockVideoKeyword }}
      <i class="fa-solid fa-circle-question" v-bind:title="localization.blockVideoKeywordNote"></i>
    </h1>
    <textarea class="title-input" v-model="blockList.blockVideoKeywordList.value" @blur="saveInputToStorage('blockVideoKeywordList', $event.target.value)" v-bind:placeholder="localization.textareaNote"></textarea>
    <h1>
      {{ localization.blockViewCount }}
      <i class="fa-solid fa-circle-question" v-bind:title="localization.blockViewCountNote"></i>
    </h1>
    <textarea class="title-input" v-model="blockList.blockViewCountList.value" @blur="saveInputToStorage('blockViewCountList', $event.target.value)" v-bind:placeholder="localization.textareaNote"></textarea>
    <h1>
      {{ localization.blockChannelKeyword }}
      <i class="fa-solid fa-circle-question" v-bind:title="localization.blockChannelKeywordNote"></i>
    </h1>
    <textarea class="title-input" v-model="blockList.blockChannelKeywordList.value" @blur="saveInputToStorage('blockChannelKeywordList', $event.target.value)" v-bind:placeholder="localization.textareaNote"></textarea>
    <div class="help-text">
      {{ localization.optionsNote }}
    </div>
  </div>
</template>