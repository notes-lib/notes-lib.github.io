<script setup>
import NewComment from "@/components/note/NewComment.vue";
import IconNewComment from "@/components/icons/IconNewComment.vue";
import IconUser from "@/components/icons/IconUser.vue";

import { ref } from "vue";

const props = defineProps(["comments", "id"]);

var comments = ref(props.comments);

function formatDate(dateString) {
  let date = new Date(dateString + "Z");
  return (
    date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear()
  );
}

const wrapper = ref();

function myScroll() {
  wrapper.value.scrollIntoView();
}

var newComment = ref(false);

defineExpose({ myScroll });

function add(author, content, time) {
  comments.value.push({
    author: author,
    content: content,
    date: time.toString(),
  });
}
</script>

<template>
  <div class="main" ref="wrapper">
    <div class="head">
      <h2>{{ $t("note.comments") }}</h2>
      <div class="new" @click="newComment = !newComment">
        <IconNewComment></IconNewComment>{{ $t("note.new") }}
      </div>
    </div>
    <NewComment @newComment="add" v-if="newComment"></NewComment>
    <div v-if="comments" class="comments-list">
      <div v-for="comment in comments" class="comment">
        <div class="top">
          <div class="author">
            <IconUser></IconUser>
            {{ comment.author === 'anon' ? $t('note.anon') : comment.author }}
          </div>
          <span class="date">{{ formatDate(comment.date) }}</span>
        </div>
        <p>{{ comment.content }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.main {
  margin-top: 2rem;
}

.head {
  padding: 1rem 2rem;
  background-color: var(--surface);
  border-radius: 10px;
  display: flex;
  gap: 1rem;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 1rem;
}

.new {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  padding: 0.5rem 1rem;
  border-radius: 10px;
  background-color: var(--background);
}

.new:hover {
  fill: var(--accent);
  color: var(--accent);
}

.comments-list {
  padding-top: 1rem;
  display: flex;
  gap: 1rem;
  flex-direction: column-reverse;
}

.comment {
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  border: 3px solid var(--surface);
}

.comment .top {
  display: flex;
  flex-direction: row;
  padding: 1rem;
  background-color: var(--surface);
  border-radius: 5px 5px 0px 0px;
  justify-content: space-between;
}

.comment .date {
  font-style: italic;
  opacity: 0.5;
}

.comment .author {
  display: flex;
  gap: 1rem;
}

.comment p {
  padding: 1rem;
}
</style>
