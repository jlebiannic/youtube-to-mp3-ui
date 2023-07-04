<script setup lang="ts">
import { useStorage } from "@/common/hook/useStorage";
import { YoutubeService } from "@/common/service/YoutubeService";
import SearchForm from "@/component/SearchForm.vue";
import YoutubeDownloadingSearchResults from "@/component/YoutubeDownloadingSearchResults.vue";
import YoutubeSearchResults from "@/component/YoutubeSearchResults.vue";
import { SearchResult, type ISearchResult } from "@/model/ISearchResult";
import { inject, reactive, ref } from "vue";

const [searchResultsInStorage, setSearchResultsInStorage] = useStorage<ISearchResult[]>("ytSH");

const youtubeSearchResults: ISearchResult[] = reactive([]);
const youtubeInProgressDownloads: ISearchResult[] = reactive([]);
const searching = ref(false);
const showSnackbar = ref(false);

const isMobile: boolean | undefined = inject("isMobile");

async function searchOnYoutube(searchQuery: string) {
  searching.value = true;
  try {
    const results = await YoutubeService.searchOnYouTube(searchQuery);
    youtubeSearchResults.splice(0);
    youtubeSearchResults.push(...results);
  } catch (error) {
    showSnackbar.value = true;
  } finally {
    searching.value = false;
  }
}

async function downloadAudioTrack(searchResult: ISearchResult) {
  storeSearchResult(searchResult);
  SearchResult.addSearchResultTo(searchResult, youtubeInProgressDownloads);
  try {
    await YoutubeService.downloadAudioTrack(searchResult.id);
  } catch (error) {
    showSnackbar.value = true;
  } finally {
    SearchResult.removeSearchResultFrom(searchResult, youtubeInProgressDownloads);
  }
}

function storeSearchResult(searchResult: ISearchResult) {
  try {
    if (!searchResultExistInStorage(searchResult)) {
      if (searchResultsInStorage.value) {
        setSearchResultsInStorage([...searchResultsInStorage.value, searchResult]);
      } else {
        setSearchResultsInStorage([searchResult]);
      }
    }
  } catch (error) {
    console.error(error);
  }
}

function searchResultExistInStorage(searchResult: ISearchResult) {
  return searchResultsInStorage.value?.find(
    (currentSearchResult) => currentSearchResult.id === searchResult.id
  );
}
</script>

<template>
  <v-snackbar v-model="showSnackbar" timeout="2000" location="top" color="red">
    une erreur est survenue
  </v-snackbar>

  <h1 class="search-on-youtube">Search on YouTube</h1>
  <div>
    <v-form @submit.prevent autocomplete="on">
      <v-row>
        <v-col md="9" sm="12">
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
        <!-- Colonne de droite des téléchargement en cours (non affiché sur un mobile) -->
        <v-col md="2" offset-md="1" v-if="!isMobile && youtubeInProgressDownloads.length > 0">
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
  margin-top: 1rem;
  margin-bottom: 1rem;

  color: red;
}
</style>
