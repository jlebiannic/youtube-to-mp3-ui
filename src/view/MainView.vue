<script setup lang="ts">
import { ref } from "vue";
import SearchView from "./SearchView.vue";
import { shallowRef } from "vue";
const tab = ref(0);
const drawer = ref(false);
const items = shallowRef([
  { idx: 0, title: "Search", icon: "mdi-magnify", content: SearchView },
  { idx: 1, title: "Search history", icon: "mdi-account-box", content: SearchView }
]);
</script>

<template>
  <!-- <v-card>
    <v-layout> -->
  <!-- <v-system-bar color="deep-purple darken-3"></v-system-bar> -->
  <v-layout>
    <v-app-bar color="primary" prominent>
      <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title></v-toolbar-title>

      <v-spacer></v-spacer>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" temporary>
      <v-list dense nav>
        <v-list-item
          v-for="item in items"
          :key="item.title"
          link
          @click="
            drawer = !drawer;
            tab = item.idx;
          "
        >
          <v-icon>{{ item.icon }}</v-icon>

          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main style="height: 100px">
      <v-window v-model="tab">
        <v-window-item v-for="item in items" :key="item.title">
          <component :is="item.content"></component>
        </v-window-item>
      </v-window>
    </v-main>
    <!-- </v-layout>
    </v-card> -->
  </v-layout>
</template>

<style scoped></style>
