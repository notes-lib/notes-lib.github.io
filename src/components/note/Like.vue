<script setup>
import IconLike from "@/components/icons/IconLike.vue";

import axios from "axios";
import { url } from "@/assets/url.js";
import { ref } from "vue";

const props = defineProps(["id", "likes"]);

let liked = ref(localStorage.getItem("like" + props.id) ?? false);
var likes = ref(props.likes);

function setLike() {
  let isset = localStorage.getItem("like" + props.id) ?? false;
  if (!isset) {
    axios
      .post(
        url + "createLike.php",
        {
          id: props.id,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then(function (response) {
        localStorage.setItem("like" + props.id, true);
        likes.value++;
        liked.value = true;
      })
      .catch(function (error) {
        alert("Something went wrong");
      });
  }
}
</script>

<template>
  <div @click="setLike()" :class="{ button: true, done: liked }">
    <IconLike></IconLike>{{ likes ?? 0 }}
  </div>
</template>

<style scoped>
.button {
  background-color: var(--background);
  padding: 0.5rem;
  border-radius: 10px;
  color: var(--text);
  fill: var(--text);
  display: flex;
  align-items: center;
  gap: 1rem;
  justify-content: center;
}

.button:hover {
  fill: var(--accent);
  color: var(--accent);
}

.done {
  background-color: var(--accent);
  color: var(--background);
  fill: var(--background);
}

.done:hover {
  fill: var(--background);
  color: var(--background);
}
</style>
