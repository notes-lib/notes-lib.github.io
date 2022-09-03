<script setup>
import IconTag from "@/components/icons/IconTag.vue";
import IconAuthor from "@/components/icons/IconAuthor.vue";
import IconLanguage from "@/components/icons/IconLanguage.vue";
import IconFilter from "@/components/icons/IconFilter.vue";
import FilterModal from "@/components/home/FilterModal.vue";
import IconClose from "@/components/icons/IconClose.vue";
import { tags, languages } from "@/assets/config.js";

import { hideAllPoppers } from "floating-vue";
import { ref } from "vue";
let placeholder = ref("home.filter");
const emit = defineEmits(["close", "filter"]);

let showTag = ref(false);
let showAuthor = ref(false);
let showLanguage = ref(false);

let selectedTag = ref("");
let selectedLanguage = ref("");
let selectedAuthor = ref("");

var show = ref(false);

const props = defineProps(['authors']);
var authors = [];
console.log(props.authors);
props.authors.forEach((value) => {
  authors.push(value.author);
})

function clicked(filter) {
  show.value = false;
  if (filter === "tag") showTag.value = true;
  if (filter === "language") showLanguage.value = true;
  if (filter === "author") showAuthor.value = true;

  hideAllPoppers();
}

function filterTag(value) {
  selectedTag.value = value;
  emit("filter", "tag", selectedTag.value);
}

function clearTagFilter() {
  selectedTag.value = "";
  emit("close", 'tag');
}

function filterLanguage(value) {
  selectedLanguage.value = value;
  emit("filter", "language", selectedLanguage.value);
}

function clearLanguageFilter() {
  selectedLanguage.value = "";
  emit("close", 'language');
}

function filterAuthor(value) {
  selectedAuthor.value = value;
  emit("filter", "author", selectedAuthor.value);
}

function clearAuthorFilter() {
  selectedAuthor.value = "";
  emit("close", 'author');
}
</script>

<template>
  <div class="outer">
      <button @click="show = !show">
        <icon-filter></icon-filter>
        {{ $t("home.filter") }}
      </button>

      <div v-if="show" class="inner">
        <button @click="clicked('tag')">
          <icon-tag></icon-tag>{{ $t("home.tag") }}
        </button>
        <button @click="clicked('author')">
          <icon-author></icon-author>{{ $t("home.author") }}
        </button>
        <button @click="clicked('language')">
          <icon-language></icon-language>{{ $t("home.language") }}
        </button>
      </div>

    <filter-modal
      v-if="showTag"
      filter="tag"
      :options="tags"
      @close="showTag = false"
      @filter="filterTag"
    ></filter-modal>
    <filter-modal
      v-if="showLanguage"
      filter="language"
      :options="languages"
      @close="showLanguage = false"
      @filter="filterLanguage"
    ></filter-modal>
    <filter-modal
      v-if="showAuthor"
      filter="author"
      :options="authors"
      @close="showAuthor = false"
      @filter="filterAuthor"
    ></filter-modal>
  </div>
  <div class="chip" v-if="selectedTag != ''">
    <IconTag></IconTag>
    {{ $t(selectedTag) }}
    <IconClose class="close" @click="clearTagFilter()"></IconClose>
  </div>
  <div class="chip" v-if="selectedLanguage != ''">
    <IconLanguage></IconLanguage>
    {{ $t(selectedLanguage) }}
    <IconClose class="close" @click="clearLanguageFilter()"></IconClose>
  </div>
  <div class="chip" v-if="selectedAuthor != ''">
    <IconAuthor></IconAuthor>
    {{ $t(selectedAuthor) }}
    <IconClose class="close" @click="clearAuthorFilter()"></IconClose>
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
