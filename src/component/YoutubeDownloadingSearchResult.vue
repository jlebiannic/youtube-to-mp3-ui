<script setup lang="ts">
import type { ISearchResult } from "@/model/ISearchResult";

export interface IYoutubeDownloadingSearchResultProps {
  result: ISearchResult;
}

const props = defineProps<IYoutubeDownloadingSearchResultProps>();
</script>

<template>
  <div>
    <div class="title" :title="props.result.title">
      {{ props.result.title }}
    </div>
    <div class="image-downloading">
      <a :href="props.result.link" target="_blank" rel="noopener noreferrer">
        <img class="image" :src="props.result.imgUrlMin" />
      </a>
      <v-icon
        icon="mdi-download"
        class="animate__animated animate__heartBeat animate__infinite download-icon"
      />
    </div>
  </div>
</template>

<style scoped>
.image-downloading {
  display: flex;
  align-items: center;
}

.download-icon {
  margin-left: 1rem;
}

.image {
  cursor: pointer;
}

.title {
  min-width: 10rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
