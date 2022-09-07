<script setup>
import { RouterView } from "vue-router";

import { ref, onMounted } from "vue";

const contrast = ref(false);

const initial = localStorage.getItem('contrast');
initial === 'true' ? contrast.value = true : contrast.value = false;

function swap() {
  contrast.value = !contrast.value;
  document.body.classList.remove('light-theme'); 
  document.body.classList.remove('dark-theme'); 
  document.body.classList.add(!contrast.value ? 'light-theme' : 'dark-theme');
  localStorage.setItem('contrast', contrast.value);
}

onMounted(() => {
    document.body.classList.add(!contrast.value ? 'light-theme' : 'dark-theme');
})
</script>

<template>
  <div>
    <RouterView @contrast="swap()">
    </RouterView>
  </div>
</template>