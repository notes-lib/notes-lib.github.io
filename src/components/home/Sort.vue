<script setup>
import { useHomeStore } from "@/stores/home";

import IconSort from "@/components/icons/IconSort.vue";
import IconDate from "@/components/icons/IconDate.vue";
import IconLike from "@/components/icons/IconLike.vue";
import IconView from "@/components/icons/IconView.vue";

import { ref } from "vue";

const home = useHomeStore();
</script>

<template>
  <div class="outer">
    <button
      @click="
        home.isShowSort = !home.isShowSort;
        home.isShowFilter = false;
      "
    >
      <icon-sort></icon-sort>
      {{ $t(home.sortPlaceholder) }}
    </button>

    <div v-if="home.isShowSort" class="inner">
      <button @click="home.setSort('date')">
        <icon-date></icon-date>{{ $t("home.date") }}
      </button>
      <button @click="home.setSort('likes')">
        <icon-like></icon-like>{{ $t("home.likes") }}
      </button>
      <button @click="home.setSort('views')">
        <icon-view></icon-view>{{ $t("home.views") }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.outer {
  fill: var(--text);
  border-radius: 10px;
  display: inline-block;
}

.outer:hover {
  fill: var(--accent);
}

button {
  border: none;
  background-color: var(--background);
  width: 5rem;
  color: var(--text);
  font-size: 17px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  fill: var(--text);
}

button:hover {
  color: var(--accent);
  fill: var(--accent);
}

.inner button {
  padding: 0.5rem;
  background-color: transparent;
  display: flex;
  justify-content: start;
  width: 8rem;
}

.inner {
  background-color: var(--surface);
  border-radius: 10px;
  padding: 0.5rem;
  border: solid 0.5px var(--text);
  position: absolute;
  z-index: 2;
  margin-top: 1rem;
}
</style>
