<script setup>
import { useSettingsStore } from "@/stores/settings.js";

import { RouterView } from "vue-router";
import { onMounted } from "vue";

const settings = useSettingsStore();

//add theme class to body
onMounted(() => document.body.classList.add(settings.theme));
</script>

<template>
  <RouterView> </RouterView>
</template>
