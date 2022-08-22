<script setup>
import IconBookMark from "@/components/icons/IconBookMark.vue";
import IconContrast from "@/components/icons/IconContrast.vue";
import IconLanguage from "@/components/icons/IconLanguage.vue";
import IconRules from "@/components/icons/IconRules.vue";
import IconAdd from "@/components/icons/IconAdd.vue";

import { RouterLink } from "vue-router";
</script>

<template>
  <nav>
    <div class="width">
      <RouterLink class="start" to="/">
        <IconBookMark></IconBookMark>
        <p>Notes Library</p>
      </RouterLink>
      <div class="end">
        <IconContrast></IconContrast>
        <IconLanguage></IconLanguage>
        <IconRules></IconRules>

        <div class="surround">
          <RouterLink to="/newNote">
            <IconAdd></IconAdd>
          </RouterLink>
        </div>
      </div>
    </div>
  </nav>
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
