<script setup>
import WarningModal from "@/components/generic/WarningModal.vue";

import IconAuthor from "@/components/icons/IconAuthor.vue";
import IconSubmit from "@/components/icons/IconSubmit.vue";

import { ref } from "vue";

let author = ref(localStorage.getItem("author") ?? "");
let content = ref("");
let warningMessage = ref("");

import axios from "axios";
import { useRoute } from "vue-router";
import { url } from "@/assets/url.js";

import "https://cdn.rawgit.com/JDMcKinstry/JavaScriptDateFormat/master/Date.format.min.js";

const route = useRoute();

const emit = defineEmits(["newComment"]);

function submit() {
  if (content.value.length < 1) return;

  if (content.value.length > 2000) warningMessage.value = "note.maxComment";

  if (author.value === "") author.value = "anon";

  axios
    .post(
      url + "createComment.php",
      {
        id: route.params.id,
        author: author.value,
        content: content.value,
      },
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    )
    .then(function (response) {
      emit(
        "newComment",
        author.value,
        content.value,
        new Date().format("Y-m-d h:i:s")
      );
    })
    .catch(function (error) {
      alert("Something went wrong");
    });
}
</script>

<template>
  <WarningModal @close="warningMessage = ''" v-if="warningMessage != ''">{{$t(warningMessage)}}</WarningModal>
  <div class="outer">
    <div class="top">
      <div class="author">
        <IconAuthor></IconAuthor>
        <div class="input">
          <input
            v-model="author"
            type="text"
            :placeholder="$t('note.username')"
          />
        </div>
      </div>
      <div class="submit" @click="submit()">
        <button>
          <IconSubmit></IconSubmit>
          {{ $t("note.submit") }}
        </button>
      </div>
    </div>
    <textarea
      maxlength="10000"
      v-model="content"
      :placeholder="$t('note.content')"
      contenteditable="true"
      name="comment"
      id="comment"
    ></textarea>
  </div>
</template>

<style scoped>
.outer {
  background-color: var(--surface);
  padding: 2rem;
  border-radius: 10px;
  font-size: 17px;
  display: flex;
  gap: 1rem;
  flex-direction: column;
}

.top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap-reverse;
  gap: 1rem;
}

.author {
  display: flex;
  gap: 1rem;
  align-items: center;
  flex-shrink: 1;
}

button {
  font-size: 17px;
  border-radius: 10px;
  border: none;
  background-color: var(--accent);
  color: var(--background);
  display: flex;
  align-items: center;
  fill: var(--background);
  gap: 0.5rem;
  padding: 0.5rem 1rem;
}

button:hover {
  background-color: var(--background);
  color: var(--accent);
  fill: var(--accent);
}

input {
  padding: 0.5rem;
  border-radius: 10px;
  background-color: var(--background);
  color: var(--text);
  border: none;
  outline: none;
  font-size: 17px;
  width: 100%;
  box-sizing:border-box;
}

.input {
  flex-shrink: 1;
  flex-basis: 5rem;
  flex-grow: 1;
  display: block;
}

textarea {
  border-radius: 10px;
  padding: 1rem;
  background-color: var(--background);
  color: var(--text);
  border: none;
  outline: none;
  font-size: 17px;
  display: block;
  height: 5rem;
  font-family: "Inter", sans-serif;
  resize: none;
}
</style>
