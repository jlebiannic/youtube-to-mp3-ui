<script setup lang="ts">
import { useDownloadAudioTrack } from "@/common/hook/audioTrack/useDownloadAudioTrack";
import { YoutubeService } from "@/common/service/YoutubeService";
import SearchForm from "@/component/SearchForm.vue";
import YoutubeDownloadingSearchResults from "@/component/YoutubeDownloadingSearchResults.vue";
import YoutubeSearchResults from "@/component/YoutubeSearchResults.vue";
import { type ISearchResult } from "@/model/ISearchResult";
import { watch } from "vue";
import { inject, reactive, ref } from "vue";

const { downloadAudioTrack, inProgressAudioTrackDownloads, audioTrackDownloadError } = useDownloadAudioTrack();

const youtubeSearchResults: ISearchResult[] = reactive([]);

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

watch(audioTrackDownloadError, (newError) => {
  if (newError) {
    showSnackbar.value = true; // TODO A améliorer (traiter de façon global et générique les erreurs)
  }
});
</script>

<template>
  <v-snackbar v-model="showSnackbar" timeout="2000" location="top" color="red"> une erreur est survenue </v-snackbar>

  <h1 class="red-title">YouTube videos to MP3</h1>
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
              :youtube-in-progress-downloads="inProgressAudioTrackDownloads"
              :on-click-result="(youtubeSearchResult) => downloadAudioTrack(youtubeSearchResult)"
            ></YoutubeSearchResults>
          </div>
        </v-col>
        <!-- Colonne de droite des téléchargement en cours (non affiché sur un mobile) -->
        <v-col md="2" offset-md="1" v-if="!isMobile && inProgressAudioTrackDownloads.length > 0">
          <div class="sticky-top">
            <YoutubeDownloadingSearchResults
              :youtube-in-progress-downloads="inProgressAudioTrackDownloads"
            ></YoutubeDownloadingSearchResults>
          </div>
        </v-col>
      </v-row>
    </v-form>
  </div>
</template>

<style scoped>
.sticky-top {
  position: fixed;
  top: 10rem;
}
</style>
