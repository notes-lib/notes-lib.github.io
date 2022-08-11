import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createI18n } from "vue-i18n"

import App from './App.vue'
import router from './router'

import './assets/main.css'
import { messages } from './assets/messages.js';

const i18n = new createI18n({
    legacy: true,
    locale: 'en',
    globalInjection: true,
    messages,
})
  

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(i18n)

app.mount('#app')
