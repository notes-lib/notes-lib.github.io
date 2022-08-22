import { createRouter, createWebHistory } from "vue-router";
import Home from '@/components/Home.vue';
import NewNote from '@/components/NewNote.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/newNote',
      name: 'New note',
      component: NewNote,
    },
  ],
});

export default router;
