<script setup lang="ts">
import type { ISearchResult } from "@/model/ISearchResult";
import YoutubeDownloadingSearchResult from "./YoutubeDownloadingSearchResult.vue";

export interface IYoutubeDownloadingSearchResultsProps {
  youtubeInProgressDownloads: ISearchResult[];
}

const props = defineProps<IYoutubeDownloadingSearchResultsProps>();
</script>
<template>
  <v-row
    class="search-result"
    v-for="youtubeInProgressDownload in props.youtubeInProgressDownloads"
    :key="youtubeInProgressDownload.id"
  >
    <YoutubeDownloadingSearchResult :result="youtubeInProgressDownload" />
  </v-row>
</template>

<style scoped>
.search-result {
  margin-bottom: 10px;
}
</style>
