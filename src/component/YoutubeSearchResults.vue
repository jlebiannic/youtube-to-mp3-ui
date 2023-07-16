<script setup lang="ts">
import { SearchResult, type ISearchResult } from "@/model/ISearchResult";
import YoutubeSearchResult from "./YoutubeSearchResult.vue";
import DownloadButton from "./DownloadButton.vue";

export interface IYoutubeSearchResultsProps {
  youtubeSearchResults: ISearchResult[];
  onClickResult?: (youtubeSearchResult: ISearchResult) => void;
  youtubeInProgressDownloads?: ISearchResult[];
  downloadButtonText?: string;
}

const props = withDefaults(defineProps<IYoutubeSearchResultsProps>(), {
  downloadButtonText: "Download mp3"
});
</script>

<template>
  <v-row
    class="search-result"
    v-for="youtubeSearchResult in props.youtubeSearchResults"
    :key="youtubeSearchResult.id"
  >
    <v-col>
      <YoutubeSearchResult :result="youtubeSearchResult" />
      <DownloadButton
        v-if="props.onClickResult && props.youtubeInProgressDownloads"
        :onclick="() => props.onClickResult && props.onClickResult(youtubeSearchResult)"
        :is-loading="
          SearchResult.isVideoIdIsIn(youtubeSearchResult.id, props.youtubeInProgressDownloads)
        "
        :text="props.downloadButtonText"
      ></DownloadButton>
    </v-col>
  </v-row>
</template>

<style scoped>
.search-result {
  margin-bottom: 10px;
}
</style>
