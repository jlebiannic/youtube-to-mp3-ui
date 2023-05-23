<script setup lang="ts">
import YoutubeSearchResult from "@/component/YoutubeSearchResult.vue";
import { YoutubeService, type ISearchResult } from "@/common/service/YoutubeService";
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
    <v-form @submit.prevent>
      <v-text-field
        ref="inputRef"
        v-model="searchQuery"
        placeholder="Enter text for youtube search"
        @keyup.enter="searchOnYoutube"
        clearable
        label="Search on youtube"
        prepend-icon="mdi-vuetify"
        variant="outlined"
      ></v-text-field>
      <v-btn color="primary" block class="mt-2" @click="searchOnYoutube">Search</v-btn>
    </v-form>
  </div>

  <ul>
    <li
      class="Result"
      v-for="youtubeSearchResult in youtubeSearchResults"
      :key="youtubeSearchResult.id"
    >
      <YoutubeSearchResult :result="youtubeSearchResult" />

      <v-btn
        @click="() => downloadAudioTrack(youtubeSearchResult.id)"
        variant="flat"
        color="primary"
      >
        <v-icon icon="mdi-tray-arrow-down" size="large" start />
        Download mp3
      </v-btn>
    </li>
  </ul>
</template>

<style scoped>
.Result {
  margin-bottom: 10px;
}
</style>
