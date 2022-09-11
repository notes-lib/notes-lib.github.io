<script setup>
import { useHomeStore } from "@/stores/home";

import IconTag from "@/components/icons/IconTag.vue";
import IconAuthor from "@/components/icons/IconAuthor.vue";
import IconLanguage from "@/components/icons/IconLanguage.vue";
import IconFilter from "@/components/icons/IconFilter.vue";
import FilterModal from "@/components/home/FilterModal.vue";
import IconClose from "@/components/icons/IconClose.vue";
import { tags, languages } from "@/assets/config.js";

import { hideAllPoppers } from "floating-vue";
import { ref } from "vue";

const home = useHomeStore();
</script>

<template>
  <div class="outer">
    <button
      @click="
        home.isShowFilter = !home.isShowFilter;
        home.isShowSort = false;
      "
    >
      <icon-filter></icon-filter>
      {{ $t("home.filter") }}
    </button>

    <div v-if="home.isShowFilter" class="inner">
      <button
        @click="
          home.isTag = true;
          home.isShowFilter = false;
        "
      >
        <icon-tag></icon-tag>{{ $t("home.tag") }}
      </button>
      <button
        @click="
          home.isAuthor = true;
          home.isShowFilter = false;
        "
      >
        <icon-author></icon-author>{{ $t("home.author") }}
      </button>
      <button
        @click="
          home.isLanguage = true;
          home.isShowFilter = false;
        "
      >
        <icon-language></icon-language>{{ $t("home.language") }}
      </button>
    </div>

    <filter-modal v-if="home.isTag" filter="tag"></filter-modal>
    <filter-modal v-if="home.isLanguage" filter="language"></filter-modal>
    <filter-modal v-if="home.isAuthor" filter="author"></filter-modal>
  </div>

  <div class="chip" v-if="home.filters.tag">
    <IconTag></IconTag>
    {{ $t("tags." + home.filters.tag) }}
    <IconClose class="close" @click="home.resetFilter('tag')"></IconClose>
  </div>

  <div class="chip" v-if="home.filters.language">
    <IconLanguage></IconLanguage>
    {{ $t("languages." + home.filters.language) }}
    <IconClose class="close" @click="home.resetFilter('language')"></IconClose>
  </div>

  <div class="chip" v-if="home.filters.author">
    <IconAuthor></IconAuthor>
    {{ home.filters.author }}
    <IconClose class="close" @click="home.resetFilter('author')"></IconClose>
  </div>
</template>

<style scoped>
.chip {
  background-color: var(--surface);
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  gap: 0.5rem;
  margin: -0.3rem 0.5rem;
  fill: var(--text);
}

.outer {
  border-radius: 10px;
  display: inline-block;
  fill: var(--text);
}

.outer:hover {
  fill: var(--accent);
}

button {
  border: none;
  background-color: var(--background);
  width: 5rem;
  color: var(--text);
  font-size: 17px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  padding: 0.2rem 0rem;
  fill: var(--text);
}

button:hover {
  color: var(--accent);
  fill: var(--accent);
}

.inner button {
  padding: 0.5rem;
  background-color: transparent;
  display: flex;
  justify-content: start;
  width: 8rem;
}

.inner {
  background-color: var(--surface);
  border-radius: 10px;
  padding: 0.5rem;
  border: solid 0.5px var(--text);
  position: absolute;
  z-index: 2;
  margin-top: 1rem;
}

.close:hover {
  fill: var(--accent);
}
</style>
