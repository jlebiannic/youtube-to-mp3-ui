<script setup lang="ts">
import YoutubeSearchResult from "@/component/YoutubeSearchResult.vue";
import { SearchService, type ISearchResult } from "@/service/SearchService";
import { onMounted, reactive, ref } from "vue";

const inputRef = ref<HTMLInputElement | null>(null);

const searchQuery = ref("");
const youtubeSearchResults: ISearchResult[] = reactive([]);

onMounted(() => {
  setFocuOnInput();
});

async function searchOnYoutube() {
  const results = await SearchService.searchOnYouTube(searchQuery.value);
  youtubeSearchResults.splice(0);
  youtubeSearchResults.push(...results);
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
    </li>
  </ul>
</template>

<style scoped>
.Result {
  margin-bottom: 10px;
}
</style>
