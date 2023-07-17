<script setup>
import { useNewNoteStore } from "@/stores/newNote";

import IconCheck from "@/components/icons/IconCheck.vue";

import Ink from "ink-mde/vue";

const props = defineProps(["storageKey"]);

const newNote = useNewNoteStore();

function close() {
  if (props.storageKey === "addContent") newNote.isContent = false;

  if (props.storageKey === "addSources") newNote.isSources = false;
}

const options = {
  doc: "",
  files: {
    clipboard: false,
    dragAndDrop: false,
    handler: () => {},
    injectMarkup: true,
    types: ["image/*"],
  },
  hooks: {
    afterUpdate: () => {},
    beforeUpdate: () => {},
  },
  interface: {
    //appearance: InkValues.Appearance.Auto,
    attribution: false,
    autocomplete: true,
    images: true,
    readonly: false,
    spellcheck: true,
    toolbar: true,
  },
  katex: true,
  selections: [],
  toolbar: {
    bold: true,
    code: true,
    codeBlock: true,
    heading: true,
    image: true,
    italic: true,
    link: true,
    list: true,
    orderedList: true,
    quote: true,
    taskList: false,
    upload: false,
  },
  vim: false,
};
</script>

<template>
  <div class="main">
    <div class="top" @click="close()">
      <IconCheck></IconCheck>
    </div>
    <Ink
      v-if="props.storageKey === 'addContent'"
      class="editor"
      v-model="newNote.content"
      :options="options"
    />
    <Ink
      v-else
      class="editor"
      v-model="newNote.sources"
      :options="options"
    />
  </div>
</template>

<style scoped>
@import url(//fonts.googleapis.com/css?family=Inter);
@import url(//fonts.googleapis.com/css?family=Source+Code+Pro);

.main {
  background-color: var(--background);
}

.top {
  fill: var(--background);
  height: 4rem;
  width: 4rem;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  bottom: 0px;
  right: 0px;
  background-color: var(--accent);
  margin: 1rem;
  border-radius: 10px;
}

.top svg {
  height: 2rem;
  width: 2rem;
}

.top:hover {
  background-color: var(--surface);
  fill: var(--accent);
}

.cm-focused {
  outline: none !important;
}

.editor {
  max-width: 55rem;
  margin: auto;
  --ink-border-radius: 10px;
  --ink-color: var(--text);
  --ink-font-family: "Inter", sans-serif;
  --ink-block-background-color: var(--surface);
  --ink-block-background-color-on-hover: var(--background);
  --ink-syntax-link-color: var(--accent);
  --ink-syntax-processing-instruction-color: var(--accent);
  --ink-code-font-family: "Source Code Pro Medium", monospace;
}

.editor :deep(.cm-content) {
  caret-color: var(--text);
  flex-grow: 1;
}

.editor :deep(.cm-focused) {
  outline: none;
}

.editor :deep(.ink-toolbar) {
  justify-content: center;
}

.editor :deep(.cm-scroller) {
  min-height: 20rem;
}
</style>
