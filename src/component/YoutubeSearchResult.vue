<script setup lang="ts">
import type { ISearchResult } from "@/service/SearchService";

export interface IYoutubeSearchResultProps {
  result: ISearchResult;
}

const props = defineProps<IYoutubeSearchResultProps>();
</script>

<template>
  <div>
    <h2>{{ props.result.title }}</h2>
    <img :src="props.result.imgUrl" />
    <div>
      <a :href="props.result.link">{{ props.result.link }}</a>
    </div>
  </div>
</template>
