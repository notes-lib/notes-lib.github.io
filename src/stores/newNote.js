import { url } from "@/assets/url.js";
import Router from "@/router/index.js";

import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";

export const useNewNoteStore = defineStore("newNote", () => {
  //modals
  const isTag = ref(false);
  const isClear = ref(false);
  const isSubmit = ref(false);
  const warningMessage = ref("");

  //input values
  const title = ref("");
  const author = ref("");
  const tag = ref("");
  const language = ref("");
  const content = ref("");
  const sources = ref("");

  //editors
  const isContent = ref(false);
  const isSources = ref(false);

  function getAll() {
    if (title.value === "")
      title.value = localStorage.getItem("addTitle") ?? "";
    //author is also used globally for comments and such, hence author and not addAuthor
    if (author.value === "")
      author.value = localStorage.getItem("author") ?? "";
    if (tag.value === "") tag.value = localStorage.getItem("addTag") ?? "";
    if (language.value === "")
      language.value = localStorage.getItem("addLanguage") ?? "";
    if (content.value === "")
      content.value = localStorage.getItem("addContent") ?? "";
    if (sources.value === "")
      sources.value = localStorage.getItem("addSources") ?? "";
  }

  function setAll() {
    localStorage.setItem("addTitle", title.value);
    //author is also used globally for comments and such, hence author and not addAuthor
    localStorage.setItem("author", author.value);
    localStorage.setItem("addTag", tag.value);
    localStorage.setItem("addLanguage", language.value);
    localStorage.setItem("addContent", content.value);
    localStorage.setItem("addSources", sources.value);
  }

  function clearAll() {
    title.value = "";
    tag.value = "";
    language.value = "";
    content.value = "";
    sources.value = "";
    setAll();

    isClear.value = false;
  }

  function submitAll() {
    //validate
    if (validate() != true) {
        isSubmit.value = false;
        return;
    }

    //assign anon if empty author
    if (author.value === "" || author.value === null) author.value = "anon";

    axios
      .post(
        url + "createNote.php",
        {
          title: title.value,
          language: language.value,
          tag: tag.value.replace("tags.", ""),
          author: author.value,
          content: content.value,
          sources: sources.value,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then(function (response) {
        isSubmit.value = false;
        Router.push("/");
        clearAll();
      })
      .catch(function (error) {
        console.log(error);
        isSubmit.value = false;
        warningMessage.value = "newNote.wentWrong";
        return;
      });
  }

  function validate() {
    let isValid = true;
    warningMessage.value = "";

    if (title.value.length < 5) warningMessage.value = "newNote.addTitle";
    if (tag.value.length < 1) warningMessage.value = "newNote.addTag";
    if (language.value.length < 3) warningMessage.value = "newNote.addLanguage";
    if (content.value.length < 300) warningMessage.value = "newNote.addContent";
    if (content.value.length > 30000) warningMessage.value = "newNote.removeContent";
    if (sources.value.length > 10000) warningMessage.value = "newNote.removeSources";

    if (warningMessage.value != "") isValid = false;
    return isValid;
  }

  return {
    isTag,
    isClear,
    isSubmit,
    warningMessage,
    title,
    author,
    tag,
    language,
    content,
    sources,
    isContent,
    isSources,
    getAll,
    setAll,
    clearAll,
    submitAll,
  };
});
