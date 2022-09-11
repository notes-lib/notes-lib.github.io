<script setup>
import { useHomeStore } from "@/stores/home";

import { url } from "@/assets/url.js";
import { formatDate } from "@/services/formatDate.js";
import NotePreview from "@/components/home/NotePreview.vue";
import Sort from "@/components/home/Sort.vue";
import Filter from "@/components/home/Filter.vue";

import IconSearch from "@/components/icons/IconSearch.vue";

import ClipLoader from "vue-spinner/src/ClipLoader.vue";

const home = useHomeStore();
home.getData();
</script>

<template>
  <div class="notes-section" v-if="home.rawData.length && home.authors.length">
    <div class="order">
      <div class="first">
        <Sort></Sort>
        <Filter></Filter>
      </div>
      <div class="second">
        <IconSearch @click="home.updateSearch()"></IconSearch>
        <input
          v-if="home.isShowSearch"
          :placeholder="$t('home.search')"
          type="text"
          v-model="home.search"
          @input="home.filter()"
        />
      </div>
    </div>
    <div class="notes">
      <div v-for="note in home.displayData" :key="note.id">
        <NotePreview
          @click="$router.push({ name: 'Note', params: { id: note.id } })"
          :tag="note.tag"
          :id="note.id"
        >
          <template v-slot:title>
            {{ note.title }}
          </template>
          <template v-slot:author>
            {{ note.author === 'anon' ? $t('note.anon') : note.author }}
          </template>
          <template v-slot:date>
            {{ formatDate(note.date) }}
          </template>
        </NotePreview>
      </div>
    </div>
    <div v-if="!home.displayData.length" class="none">
      <h3>
        {{ $t("home.nonotes") }}
      </h3>
    </div>
  </div>
  <div class="loading" v-if="!home.rawData.length && !home.authors.length">
    <ClipLoader
      :loading="!home.rawData.length && !home.authors.length"
      color="var(--accent)"
      size="4em"
    ></ClipLoader>
  </div>
</template>

<style scoped>
.notes {
  margin: 1rem;
  column-gap: 1rem;
  row-gap: 1rem;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(17rem, 1fr));
}

.loading {
  margin: 1rem;
  display: flex;
  justify-content: center;
  padding: 2rem;
  border-radius: 10px;
  background-color: var(--surface);
}

.order {
  display: flex;
  margin: 1rem;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1rem;
  align-items: center;
}

.first {
  flex-grow: 1;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.second:hover {
  fill: var(--accent);
}

.second {
  display: flex;
  fill: var(--text);
  margin: 0rem 0.5rem;
}

.second input {
  background-color: var(--background);
  border: none;
  border-bottom: 1px solid var(--text);
  padding: 0.2rem;
  color: var(--text);
  font-size: 17px;
  margin-left: 1rem;
}

.second input:focus {
  outline: none;
}

.none {
  padding: 2rem;
  border-radius: 10px;
  background-color: var(--surface);
  margin: -1rem 1rem;
}
</style>
