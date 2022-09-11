<script setup>
import { useNewNoteStore } from "@/stores/newNote";

import IconClose from "@/components/icons/IconClose.vue";
import { tags } from "@/assets/config.js";

var displayList = [];

for (var i in tags) {
  displayList.push("tags." + tags[i]);
}

const newNote = useNewNoteStore();

function emitResponse(e) {
  newNote.tag = e.target.value;
  newNote.isTag = false;
}
</script>

<template>
  <div class="modal-overlay">
    <div class="modal">
      <h3>
        {{ $t("home.choosetag")
        }}<icon-close @click="newNote.isTag = false"></icon-close>
      </h3>
      <div class="tag">
        <button
          @click="emitResponse($event)"
          v-for="i in displayList"
          :value="i"
        >
          {{ $t(i) }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal {
  z-index: 2;
  position: fixed;
  background-color: var(--background);
  max-width: 30rem;
  height: 30rem;
  margin: 1rem;
  top: 50%;
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
  border: solid 1px var(--text);
  border-radius: 10px;
}

.tag {
  overflow-y: scroll;
  height: 22.3rem;
  padding: 1rem 2rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0rem;
}

.tag::-webkit-scrollbar {
  display: none;
}

button {
  width: 8rem;
  height: 2rem;
  background-color: transparent;
  color: var(--accent);
  border: none;
  font-size: 1.2rem;
  font-weight: bold;
}

h3 {
  font-weight: bold;
  background-color: var(--surface);
  padding: 2rem;
  border-radius: 10px 10px 0px 0px;
  display: flex;
  justify-content: space-between;
  font-size: 1.3rem;
  fill: var(--text);
}

svg:hover {
  fill: var(--accent);
}

.modal-overlay {
  z-index: 2;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  background-color: #000000a1;
}
</style>
