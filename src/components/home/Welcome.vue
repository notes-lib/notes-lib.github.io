<script setup>
import { useModalsStore } from "@/stores/modals.js";

import IconAdd from "@/components/icons/IconAdd.vue";
import IconInstagram from "@/components/icons/IconInstagram.vue";

import { RouterLink } from "vue-router";

const modals = useModalsStore();
</script>


<template>
  <h1>
    {{ $t("home.welcome") }}
  </h1>
  <div class="splash">
    <div class="effects">
      {{ $t("home.splash") }}
    </div>
  </div>
  <div class="q-container">
    <div class="question">
      <h3>
        {{ $t("home.q1") }}
      </h3>
      <br />
      <p>
        {{ $t("home.a1") }}
        <a target="_blank" href="https://www.instagram.com/notes_library_official/"><IconInstagram></IconInstagram> Instagram</a>
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

.splash {
  display: flex;
  justify-content: end;
  height: 0px;
  margin-right: 2rem;
}

.effects {
  display: inline-block;
  font-weight: bold;
  color: var(--accent);
  animation: splash 3s linear;
  animation-iteration-count: infinite;
}

@keyframes splash {
  0% {
    -webkit-transform: scale(1) rotate(-20deg);
    -moz-transform: scale(1) rotate(-20deg);
    -o-transform: scale(1) rotate(-20deg);
    transform: scale(1) rotate(-20deg);
    color: #88c0d0;
  }

  25% {
    -webkit-transform: scale(1.2) rotate(-20deg);
    -moz-transform: scale(1.2) rotate(-20deg);
    -o-transform: scale(1.2) rotate(-20deg) ;
    transform: scale(1.2) rotate(-20deg);
    color: #81a1c1
  }

  50% {
    -webkit-transform: scale(1) rotate(-20deg);
    -moz-transform: scale(1) rotate(-20deg);
    -o-transform: scale(1) rotate(-20deg);
    transform: scale(1) rotate(-20deg);
    color: #5e81ac;
  }

  75% {
    -webkit-transform: scale(1.2) rotate(-20deg);
    -moz-transform: scale(1.2) rotate(-20deg);
    -o-transform: scale(1.2) rotate(-20deg) ;
    transform: scale(1.2) rotate(-20deg);
    color: #81a1c1
  }

  100% {
    -webkit-transform: scale(1) rotate(-20deg);
    -moz-transform: scale(1) rotate(-20deg);
    -o-transform: scale(1) rotate(-20deg);
    transform: scale(1) rotate(-20deg);
    color: #88c0d0;
  }
}

.link {
  color: var(--accent);
  text-decoration: underline;
  fill: var(--accent);
  cursor: pointer;
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
  margin-bottom: 1rem;
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

a {
  color: var(--accent);
  display: flex;
  align-items: center;
  fill: var(--accent);
  display: inline;
  align-content: center;
}

a svg {
  margin-bottom: 0.2rem;
  vertical-align: middle;
  display: inline-block;
}
</style>
