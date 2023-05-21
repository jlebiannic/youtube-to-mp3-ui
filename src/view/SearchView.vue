<script setup lang="ts">
import YoutubeSearchResult from "@/component/YoutubeSearchResult.vue";
import { YoutubeService, type ISearchResult } from "@/service/YoutubeService";
import { onMounted, reactive, ref } from "vue";

const inputRef = ref<HTMLInputElement | null>(null);

const searchQuery = ref("");
const youtubeSearchResults: ISearchResult[] = reactive([]);

onMounted(() => {
  setFocuOnInput();
});

async function searchOnYoutube() {
  const results = await YoutubeService.searchOnYouTube(searchQuery.value);
  youtubeSearchResults.splice(0);
  youtubeSearchResults.push(...results);
}

function downloadAudioTrack(videoId: string) {
  YoutubeService.downloadAudioTrack(videoId);
}

function setFocuOnInput() {
  inputRef.value?.focus();
}
</script>

<template>
  <h1>Search on YouTube</h1>
  <div>
    <input
      ref="inputRef"
      v-model="searchQuery"
      placeholder="Enter text for youtube search"
      @keyup.enter="searchOnYoutube"
    />
    <button @click="searchOnYoutube">Search</button>
  </div>

  <ul>
    <li
      class="Result"
      v-for="youtubeSearchResult in youtubeSearchResults"
      :key="youtubeSearchResult.id"
    >
      <YoutubeSearchResult :result="youtubeSearchResult" />
      <button @click="() => downloadAudioTrack(youtubeSearchResult.id)">Download</button>
    </li>
  </ul>
</template>

<style scoped>
.Result {
  margin-bottom: 10px;
}
</style>
