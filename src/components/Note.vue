<script setup>
import Navbar from '@/components/Navbar.vue';
import Top from '@/components/note/Top.vue';
import axios from "axios";
import { ref, onMounted } from "vue";
import { url } from "@/assets/url.js";
import ClipLoader from "vue-spinner/src/ClipLoader.vue";
import Content from '@/components/note/Content.vue';
import Comments from '@/components/note/Comments.vue';

import { useRoute } from 'vue-router'
const route = useRoute()
var data = ref({});
var menu = ref(false);
const commentsRef = ref(null);
const commentsContent = ref([]);

const emit = defineEmits(['contrast']);

function getData () {
	axios.post(url + 'readNote.php', {
		id: route.params.id,
	},{ 
		headers: {
			'Content-Type': 'multipart/form-data'
		}
	})
	.then(function (response) {
		data.value = response.data;
		commentsContent.value = data.value.comments
	})
	.catch(function (error) {
		alert('Something went wrong');
	});
}

getData();

function readTime(str) {
	return Math.round(str.trim().split(/\s+/).length / 200 * 2) / 2;
}

function scrollComments() {
	commentsRef.value.myScroll();
}

</script>

<template>
<Navbar @contrast="emit('contrast')"></Navbar>
<div class="width" >
    <div class="margin" v-if="Object.keys(data).length">
        <Top
			:id="data.id"
			:title="data.title"
			:language="data.language"
			:tag="data.tag"
			:author="data.author"
			:date="data.date"
			:datemod="data.datemod"
			:modauthors="data.modauthors"
			:likes="data.likes"
			:readTime="readTime(data.content)"
			@toggleMenu="menu = !menu"
			@scrollComments = "scrollComments()"
		></Top>
		<Content class="content" :content="data.content" :sources="data.sources" :menu="menu"></Content>
		<Comments ref="commentsRef" class="comments" :comments="commentsContent" :id="data.id"></Comments>
    </div>
	<div class="loading" v-if="!Object.keys(data).length">
		<div class="inner">
			<clip-loader class="loader" color="var(--accent)" size="4rem"></clip-loader>		
		</div>
	</div>
</div>
</template>

<style scoped>
    .width {
		max-width: 55rem;
		margin: auto;
		fill: var(--text);
	}

    .margin {
		margin: 2rem 1rem;
		display: flex;
		flex-direction: column;
	}

	.inner {
		width: 100%;
		background-color: var(--surface);
		border-radius: 10px;
	}

	.loading {
		margin: 2rem;
	}

	.loader {
		padding: 2rem;
	}
</style>