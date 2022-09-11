<script setup>
import { useModalsStore } from "@/stores/modals.js";

import IconClose from "@/components/icons/IconClose.vue";

const modals = useModalsStore();
</script>

<template>
  <div class="modal-overlay">
    <div class="modal">
      <h3 class="top">
        {{ $t("indications.indications")
        }}<IconClose
          class="click"
          @click="modals.indications = false"
        ></IconClose>
      </h3>
      <div class="bottom">
        <ol>
          <li>
            <h3>{{ $t("indications.one") }}</h3>
          </li>
          <li>
            <h3>{{ $t("indications.two") }}</h3>
          </li>
          <li>
            <h3>{{ $t("indications.three") }}</h3>
          </li>
          <li>
            <h3>{{ $t("indications.four") }}</h3>
          </li>
          <li>
            <h3>{{ $t("indications.five") }}</h3>
          </li>
          <li>
            <h3>{{ $t("indications.six") }}</h3>
          </li>
          <li>
            <h3>{{ $t("indications.seven") }}</h3>
          </li>
        </ol>
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
  max-height: 90%;
  margin: 1rem;
  top: 50%;
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
  border: solid 1px var(--text);
  border-radius: 10px;
  overflow-y: auto;
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

h3.top {
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

li {
  padding-bottom: 1rem;
  padding-left: 1rem;
  margin-left: 0.5rem;
}
</style>
