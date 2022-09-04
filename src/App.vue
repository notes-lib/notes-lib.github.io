<script setup>
import { RouterView } from "vue-router";


import { ref } from "vue";

const contrast = ref(true);

const initial = localStorage.getItem('contrast');
initial === 'true' ? contrast.value = false : contrast.value = true;

function swap() {
  contrast.value = !contrast.value;
  localStorage.setItem('contrast', contrast.value);
  console.log(contrast.value);
}
</script>

<template>
  <div id="height" :class="contrast ? 'light-theme' : 'dark-theme'">
    <RouterView @contrast="swap()">
    </RouterView>
  </div>
</template>

<style scoped>

#height {
  overflow: scroll;
  min-height: 100%;
}
</style>
