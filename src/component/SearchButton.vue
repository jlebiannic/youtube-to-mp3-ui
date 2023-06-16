<script setup lang="ts">
import { onMounted } from "vue";
import { useDisplay } from "vuetify/lib/framework.mjs";

export interface ISearchButtonProps {
  onClick: (searchQuery: string) => void;
}
const props = defineProps<ISearchButtonProps>();

const { mobile } = useDisplay();
let isMobile = mobile.value;
onMounted(() => {
  isMobile = mobile.value;
});
</script>

<template>
  <v-btn color="primary" block class="mt-2" @click="props.onClick">
    <v-icon class="search-icon mt-1" icon="mdi-card-search-outline" size="x-large" start></v-icon>
    {{ isMobile ? "" : "Search" }}
  </v-btn>
</template>
<style scoped></style>
