<script setup lang="ts">
import { provide } from "vue";
import { onMounted } from "vue";
import { RouterView } from "vue-router";
import { useDisplay } from "vuetify/lib/framework.mjs";

const { mobile } = useDisplay();

let isMobile = mobile.value;
onMounted(() => {
  isMobile = mobile.value;
});
provide("isMobile", isMobile);
</script>

<template>
  <v-container>
    <RouterView />
  </v-container>
</template>
<style>
body {
  background-color: #202125;
  color: #ffffff;
}

a {
  color: #ffffff;
}

.red-title {
  margin-top: 1rem;
  margin-bottom: 1rem;

  color: red;
}
</style>
