<script setup>
import { useModalsStore } from "@/stores/modals.js";

import IconAdd from "@/components/icons/IconAdd.vue";

import { RouterLink } from "vue-router";

const modals = useModalsStore();
</script>


<template>
  <h1>
    {{ $t("home.welcome") }}
  </h1>
  <div class="q-container">
    <div class="question">
      <h3>
        {{ $t("home.q1") }}
      </h3>
      <br />
      <p>
        {{ $t("home.a1") }}
      </p>
    </div>
    <div class="question">
      <h3>
        {{ $t("home.q2") }}
      </h3>
      <br />
      <i18n-t
        keypath="home.a2"
        tag="p"
        for="home.a2"
        class="align"
      >
        <span
          @click="modals.indications = true"
          class="link"
        >{{$t("home.indications")}}</span>
        <RouterLink class="link" to="/newNote"><IconAdd></IconAdd></RouterLink>
      </i18n-t>
    </div>
  </div>
</template>

<style scoped>
@import url(//fonts.googleapis.com/css?family=Rubik);

.link {
  color: var(--accent);
  text-decoration: underline;
  fill: var(--accent);
}

.align svg {
  margin-bottom: 0.2rem;
  vertical-align: middle;
  display: inline-block;
}

h1 {
  margin: 2rem 1rem;
  font-family: Rubik, sans-serif;
  text-align: center;
  font-weight: 900;
  letter-spacing: 1px;
}

hr {
  background-color: var(--surface);
  border: none;
  height: 1px;
}

.q-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
  margin: 1rem;
  align-items: stretch;
}

.question {
  flex-basis: 200px;
  flex-grow: 1;
  background-color: var(--surface);
  padding: 40px;
  border-radius: 10px;
}
</style>
