<script setup lang="ts">
import { ref } from "vue";
import SearchView from "./SearchView.vue";
import { shallowRef } from "vue";
import { useTheme } from "vuetify/lib/framework.mjs";
import HistoryView from "./HistoryView.vue";
const tab = ref(0);
const drawer = ref(false);
const items = shallowRef([
  { idx: 0, title: "Search", icon: "mdi-magnify", content: SearchView },
  { idx: 1, title: "Search history", icon: "mdi-history", content: HistoryView }
]);
const theme = useTheme();
const secondaryColor = theme.global.current.value.colors.secondary;
</script>

<template>
  <v-layout>
    <v-app-bar color="primary" prominent>
      <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title></v-toolbar-title>

      <v-spacer></v-spacer>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      temporary
      :style="{ height: '10rem', backgroundColor: secondaryColor }"
    >
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
          <v-row no-gutters align="center">
            <v-icon
              :style="{
                marginRight: '0.1rem'
              }"
              >{{ item.icon }}</v-icon
            >
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-row>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main style="height: 100px">
      <v-window v-model="tab"
        ><v-card-text>
          <v-window-item v-for="item in items" :key="item.title">
            <component :is="item.content"></component>
          </v-window-item>
        </v-card-text>
      </v-window>
    </v-main>
  </v-layout>
</template>

<style scoped></style>
