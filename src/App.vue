<script setup lang="ts">
import { RouterView } from "vue-router";
</script>

<template>
  <div class="Main">
    <RouterView />
  </div>
</template>
<style>
body {
  background-color: #202125;
  color: #ffffff;
}

a {
  color: #ffffff;
}

.Main {
  /* display: flex;
  flex-direction: column;
  align-items: center; */
}
</style>
