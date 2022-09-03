import { createApp } from "vue";
import { createPinia } from "pinia";
import { createI18n } from "vue-i18n";
import FloatingVue from "floating-vue";
import { createHead } from "@vueuse/head"

import App from "./App.vue";
import router from "./router";

import "./assets/main.css";
import { messages } from "./assets/messages.js";

const t = new createI18n({
  legacy: false,
  locale: "en",
  globalInjection: true,
  messages,
});

const head = createHead()

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(t);
app.use(head);
app.use(FloatingVue, {
  themes: {
    "my-theme": {
      triggers: ["click"],
      autoHide: true,
      placement: "bottom",
    },
  },
});

app.mount("#app");
