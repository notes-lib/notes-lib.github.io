<script setup>
import IconSort from "@/components/icons/IconSort.vue";
import IconDate from "@/components/icons/IconDate.vue";
import IconLike from "@/components/icons/IconLike.vue";
import IconView from "@/components/icons/IconView.vue";

import "floating-vue/dist/style.css";
import { hideAllPoppers } from "floating-vue";
import { ref } from "vue";
let placeholder = ref("home.sort");
const emit = defineEmits(["date", "likes", "views"]);

function clicked(sort) {
  emit(sort);
  placeholder.value = "home." + sort;
  hideAllPoppers();
}
</script>

<template>
  <div class="outer">
    <VMenu
      theme="my-theme"
      :triggers="['click']"
      :autoHide="true"
      :distance="10"
      placement="bottom"
    >
      <button>
        <icon-sort></icon-sort>
        {{ $t(placeholder) }}
      </button>

      <template #popper>
        <div class="inner">
          <button @click="clicked('date')">
            <icon-date></icon-date>{{ $t("home.date") }}
          </button>
          <button @click="clicked('likes')">
            <icon-like></icon-like>{{ $t("home.likes") }}
          </button>
          <button @click="clicked('views')">
            <icon-view></icon-view>{{ $t("home.views") }}
          </button>
        </div>
      </template>
    </VMenu>
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

.v-popper__inner button {
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
}

/* Style */
.v-popper--theme-my-theme .v-popper__inner {
  color: #e66100;
}
</style>
