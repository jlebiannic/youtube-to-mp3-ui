<script setup lang="ts">
import YoutubeSearchResult from "@/component/YoutubeSearchResult.vue";
import { YoutubeService, type ISearchResult } from "@/common/service/YoutubeService";
import { reactive, ref } from "vue";
import YoutubeSearchResultMin from "@/component/YoutubeSearchResultMin.vue";
import DownloadButton from "@/component/DownloadButton.vue";
import SearchForm from "@/component/SearchForm.vue";

const youtubeSearchResults: ISearchResult[] = reactive([]);
const youtubeInProgressDownloads: ISearchResult[] = reactive([]);

const searching = ref(false);

async function searchOnYoutube(searchQuery: string) {
  searching.value = true;
  try {
    const results = await YoutubeService.searchOnYouTube(searchQuery);
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
      <v-row>
        <v-col cols="11">
          <SearchForm :on-submit="(searchQuery:string)=>searchOnYoutube(searchQuery)"></SearchForm>
          <!-- Résultats de la recherche -->
          <v-row v-if="searching">
            <v-col cols="6" offset="4">
              <v-progress-circular indeterminate size="64"></v-progress-circular>
            </v-col>
          </v-row>
          <div v-else>
            <v-row
              class="search-result"
              v-for="youtubeSearchResult in youtubeSearchResults"
              :key="youtubeSearchResult.id"
            >
              <v-col>
                <YoutubeSearchResult :result="youtubeSearchResult" />
                <DownloadButton
                  :onclick="() => downloadAudioTrack(youtubeSearchResult)"
                  :is-loading="isVideoIdIsInProgressDownloads(youtubeSearchResult.id)"
                  text="Download mp3"
                ></DownloadButton>
              </v-col>
            </v-row>
          </div>
        </v-col>
        <!-- Colonne de droite des téléchargement en cours -->
        <v-col cols="1" v-if="youtubeInProgressDownloads.length > 0">
          <div class="sticky-top">
            <v-row
              class="search-result"
              v-for="youtubeInProgressDownload in youtubeInProgressDownloads"
              :key="youtubeInProgressDownload.id"
            >
              <YoutubeSearchResultMin :result="youtubeInProgressDownload" />
            </v-row>
          </div>
        </v-col>
      </v-row>
    </v-form>
  </div>
</template>

<style scoped>
.sticky-top {
  position: sticky;
  top: 5rem;
}
.search-on-youtube {
  margin: 1rem;
  color: red;
}
.search-result {
  margin-bottom: 10px;
}
</style>
