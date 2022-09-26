<script setup>
import { useSettingsStore } from "@/stores/settings.js";
import { useModalsStore } from "@/stores/modals.js";

import Indications from "@/components/navbar/Indications.vue";
import Info from "@/components/navbar/Info.vue";
import Translate from "@/components/navbar/Translate.vue";

import IconAdd from "@/components/icons/IconAdd.vue";
import IconBookMark from "@/components/icons/IconBookMark.vue";
import IconContrast from "@/components/icons/IconContrast.vue";
import IconInfo from "@/components/icons/IconInfo.vue";
import IconLanguage from "@/components/icons/IconLanguage.vue";
import IconRules from "@/components/icons/IconRules.vue";

import { ref } from "vue";
import { RouterLink } from "vue-router";

const settings = useSettingsStore();
const modals = useModalsStore();
</script>

<template>
  <nav>
    <div class="width">
      <RouterLink class="start" to="/">
        <IconBookMark></IconBookMark>
        <div class="title">
          <h4>Notes Library</h4>
          <p>Beta</p>
        </div>
      </RouterLink>
      <div class="end">
        <IconContrast @click="settings.updateTheme()"></IconContrast>
        <IconLanguage @click="modals.translate = true"></IconLanguage>
        <IconRules @click="modals.indications = true"></IconRules>
        <IconInfo @click="modals.info = true"></IconInfo>
        <div class="surround">
          <RouterLink to="/newNote">
            <IconAdd></IconAdd>
          </RouterLink>
        </div>
      </div>
    </div>
  </nav>
  <Translate v-if="modals.translate"></Translate>
  <Indications v-if="modals.indications"></Indications>
  <Info v-if="modals.info"></Info>
</template>

<style scoped>
nav {
  background-color: var(--surface);
}

.title {
  display: flex;
  flex-direction: column;
  margin-top: 0.5rem;
}

.title p {
  font-size: 12px;
  color: var(--accent);
}

.width {
  padding: 1rem;
  max-width: 55rem;
  margin: auto;
  display: flex;
  justify-content: space-between;
}

.end svg {
  fill: var(--text);
  padding: 10px;
}

.end svg:hover {
  fill: var(--accent);
  padding: 10px;
}

.surround {
  display: inline-block;
}

.surround svg {
  fill: var(--accent);
}

.surround svg:hover {
  fill: var(--text);
}

.end {
  display: inline;
}

.start {
  display: flex;
  align-items: center;
  text-decoration: none;
  color: var(--text);
  fill: var(--text);
  gap: 10px;
  min-width: 4rem;
}

.start:hover {
  color: var(--accent);
  fill: var(--accent);
}

@media (max-width: 500px) {
  h4 {
    display: none;
  }

  p {
    display: none;
  }
}
</style>
