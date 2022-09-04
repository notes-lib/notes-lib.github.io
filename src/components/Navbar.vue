<script setup>
import IconBookMark from "@/components/icons/IconBookMark.vue";
import IconInfo from "@/components/icons/IconInfo.vue";
import IconContrast from "@/components/icons/IconContrast.vue";
import IconLanguage from "@/components/icons/IconLanguage.vue";
import IconRules from "@/components/icons/IconRules.vue";
import IconAdd from "@/components/icons/IconAdd.vue";

import Translate from "@/components/navbar/Translate.vue";
import Indications from "@/components/navbar/Indications.vue";
import Info from "@/components/navbar/Info.vue";

import { RouterLink } from "vue-router";

import { ref } from 'vue';

var translate = ref(false);
var indications = ref(false);
var info = ref(false);

const emit = defineEmits(['contrast']);
</script>

<template>
  <nav>
    <div class="width">
      <RouterLink class="start" to="/">
        <IconBookMark></IconBookMark>
        <p>Notes Library</p>
      </RouterLink>
      <div class="end">
        <IconContrast @click="emit('contrast')"></IconContrast>
        <IconLanguage @click="translate = true"></IconLanguage>
        <IconRules @click="indications = true"></IconRules>
        <IconInfo @click="info = true"></IconInfo>
        <div class="surround">
          <RouterLink to="/newNote">
            <IconAdd></IconAdd>
          </RouterLink>
        </div>
      </div>
    </div>
  </nav>
  <Translate v-if="translate" @close="translate = false"></Translate>
  <Indications v-if="indications" @close="indications = false"></Indications>
  <Info v-if="info" @close="info = false"></Info>
</template>

<style scoped>
nav {
  background-color: var(--surface);
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
}

.start:hover {
  color: var(--accent);
  fill: var(--accent);
}

@media (max-width: 500px) {
  p {
    visibility: hidden;
  }
}
</style>
