<script setup>
import Welcome from "@/components/home/Welcome.vue";
import NotePreviews from "@/components/home/NotePreviews.vue";
import Navbar from "@/components/Navbar.vue";
</script>

<template>
  <header>
      <Navbar></Navbar>
      <div class="width">
        <Welcome></Welcome>
        <note-previews></note-previews>
      </div>
  </header>
</template>

<style scoped>
.width {
  max-width: 55rem;
  margin: auto;
}
</style>
