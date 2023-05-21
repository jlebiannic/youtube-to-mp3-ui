<script setup lang="ts">
import YoutubeSearchResult from "@/component/YoutubeSearchResult.vue";
import { SearchService, type ISearchResult } from "@/service/SearchService";
import { reactive, ref } from "vue";

const searchQuery = ref("");
const youtubeSearchResults: ISearchResult[] = reactive([]);
async function searchOnYoutube() {
  const results = await SearchService.searchOnYouTube(searchQuery.value);
  youtubeSearchResults.splice(0);
  youtubeSearchResults.push(...results);
}
</script>

<template>
  <h1>Search on YouTube</h1>
  <input v-model="searchQuery" placeholder="Enter text for youtube search" />
  <button @click="searchOnYoutube">Search</button>

  <ul>
    <li
      class="Result"
      v-for="youtubeSearchResult in youtubeSearchResults"
      :key="youtubeSearchResult.id"
    >
      <YoutubeSearchResult :result="youtubeSearchResult" />
    </li>
  </ul>
</template>

<style scoped>
.Result {
  margin-bottom: 10px;
}
</style>
