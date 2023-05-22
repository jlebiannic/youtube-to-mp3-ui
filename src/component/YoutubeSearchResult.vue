<script setup lang="ts">
import { type ISearchResult } from "@/common/service/YoutubeService";

export interface IYoutubeSearchResultProps {
  result: ISearchResult;
}

const props = defineProps<IYoutubeSearchResultProps>();
</script>

<template>
  <div>
    <h2>{{ props.result.title }}</h2>
    <a :href="props.result.link"><img class="Image" :src="props.result.imgUrl" /></a>
    <div>
      <a :href="props.result.link">{{ props.result.link }}</a>
    </div>
  </div>
</template>

<style scoped>
.Image {
  cursor: pointer;
}
</style>
