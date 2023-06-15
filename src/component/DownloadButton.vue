<script setup lang="ts">
export interface IDownloadButtonProps {
  onclick: () => void;
  isLoading: boolean;
  text: string;
}
const props = defineProps<IDownloadButtonProps>();
</script>

<template>
  <v-btn @click="props.onclick" variant="flat" color="primary" :loading="props.isLoading">
    <v-icon icon="mdi-tray-arrow-down" size="large" start />
    {{ props.text }}
  </v-btn>
</template>
