<script setup lang="ts">
import { ref } from "vue";
import { onMounted } from "vue";
import SearchButton from "./SearchButton.vue";

export interface ISearchFormProps {
  onSubmit: (searchQuery: string) => void;
  label: string;
  placeholder: string;
}
const props = defineProps<ISearchFormProps>();

const searchQuery = ref("");

const inputRef = ref<HTMLInputElement | null>(null);

onMounted(() => {
  forceFocusOnInput();
});

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

function setFocuOnInput() {
  inputRef.value?.focus();
}
</script>

<template>
  <v-row class="search-bar" align="center">
    <v-col cols="9">
      <v-text-field
        name="search"
        autocomplete="on"
        ref="inputRef"
        v-model="searchQuery"
        :placeholder="props.placeholder"
        @keyup.enter="() => props.onSubmit(searchQuery)"
        clearable
        :label="props.label"
        variant="outlined"
        :hide-details="true"
      ></v-text-field>
    </v-col>
    <v-col cols="3">
      <search-button :on-click="() => props.onSubmit(searchQuery)"></search-button>
    </v-col>
  </v-row>
</template>

<style scoped>
.search-bar {
  max-height: 7rem;
}
</style>
