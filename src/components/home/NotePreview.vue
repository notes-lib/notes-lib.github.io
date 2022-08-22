<script setup>
const props = defineProps({
  tag: String,
  id: Number,
});

const image = "/tagImages/" + props.tag + ".jpg";
</script>

<template>
  <div class="main">
    <img :src="image" :alt="props.tag" />
    <div class="section">
      <h3><slot name="title"></slot></h3>
      <div class="author">
        <slot name="author"></slot><br />
        <em><slot name="date"></slot></em>
      </div>
    </div>
  </div>
</template>

<style scoped>
.main {
  background-color: var(--surface);
  border-radius: 10px;
  flex-direction: row;
  display: flex;
}

img {
  width: 100px;
  height: 200px;
  border-radius: 10px 0px 00px 10px;
  object-fit: cover;
}

.section {
  margin-left: 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0.5rem;
}

.main:hover {
  -webkit-transform: scale(1.05);
  -moz-transform: scale(1.05);
  -o-transform: scale(1.05);
  transform: scale(1.05);
}

em {
  opacity: 0.4;
}
</style>
