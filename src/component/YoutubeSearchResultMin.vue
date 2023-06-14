<script setup lang="ts">
import { type ISearchResult } from "@/common/service/YoutubeService";

export interface IYoutubeSearchResultMinProps {
  result: ISearchResult;
}

const props = defineProps<IYoutubeSearchResultMinProps>();
</script>

<template>
  <div>
    <div>{{ props.result.title }}</div>
    <a :href="props.result.link"><img class="image" :src="props.result.imgUrlMin" /></a>
  </div>
</template>

<style scoped>
.image {
  cursor: pointer;
}
</style>
