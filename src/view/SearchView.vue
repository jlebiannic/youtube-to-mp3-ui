<script setup lang="ts">
import YoutubeSearchResult from "@/component/YoutubeSearchResult.vue";
import { YoutubeService, type ISearchResult } from "@/common/service/YoutubeService";
import { onMounted, reactive, ref } from "vue";

const inputRef = ref<HTMLInputElement | null>(null);

const searchQuery = ref("");
const youtubeSearchResults: ISearchResult[] = reactive([]);
const youtubeInProgressDownloads: ISearchResult[] = reactive([]);

const searching = ref(false);

onMounted(() => {
  setFocuOnInput();
});

async function searchOnYoutube() {
  searching.value = true;
  try {
    const results = await YoutubeService.searchOnYouTube(searchQuery.value);
    youtubeSearchResults.splice(0);
    youtubeSearchResults.push(...results);
  } finally {
    searching.value = false;
  }
}

async function downloadAudioTrack(searchResult: ISearchResult) {
  addSearchResultToInProgressDownloads(searchResult);
  try {
    await YoutubeService.downloadAudioTrack(searchResult.id);
  } finally {
    removeSearchResultToInProgressDownloads(searchResult);
  }
}

function setFocuOnInput() {
  inputRef.value?.focus();
}

function addSearchResultToInProgressDownloads(searchResult: ISearchResult) {
  if (!isVideoIdIsInProgressDownloads(searchResult.id)) {
    youtubeInProgressDownloads.push(searchResult);
  }
}

function removeSearchResultToInProgressDownloads(searchResult: ISearchResult) {
  const indexElement = youtubeInProgressDownloads.findIndex(
    (element) => element.id === searchResult.id
  );
  if (indexElement !== -1) {
    youtubeInProgressDownloads.splice(indexElement, 1);
  }
}

function isVideoIdIsInProgressDownloads(videoId: string): boolean {
  return (
    youtubeInProgressDownloads.find((inProgressDownload) => inProgressDownload.id === videoId) !==
    undefined
  );
}
</script>

<template>
  <h1 class="search-on-youtube">Search on YouTube</h1>
  <div>
    <v-form @submit.prevent autocomplete="on">
      <v-container>
        <v-row>
          <v-icon class="search-icon" icon="mdi-card-search-outline" size="x-large"></v-icon>
          <v-col cols="8">
            <v-text-field
              ref="inputRef"
              v-model="searchQuery"
              placeholder="Enter text for youtube search"
              @keyup.enter="searchOnYoutube"
              clearable
              label="Search on youtube"
              variant="outlined"
            ></v-text-field>
          </v-col>
          <v-col cols="3">
            <v-btn color="primary" block class="mt-2" @click="searchOnYoutube">Search</v-btn>
          </v-col>
        </v-row>

        <v-row v-if="searching">
          <v-col cols="6" offset="4">
            <v-progress-circular indeterminate size="64"></v-progress-circular>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
  </div>

  <ul v-if="!searching">
    <li
      class="search-result"
      v-for="youtubeSearchResult in youtubeSearchResults"
      :key="youtubeSearchResult.id"
    >
      <v-container>
        <v-row>
          <v-col cols="8">
            <YoutubeSearchResult :result="youtubeSearchResult" />

            <v-btn
              @click="() => downloadAudioTrack(youtubeSearchResult)"
              variant="flat"
              color="primary"
              :loading="isVideoIdIsInProgressDownloads(youtubeSearchResult.id)"
            >
              <v-icon icon="mdi-tray-arrow-down" size="large" start />
              Download mp3
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </li>
  </ul>
</template>

<style scoped>
.search-on-youtube {
  margin: 1rem;
  color: red;
}

.search-result {
  margin-bottom: 10px;
}

.search-icon {
  margin-top: 1.3rem;
}
</style>
