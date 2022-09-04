import { createApp } from "vue";
import { createPinia } from "pinia";
import { createI18n } from "vue-i18n";
import { createHead } from "@vueuse/head"

import App from "./App.vue";
import router from "./router";

import "./assets/main.css";
import { messages } from "./assets/messages.js";

let language = localStorage.getItem('language');

const t = createI18n({
  legacy: false,
  locale: language ?? navigator.language.split('-')[0],
  globalInjection: true,
  messages,
});

const head = createHead()

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(t);
app.use(head);

app.mount("#app");