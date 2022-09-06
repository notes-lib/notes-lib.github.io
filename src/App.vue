<script setup>
import { RouterView } from "vue-router";

import { ref, onMounted } from "vue";

const contrast = ref(false);

const initial = localStorage.getItem('contrast');
initial === 'true' ? contrast.value = true : contrast.value = false;

function swap() {
  contrast.value = !contrast.value;
  document.body.classList.add('light-theme');
  localStorage.setItem('contrast', contrast.value);
  console.log(contrast.value);
}

onMounted(() => {
    document.body.classList.add(!contrast ? 'light-theme' : 'dark-theme');
})
</script>

<template>
  <div>
    <RouterView @contrast="swap()">
    </RouterView>
  </div>
</template>