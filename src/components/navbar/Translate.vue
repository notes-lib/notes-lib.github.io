<script setup>
import { useSettingsStore } from "@/stores/settings.js";
import { useModalsStore } from "@/stores/modals.js";

import IconClose from "@/components/icons/IconClose.vue";
import IconLanguage from "@/components/icons/IconLanguage.vue";

const settings = useSettingsStore();
const modals = useModalsStore();
</script>

<template>
  <div class="modal-overlay">
    <div class="modal">
      <h3>
        <IconLanguage></IconLanguage>
        <IconClose class="click" @click="modals.translate = false"></IconClose>
      </h3>
      <div class="bottom">
        <button
          @click="
            settings.updateLanguage('en');
            $i18n.locale = settings.language;
            modals.translate = false;
          "
        >
          English
        </button>
        <button
          @click="
            settings.updateLanguage('it');
            $i18n.locale = settings.language;
            modals.translate = false;
          "
        >
          Italiano
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
  min-height: 12rem;
  margin: 1rem;
  top: 50%;
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
  border: solid 1px var(--text);
  border-radius: 10px;
}

button {
  width: 8rem;
  background-color: var(--surface);
  color: var(--text);
  font-size: 1.2rem;
  font-weight: bold;
  border-radius: 10px;
  padding: 1rem;
  border: none;
}

button:hover {
  color: var(--accent);
}

.bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem 2rem;
  gap: 2rem;
  flex-wrap: wrap;
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
  gap: 1rem;
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

svg.click:hover {
  fill: var(--accent);
}
</style>
