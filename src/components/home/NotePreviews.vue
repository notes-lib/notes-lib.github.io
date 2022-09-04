<script setup>
import NotePreview from "./NotePreview.vue";
import Sort from "./Sort.vue";
import Filter from "./Filter.vue";
import ClipLoader from "vue-spinner/src/ClipLoader.vue";
import IconSearch from "@/components/icons/IconSearch.vue";
import { url } from "@/assets/url.js";
import axios from "axios";
import { ref } from "vue";

const size = "4rem";
let loading = ref(true);
const color = "var(--accent)";
var data = ref([]);
var authors = ref([]);
var showSearch = ref(false);
var search = ref('');

axios
  .get(url + "readNotePreviews.php")
  .then(function (response) {
    data.value = response.data;
    filters.filtered.value = data.value;
    sortDate();
  });
  
axios
  .get(url + "readAuthors.php")
  .then(function (response) {
    loading.value = false;
    authors.value = response.data;
  });

function formatDate(dateString) {
  let date = new Date(dateString + "Z");
  return (
    date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear()
  );
}

function sortDate() {
  data.value.sort(function (a, b) {
    return new Date(b.date) - new Date(a.date);
  });
  filters.filter();
}

function sortViews() {
  data.value.sort((a, b) => b.views - a.views);
  filters.filter();
}

function sortLikes() {
  data.value.sort((a, b) => b.likes - a.likes);
  filters.filter();
}

function rightFilter(type, value) {
  if (type === 'tag') filters.tag = value.replace('tags.', '');
  if (type === 'language') filters.language = value.replace('languages.', '');
  if (type === 'author') filters.author = value;
  filters.filter();
}

function reset(type) {
  if (type === 'tag') filters.tag = null;
  if (type === 'language') filters.language = null;
  if (type === 'author') filters.author = null;
  filters.filter();
}

function swapSearch() {
  showSearch.value = !showSearch.value;
  search.value = '';
  filters.filter();
}

class Filters {
  tag = null;
  language = null;
  author = null;
  filtered = ref([]);
  
  filter() {
    console.log(search.value);
    let temp = data.value;
    if (this.tag != null) {
      temp = temp.filter(i => i.tag === this.tag);
    }
    if (this.language != null) {
      temp = temp.filter(i => i.language === this.language);
    }
    if (this.author != null) {
      temp = temp.filter(i => i.author === this.author);
    }
    if (search != null) {
      temp = temp.filter(i => i.title.toLowerCase().includes(search.value.toLowerCase()));
    }
    this.filtered.value = temp;
  }
}

var filters = new Filters();
console.log(filters);
</script>

<template>
  <div class="notes-section" v-if="!loading">
    <div class="order">
      <div class="first">
        <sort @date="sortDate()" @views="sortViews()" @likes="sortLikes()"></sort>
        <Filter @filter="rightFilter" @close="reset" :authors="authors"></Filter>
      </div>
      <div class="second">
        <IconSearch @click="swapSearch()"></IconSearch>
        <input v-if="showSearch" :placeholder="$t('home.search')" type="text" v-model="search" @input="filters.filter()">
      </div>
    </div>
    <div class="notes">
      <div v-for="note in filters.filtered.value || []" :key="note['id']">
        <note-preview @click="$router.push({name: 'Note', params: {id: note['id']}})" :tag="note['tag']" :id="note['id']">
          <template v-slot:title>
            {{ note["title"] }}
          </template>
          <template v-slot:author>
            {{ note["author"] }}
          </template>
          <template v-slot:date>
            {{ formatDate(note["date"]) }}
          </template>
        </note-preview>
      </div>
    </div>
    <div v-if="!filters.filtered.value.length" class="none">
      <h3>
        {{ $t('home.nonotes') }}
      </h3>
    </div>
  </div>
  <div class="loading" v-if="loading">
    <clip-loader :loading="loading" :color="color" :size="size"></clip-loader>
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
  fill:var(--accent);
}

.second {
  display: flex;
  fill:var(--text);
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
