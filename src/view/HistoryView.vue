<script setup lang="ts">
import { useDownloadAudioTrack } from "@/common/hook/audioTrack/useDownloadAudioTrack";
import { useStorageForSearchResult } from "@/common/hook/storage/useStorageForSearchResult";
import YoutubeSearchResults from "@/component/YoutubeSearchResults.vue";

const { searchResults } = useStorageForSearchResult();
const { downloadAudioTrack, inProgressAudioTrackDownloads } = useDownloadAudioTrack();
</script>

<template>
  <h1 class="red-title">Download history</h1>
  <YoutubeSearchResults
    :youtube-search-results="searchResults"
    :youtube-in-progress-downloads="inProgressAudioTrackDownloads"
    :on-click-result="downloadAudioTrack"
    download-button-text="Download again"
  ></YoutubeSearchResults>
</template>

<style scoped></style>
