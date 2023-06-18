<script setup lang="ts">
import { inject } from "vue";

export interface ISearchButtonProps {
  onClick: (searchQuery: string) => void;
}
const props = defineProps<ISearchButtonProps>();

const isMobile: boolean | undefined = inject("isMobile");
</script>

<template>
  <v-btn color="primary" block @click="props.onClick">
    <v-icon class="search-icon" icon="mdi-card-search-outline" size="x-large" start></v-icon>
    {{ isMobile ? "" : "Search" }}
  </v-btn>
</template>
<style scoped></style>
