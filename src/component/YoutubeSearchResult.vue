<script setup lang="ts">
import type { ISearchResult } from "@/model/ISearchResult";

export interface IYoutubeSearchResultProps {
  result: ISearchResult;
}

const props = defineProps<IYoutubeSearchResultProps>();
</script>

<template>
  <div>
    <h2>{{ props.result.title }}</h2>
    <a :href="props.result.link" target="_blank" rel="noopener noreferrer">
      <img class="image" :src="props.result.imgUrl" />
    </a>
    <div v-if="props.result.durationInFormatIso8601">
      duration: {{ props.result.durationInFormatIso8601 }}
    </div>
  </div>
</template>

<style scoped>
.image {
  cursor: pointer;
}
</style>
