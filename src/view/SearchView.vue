<script setup lang="ts">
import { YoutubeService } from "@/common/service/YoutubeService";
import { reactive, ref } from "vue";
import SearchForm from "@/component/SearchForm.vue";
import YoutubeSearchResults from "@/component/YoutubeSearchResults.vue";
import { SearchResult, type ISearchResult } from "@/model/ISearchResult";
import YoutubeDownloadingSearchResults from "@/component/YoutubeDownloadingSearchResults.vue";
import { inject } from "vue";

const youtubeSearchResults: ISearchResult[] = reactive([]);
const youtubeInProgressDownloads: ISearchResult[] = reactive([]);

const searching = ref(false);

const isMobile: boolean | undefined = inject("isMobile");

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
  SearchResult.addSearchResultTo(searchResult, youtubeInProgressDownloads);
  try {
    await YoutubeService.downloadAudioTrack(searchResult.id);
  } finally {
    SearchResult.removeSearchResultFrom(searchResult, youtubeInProgressDownloads);
  }
}
</script>

<template>
  <h1 class="search-on-youtube">Search on YouTube</h1>
  <div>
    <v-form @submit.prevent autocomplete="on">
      <v-row>
        <v-col md="10" sm="12">
          <SearchForm
            :on-submit="(searchQuery:string)=>searchOnYoutube(searchQuery)"
            placeholder="Enter text ou url for youtube search"
            label="Search on youtube"
          ></SearchForm>
          <!-- Résultats de la recherche -->
          <v-row v-if="searching">
            <v-col cols="6" offset="4">
              <v-progress-circular indeterminate size="64"></v-progress-circular>
            </v-col>
          </v-row>
          <div v-else>
            <YoutubeSearchResults
              :youtube-search-results="youtubeSearchResults"
              :youtube-in-progress-downloads="youtubeInProgressDownloads"
              :on-click-result="(youtubeSearchResult) => downloadAudioTrack(youtubeSearchResult)"
            ></YoutubeSearchResults>
          </div>
        </v-col>
        <!-- Colonne de droite des téléchargement en cours -->
        <v-col md="1" offset-md="1" v-if="!isMobile && youtubeInProgressDownloads.length > 0">
          <div class="sticky-top">
            <YoutubeDownloadingSearchResults
              :youtube-in-progress-downloads="youtubeInProgressDownloads"
            ></YoutubeDownloadingSearchResults>
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
</style>
