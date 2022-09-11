<script setup>
import { useNewNoteStore } from "@/stores/newNote";

import Editor from "@/components/newNote/editor.vue";
import Navbar from "@/components/Navbar.vue";
import TagModal from "@/components/newNote/tagModal.vue";
import Modal from "@/components/generic/Modal.vue";
import WarningModal from "@/components/generic/WarningModal.vue";
import Router from "@/router/index.js";

import IconAdd from "@/components/icons/IconAdd.vue";
import IconTag from "@/components/icons/IconTag.vue";
import IconLanguage from "@/components/icons/IconLanguage.vue";
import IconAuthor from "@/components/icons/IconAuthor.vue";
import IconFlag from "@/components/icons/IconFlag.vue";
import IconContent from "@/components/icons/IconContent.vue";
import IconSources from "@/components/icons/IconSources.vue";
import IconDelete from "@/components/icons/IconDelete.vue";
import IconSubmit from "@/components/icons/IconSubmit.vue";

import { tags, languages } from "@/assets/config.js";
import { useHead } from "@vueuse/head";
import { useI18n } from "vue-i18n";

//set head
const { t } = useI18n({ useScope: "global" });

useHead({
  title: t("newNote.contribute"),
});

const newNote = useNewNoteStore();
newNote.getAll();
//save in local storage every few seconds
setInterval(() => newNote.setAll(), 3000);
</script>

<template>
  <div v-if="newNote.isContent === false && newNote.isSources === false">
    <Navbar></Navbar>
    <modal
      v-if="newNote.isClear"
      @close="newNote.isClear = false"
      @action="newNote.clearAll()"
      title="newNote.confirmClear"
      action="newNote.clearAll"
    ></modal>
    <modal
      v-if="newNote.isSubmit"
      @close="newNote.isSubmit = false"
      @action="newNote.submitAll()"
      title="newNote.confirmSubmit"
      action="newNote.submit"
    ></modal>
    <TagModal v-if="newNote.isTag"></TagModal>
    <WarningModal
      v-if="newNote.warningMessage !== ''"
      @close="newNote.warningMessage = ''"
    >
      <p>{{ $t(newNote.warningMessage) }}</p>
    </WarningModal>
    <div class="width">
      <div class="margin">
        <h2><IconAdd></IconAdd>{{ $t("newNote.contribute") }}</h2>
        <div class="double">
          <div class="second" id="edit">
            <h4><IconFlag></IconFlag>{{ $t("newNote.title") }}</h4>
            <input
              maxlength="100"
              v-model="newNote.title"
              :placeholder="$t('newNote.titleExample')"
            />
          </div>
          <div class="first">
            <h4><IconTag></IconTag>{{ $t("newNote.tag") }}</h4>
            <button @click="newNote.isTag = true" class="tag">
              {{ newNote.tag != "" ? $t(newNote.tag) : $t("newNote.select") }}
            </button>
          </div>
        </div>
        <div class="double">
          <div class="first">
            <h4><IconAuthor></IconAuthor>{{ $t("newNote.username") }}</h4>
            <input
              maxlength="35"
              v-model="newNote.author"
              :placeholder="$t('newNote.authorExample')"
            />
          </div>
          <div class="second">
            <p>{{ $t("newNote.explain") }}</p>
          </div>
        </div>
        <div class="language">
          <h4><IconLanguage></IconLanguage>{{ $t("newNote.language") }}</h4>
          <div class="inner">
            <button
              @click="
                newNote.language = language;
                newNote.setAll();
              "
              v-for="language in languages"
              :key="language"
              :style="{
                color:
                  newNote.language === language
                    ? 'var(--background) !important'
                    : 'var(--text)',
                'background-color':
                  newNote.language === language
                    ? 'var(--accent)'
                    : 'var(--background)',
              }"
            >
              {{ $t("languages." + language) }}
            </button>
          </div>
        </div>
        <div class="editors">
          <div class="content">
            <div class="main">
              <h4><IconContent></IconContent>{{ $t("newNote.content") }}</h4>
              <button @click="newNote.isContent = true">
                {{ $t("newNote.openEditor") }}
              </button>
            </div>
            <div class="sources">
              <span
                ><h4><IconSources></IconSources>{{ $t("newNote.sources") }}</h4>
                <em>{{ $t("newNote.optional") }}</em></span
              >
              <button @click="newNote.isSources = true">
                {{ $t("newNote.openEditor") }}
              </button>
            </div>
          </div>
          <div class="explain">
            <ul>
              <i18n-t
                keypath="newNote.contentExplain1"
                tag="li"
                for="newNote.contentExplain1"
              >
                <a
                  href="https://www.markdownguide.org/cheat-sheet/"
                  target="_blank"
                  >markdown</a
                >
              </i18n-t>

              <li>{{ $t("newNote.contentExplain2") }}</li>

              <i18n-t
                keypath="newNote.contentExplain3"
                tag="li"
                for="newNote.contentExplain3"
              >
                <a href="https://imgur.com/" target="_blank">imgur</a>
              </i18n-t>
            </ul>
          </div>
        </div>
        <div class="final">
          <IconDelete @click="newNote.isClear = true"></IconDelete>
          <span
            ><button
              @click="
                newNote.setAll();
                Router.push('/');
              "
            >
              {{ $t("newNote.cancel") }}
            </button>
            <button @click="newNote.isSubmit = true" class="submit">
              <IconSubmit></IconSubmit>{{ $t("newNote.submit") }}
            </button></span
          >
        </div>
      </div>
    </div>
  </div>
  <Editor v-if="newNote.isContent" storageKey="addContent"></Editor>
  <Editor v-if="newNote.isSources" storageKey="addSources"></Editor>
</template>

<style scoped>
.final {
  margin: 1rem 0rem;
  width: 100%;
  display: flex;
  gap: 1rem;
  justify-content: space-between;
}

.final span {
  display: flex;
  gap: 1rem;
}

.final svg:hover {
  fill: var(--accent);
}

.final button {
  padding: 0.8rem 1.5rem;
  background-color: var(--surface);
}

.final .submit {
  background-color: var(--accent);
  color: var(--background);
  display: flex;
  align-items: center;
  fill: var(--background);
  gap: 0.5rem;
}

.final .submit:hover {
  background-color: var(--surface);
  color: var(--accent);
  fill: var(--accent);
}

.editors {
  margin: 1rem 0rem;
  display: flex;
  flex-direction: row;
  gap: 1rem;
  flex-wrap: wrap;
}

.explain {
  flex: 10 0 10rem;
  background-color: var(--surface);
  border-radius: 10px;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.explain ul {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.width {
  max-width: 55rem;
  margin: auto;
  fill: var(--text);
}

.content {
  flex-basis: 12rem;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  gap: 1rem;
}

.content .main {
  background-color: var(--surface);
  padding: 2rem;
  border-radius: 10px;
  flex-grow: 1;
  gap: 1rem;
  display: flex;
  flex-direction: column;
}

.content .sources {
  background-color: var(--surface);
  padding: 2rem;
  border-radius: 10px;
  flex-grow: 1;
  display: flex;
  gap: 1rem;
  flex-direction: column;
}

.sources em {
  opacity: 0.5;
  margin-left: 2rem;
}

.margin {
  margin: 0rem 1rem;
}

h2 {
  margin: 2rem 0rem;
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

h4 {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

input {
  padding: 0.5rem;
  border-radius: 10px;
  background-color: var(--background);
  color: var(--text);
  border: none;
  outline: none;
  font-size: 17px;
  display: block;
}

.double {
  flex-direction: row;
  margin: 1rem 0rem;
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;
  align-items: stretch;
  align-content: center;
}

.first {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  justify-content: center;
  padding: 2rem;
  background-color: var(--surface);
  border-radius: 10px;
  flex: 1 0 5rem;
}

.second {
  flex: 2 0 10rem;
  padding: 2rem;
  gap: 1rem;
  display: flex;
  flex-direction: column;
  background-color: var(--surface);
  border-radius: 10px;
  justify-content: center;
}

#edit {
  flex: 4.5 0 10rem;
}

.first input {
  width: auto;
}

.language {
  display: flex;
  background-color: var(--surface);
  border-radius: 10px;
  padding: 1.5rem 2rem;
  gap: 1rem;
  align-items: start;
  flex-direction: column;
}

.language .inner {
  display: flex;
  flex-wrap: wrap;
  gap: 0.7rem;
}

button {
  padding: 0.5rem 1rem;
  border-radius: 10px;
  background-color: var(--background);
  border: none;
  outline: none;
  color: var(--text);
  font-size: 17px;
}

.language button {
  font-size: 16px;
}

button:hover {
  color: var(--accent) !important;
}

::placeholder {
  font-style: italic;
}

a {
  color: var(--accent);
}
</style>
