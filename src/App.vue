<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Navbar from './components/Navbar.vue';
import Welcome from './components/home/Welcome.vue';
import NotePreviews from './components/home/NotePreviews.vue';
</script>

<template>
  <header>
    <div class="wrapper">

      <Navbar></Navbar>
      <div class="width">
        <Welcome></Welcome>
        <note-previews></note-previews>
      </div>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
  .width {
    max-width: 55rem;
    margin: auto;
  }
</style>
