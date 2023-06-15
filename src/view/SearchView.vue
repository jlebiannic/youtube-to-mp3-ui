<script setup lang="ts">
import YoutubeSearchResult from "@/component/YoutubeSearchResult.vue";
import { YoutubeService, type ISearchResult } from "@/common/service/YoutubeService";
import { onMounted, reactive, ref } from "vue";
import YoutubeSearchResultMin from "@/component/YoutubeSearchResultMin.vue";
import { useDisplay } from "vuetify/lib/framework.mjs";
import DownloadButton from "@/component/DownloadButton.vue";

const inputRef = ref<HTMLInputElement | null>(null);

const searchQuery = ref("");
const youtubeSearchResults: ISearchResult[] = reactive([]);
const youtubeInProgressDownloads: ISearchResult[] = reactive([]);

const { mobile } = useDisplay();
const searching = ref(false);
let isMobile = mobile.value;

onMounted(() => {
  forceFocusOnInput();
  isMobile = mobile.value;
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

function forceFocusOnInput() {
  // Permet de résoudre le problème suivant:
  // Lorsqu'on clique sur une vidéo alors on est redirigé vers le site de youtube.
  // Si on fait "history back" alors on est redirigé vers l'appli mais le champs input de recherche reste valorisé avec
  //   l'ancienne valeur de recherche alors que la variable vuejs "searchQuery" est réinitialisée à vide
  //   (en déphasage donc avec le contenu du champs input).
  // En différant le focus (settimeout), la valeur disparait car elle est remise à la valeur de la variable vuejs "searchQuery"
  //setFocuOnInput();
  //inputRef.value?.blur();
  setTimeout(() => {
    setFocuOnInput();
  }, 10);
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
          <!-- Champs de recherche -->
          <v-row class="search-bar">
            <v-col cols="9">
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
              <v-btn color="primary" block class="mt-2" @click="searchOnYoutube">
                <v-icon
                  class="search-icon mt-1"
                  icon="mdi-card-search-outline"
                  size="x-large"
                  start
                ></v-icon>
                {{ isMobile ? "" : "Search" }}
              </v-btn>
            </v-col>
          </v-row>
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

.search-icon {
  margin-top: 1.3rem;
}

.search-bar {
  max-height: 7rem;
}
</style>
