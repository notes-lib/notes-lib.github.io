<script setup>
import Markdown from "vue3-markdown-it";
import TexMath from "markdown-it-texmath";
import Caption from "markdown-it-image-caption";
import "highlight.js/styles/nord.css";
import IconUp from "@/components/icons/IconUp.vue";

const props = defineProps(["content", "sources", "menu"]);

var plugins = [
  {
    plugin: TexMath,
  },
  {
    plugin: Caption, //not working
  },
];

var showMenu = false;

function moveUp() {
  window.scrollTo(0, 0);
}
</script>

<template>
  <link
    rel="stylesheet"
    href="https://cdn.jsdelivr.net/npm/katex/dist/katex.min.css"
  />
  <div>
    <Markdown
      :class="{ menu: props.menu }"
      :plugins="plugins"
      :source="'[toc]\n' + props.content"
    />
    <div
      class="sources"
      v-if="
        props.sources !== null &&
        props.sources !== 'null' &&
        props.sources !== ''
      "
    >
      <h2>{{ $t("note.sources") }}</h2>
      <Markdown :plugins="plugins" :source="props.sources" />
    </div>
    <div @click="moveUp()" class="scroll">
      <IconUp></IconUp>
    </div>
  </div>
</template>

<style scoped>
@import url(//fonts.googleapis.com/css?family=Source+Code+Pro);

:deep(.table-of-contents) a {
  pointer-events: none;
  cursor: default;
}
:deep(.katex-display) {
  overflow: auto;
  white-space: nowrap;
}

.sources {
  border-left: 5px solid var(--surface);
  padding-left: 2rem;
  margin-top: 1rem;
}

.scroll {
  fill: var(--accent);
  height: 3rem;
  width: 3rem;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  bottom: 0px;
  right: 0px;
  margin: 1rem;
  border-radius: 10px;
}

.scroll svg {
  height: 2rem;
  width: 2rem;
}

:deep(p) {
  font-size: 16px;
  line-height: 32px;
}

:deep(h1),
:deep(h2),
:deep(h3),
:deep(h4),
:deep(h5),
:deep(h6) {
  margin-top: 2rem;
}

:deep(h1) {
  font-size: 30px;
}

:deep(h2) {
  font-size: 26px;
}

:deep(h3) {
  font-size: 24px;
}

:deep(h4) {
  font-size: 22px;
}

:deep(h5) {
  font-size: 20px;
}

:deep(h6) {
  font-size: 18px;
}

:deep(a) {
  color: var(--accent);
}

:deep(ul) {
  margin-top: 1rem;
  margin-left: 1.5rem;
  font-size: 16px;
}

:deep(ol) {
  margin-left: 1.5rem;
  font-size: 16px;
}

:deep(p) {
  margin-top: 1rem;
}

:deep(li) {
  padding: 0.5rem;
}

:deep(li::marker) {
  color: var(--accent);
}

:deep(pre) {
  margin: 1rem 0rem;
  font-size: 16px;
  border-radius: 10px;
}

:deep(code) {
  border-radius: 10px;
  font-family: "Source Code Pro Medium", monospace;
}

:deep(hr) {
  border: none;
  padding: 0.5rem 0rem;
  border-top: 1px solid var(--accent);
}

:deep(table) {
  margin-top: 1rem;
  border-collapse: collapse;
}

:deep(th),
:deep(td) {
  border: 1px solid var(--text);
  padding: 0.5rem;
}

:deep(img) {
  margin-top: 1rem;
  max-height: 35rem;
  max-width: 100%;
}

:deep(.table-of-contents) {
  display: none;
}

:deep(blockquote) {
  border-left: 5px solid var(--surface);
  padding-left: 1rem;
  margin-top: 1rem;
}

.menu :deep(.table-of-contents) {
  margin-top: 1rem;
  background-color: var(--surface);
  border-radius: 10px;
  padding: 1rem;
  display: block;
}

.menu :deep(.table-of-contents a) {
  text-decoration: none;
  color: var(--text);
}
</style>
