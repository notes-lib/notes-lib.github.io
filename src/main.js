import { messages } from "@/assets/messages.js";
import App from "@/App.vue";
import router from "@/router";

import "@/assets/main.css";

import { createApp } from "vue";
import { createPinia } from "pinia";
import { createI18n } from "vue-i18n";
import { createHead } from "@vueuse/head";
import VueYandexMetrika from 'vue-yandex-metrika'                               

//initially see if localstorage has it
let language = localStorage.getItem("language");

//if it doesn't see browser language
if (language === null) language = navigator.language.split("-")[0] ?? "en";

//if browser doesn't have a matching language revert to default
if (language != "it" && language != "en") language = "en";

const t = createI18n({
  legacy: false,
  locale: language,
  globalInjection: true,
  messages,
});

const head = createHead();

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(t);
app.use(head);

app.use(VueYandexMetrika, {
  id: 90217674,
  router: router,
  env: process.env.NODE_ENV
})

app.mount("#app");
