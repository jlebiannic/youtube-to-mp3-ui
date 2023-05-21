import { createRouter, createWebHistory } from "vue-router";
import SearchViewVue from "@/view/SearchView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "search",
      component: SearchViewVue
    }
  ]
});

export default router;
