import { url } from "@/assets/url.js";

import { ref } from "vue";
import { defineStore } from "pinia";
import axios from "axios";

class Filters {
  tag = null;
  language = null;
  author = null;
}

export const useHomeStore = defineStore("home", () => {
  //raw data is taken directly from the API and sorted
  const rawData = ref([]);
  //display data is filtered
  const displayData = ref([]);
  const authors = ref([]);
  const search = ref("");
  const isShowSearch = ref(false);

  //default value date
  const sorted = ref("date");
  //placeholder used in UI
  const sortPlaceholder = ref("home.sort");
  const isShowSort = ref(false);

  const filters = ref(new Filters());
  const isShowFilter = ref(false);

  //filter modals
  const isTag = ref(false);
  const isLanguage = ref(false);
  const isAuthor = ref(false);

  //filter modal options list
  const optionsList = ref([]);

  function getData() {
    let getNotePreviews = axios.get(url + "readNotePreviews.php");
    let getAuthors = axios.get(url + "readAuthors.php");

    //perform concurrent requests
    axios.all([getNotePreviews, getAuthors]).then(
      axios.spread((...response) => {
        rawData.value = response[0].data;

        //we can't actually use raw data as occurences are also fetched
        try {
          authors.value = [];
          response[1].data.forEach((value) => authors.value.push(value.author));
        } catch (e) {
          console.log(e);
        }

        sort();
      })
    );
  }

  function sort() {
    switch (sorted.value) {
      case "date":
        rawData.value.sort(function (a, b) {
          return new Date(b.date) - new Date(a.date);
        });
        break;
      case "views":
        rawData.value.sort((a, b) => b.views - a.views);
        break;
      case "likes":
        rawData.value.sort((a, b) => b.likes - a.likes);
        break;
    }
    //we have to call filter at the end as displayData is displayed, not rawData
    //hence only updating rawData wouldn't work
    filter();
  }

  function setSort(type) {
    sorted.value = type;
    sortPlaceholder.value = "home." + type;
    isShowSort.value = false;
    sort();
  }

  function filter() {
    let temp = rawData.value;
    if (filters.value.tag != null) {
      temp = temp.filter((i) => i.tag === filters.value.tag);
    }
    if (filters.value.language != null) {
      temp = temp.filter((i) => i.language === filters.value.language);
    }
    if (filters.value.author != null) {
      temp = temp.filter((i) => i.author === filters.value.author);
    }
    if (search.value != "") {
      //needed lowerCase for case insensitivity
      temp = temp.filter((i) =>
        i.title.toLowerCase().includes(search.value.toLowerCase())
      );
    }
    //update reactive displayData
    displayData.value = temp;
  }

  function setFilter(type, value) {
    switch (type) {
      case "tag":
        filters.value.tag = value.replace("tags.", "");
        break;
      case "language":
        filters.value.language = value.replace("languages.", "");
        break;
      case "author":
        filters.value.author = value;
        break;
    }
    filter();

    //close all modals
    isShowFilter.value = false;
    isTag.value = false;
    isLanguage.value = false;
    isAuthor.value = false;
  }

  function resetFilter(type) {
    //reset a specific filter type
    switch (type) {
      case "tag":
        filters.value.tag = null;
        break;
      case "language":
        filters.value.language = null;
        break;
      case "author":
        filters.value.author = null;
        break;
    }
    filter();
  }

  function showFilterModal(type) {
    isShowFilter.value = false;

    if (type === "tag") isTag.value = true;
    if (type === "language") isLanguage.value = true;
    if (type === "author") isAuthor.value = true;
  }

  function updateSearch() {
    isShowSearch.value = !isShowSearch.value;
    search.value = "";
    filter();
  }

  return {
    optionsList,
    rawData,
    displayData,
    authors,
    search,
    isShowSearch,
    sortPlaceholder,
    isShowSort,
    filters,
    isShowFilter,
    isTag,
    isLanguage,
    isAuthor,
    getData,
    setSort,
    filter,
    setFilter,
    resetFilter,
    updateSearch,
  };
});
