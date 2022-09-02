<script setup>
import IconAdd from "@/components/icons/IconAdd.vue";
import IconTag from "@/components/icons/IconTag.vue";
import IconLanguage from "@/components/icons/IconLanguage.vue";
import IconAuthor from "@/components/icons/IconAuthor.vue";
import IconFlag from "@/components/icons/IconFlag.vue";
import IconContent from "@/components/icons/IconContent.vue";
import IconSources from "@/components/icons/IconSources.vue";
import IconDelete from "@/components/icons/IconDelete.vue";
import Editor from "@/components/newNote/editor.vue";
import Navbar from "@/components/Navbar.vue";
import TagModal from "@/components/newNote/tagModal.vue";
import Modal from "@/components/generic/Modal.vue";
import WarningModal from "@/components/generic/WarningModal.vue";

import { tags, languages } from '@/assets/config.js';
import { ref } from "vue";
import Router from "@/router/index.js";
import { url } from "@/assets/url.js";
import axios from "axios";

const showTagModal = ref(false);
const showClearModal = ref(false);
const showSubmitModal = ref(false);
const showWarning = ref(false);
var warningMessage = ref('');

var editorContent = ref(false);
var editorSources = ref(false);

var addTitle = ref('');
var addAuthor = ref('');
var addTag = ref('');
var addLanguage = ref('');
if (addTitle.value === '') addTitle.value = localStorage.getItem("addTitle") ?? '';
if (addAuthor.value === '') addAuthor.value = localStorage.getItem("author") ?? '';
if (addTag.value === '') addTag.value = localStorage.getItem("addTag") ?? '';
if (addLanguage.value === '') addLanguage.value = localStorage.getItem("addLanguage") ?? '';

function submitTag (tag) {
	addTag.value = tag;
	saveAll();
}

function submitLanguage (language) {
	addLanguage.value = language;
	saveAll();
}

function submitContent (markdown) {
	localStorage.setItem("addContent", markdown);
}

function submitSources (markdown) {
	localStorage.setItem("addSources", markdown);
}

setInterval(() => saveAll(), 3000);

function saveAll () {
	localStorage.setItem("addTitle", addTitle.value);
	localStorage.setItem("author", addAuthor.value);
	localStorage.setItem("addTag", addTag.value);
	localStorage.setItem("addLanguage", addLanguage.value);
}

function clearAll () {
	localStorage.setItem("addTitle", null);
	localStorage.setItem("author", null);
	localStorage.setItem("addTag", null);
	localStorage.setItem("addLanguage", null);
	localStorage.setItem("addSources", null);
	localStorage.setItem("addContent", null);
	addTitle.value = '';
	addAuthor.value = '';
	addTag.value = '';
	addLanguage.value = '';
	saveAll();
	showClearModal.value = false;
}

function clearAllConfirm () {
	showClearModal.value = true;
}

function submitAll () {
	let addContent = localStorage.getItem('addContent');
	let addSources = localStorage.getItem('addSources');

	if (addTitle.value.length < 5) {
		showSubmitModal.value = false;
		warningMessage.value = 'newNote.addTitle';
		showWarning.value = true;
		return;
	}

	if (addAuthor.value.length < 5) {
		showSubmitModal.value = false;
		warningMessage.value = 'newNote.addAuthor';
		showWarning.value = true;
		return;
	}

	if (addTag.value.length < 1) {
		showSubmitModal.value = false;
		warningMessage.value = 'newNote.addTag';
		showWarning.value = true;
		return;
	}

	if (addLanguage.value.length < 3) {
		showSubmitModal.value = false;
		warningMessage.value = 'newNote.addLanguage';
		showWarning.value = true;
		return;
	}

	if (addContent.length < 300) {
		showSubmitModal.value = false;
		warningMessage.value = 'newNote.addContent';
		showWarning.value = true;
		return;
	}

	if (addContent.length > 30000) {
		showSubmitModal.value = false;
		warningMessage.value = 'newNote.removeContent';
		showWarning.value = true;
		return;
	}

	if (addSources.length > 10000) {
		showSubmitModal.value = false;
		warningMessage.value = 'newNote.removeSources';
		showWarning.value = true;
		return;
	}


	axios.post(url + 'createNote.php', {
		title: addTitle.value,
		language: addLanguage.value,
		tag: addTag.value.replace('tags.', ''),
		author: addAuthor.value,
		content: localStorage.getItem('addContent'),
		sources: localStorage.getItem('addSources'),
	},{ 
		headers: {
			'Content-Type': 'multipart/form-data'
		}
	})
	.then(function (response) {
		showSubmitModal.value = false;
		Router.push('/');
		clearAll();
	})
	.catch(function (error) {
		showSubmitModal.value = false;
		warningMessage.value = 'newNote.wentWrong';
		showWarning.value = true;
		return;
	});
	Router.push('/');
}

function submitAllConfirm () {
	showSubmitModal.value = true;
}

</script>

<template>
  <div v-if="editorContent === false && editorSources === false">
		<Navbar></Navbar>
		<modal v-if="showClearModal" @close="showClearModal = false" @action="clearAll()" title="newNote.confirmClear" action="newNote.clearAll"></modal>
		<modal v-if="showSubmitModal" @close="showSubmitModal = false" @action="submitAll()" title="newNote.confirmSubmit" action="newNote.submit"></modal>
		<TagModal 
			v-if="showTagModal" 
			@close="showTagModal = false" 
			@select="submitTag"
		></TagModal>
		<WarningModal v-if="showWarning" @close="showWarning = false"><p>{{$t(warningMessage)}}</p></WarningModal>
		<div class="width">
			<div class="margin">
			<h2><IconAdd></IconAdd>{{ $t('newNote.contribute') }}</h2>
			<div class="double">
				<div class="second" id="edit">
					<h4><IconFlag></IconFlag>{{ $t('newNote.title') }}</h4>
					<input maxlength="100" v-model="addTitle" :placeholder="$t('newNote.titleExample')">
				</div>
				<div class="first">
					<h4><IconTag></IconTag>{{ $t('newNote.tag') }}</h4>
					<button @click="showTagModal = true" class="tag">{{ addTag != '' ? $t(addTag) : $t('newNote.select') }}</button>
				</div>
			</div>
			<div class="double">
				<div class="first">
					<h4><IconAuthor></IconAuthor>{{ $t('newNote.username') }}</h4>
					<input maxlength="35" v-model="addAuthor" :placeholder="$t('newNote.authorExample')">
				</div>
				<div class="second">
					<p>{{ $t('newNote.explain') }}</p>
				</div>
			</div>    
			<div class="language">
				<h4><IconLanguage></IconLanguage>{{ $t('newNote.language') }}</h4>
				<div class="inner">
					<button
						@click="submitLanguage(language)" 
						v-for="language in languages"
						:key="language"
						:style="{'color': addLanguage === language ? 'var(--background) !important' : 'var(--text)',
										 'background-color': addLanguage === language ? 'var(--accent)' : 'var(--background)'}" 
					>{{ $t('languages.' + language) }}</button>
				</div>
			</div>
			<div class="editors">
				<div class="content">
					<div class="main">
						<h4><IconContent></IconContent>{{ $t('newNote.content') }}</h4>
						<button @click="editorContent = true">{{ $t('newNote.openEditor') }}</button>
					</div>
					<div class="sources">
						<span><h4><IconSources></IconSources>{{ $t('newNote.sources') }}</h4>
						<em>{{ $t('newNote.optional') }}</em></span>
						<button @click="editorSources = true">{{ $t('newNote.openEditor') }}</button>
					</div>
				</div>
				<div class="explain">
					<ul>
					  <i18n-t keypath="newNote.contentExplain1" tag="li" for="newNote.contentExplain1">
					    <a href="https://www.markdownguide.org/cheat-sheet/" target="_blank">markdown</a>
					  </i18n-t>
						
						<li>{{ $t('newNote.contentExplain2') }}</li>
						
					  <i18n-t keypath="newNote.contentExplain3" tag="li" for="newNote.contentExplain3">
					    <a href="https://imgbox.com/" target="_blank">imgbox</a>
					  </i18n-t>
					</ul>
				</div>
			</div>
			<div class="final">
				<IconDelete @click="clearAllConfirm()"></IconDelete>
				<span><button @click="Router.push('/')">{{ $t('newNote.cancel') }}</button>
				<button @click="submitAllConfirm()" class="submit">{{ $t('newNote.submit') }}</button></span>
			</div>
			</div>
		</div>
  </div>
	<Editor v-if="editorContent" @close="editorContent = false" @submit="submitContent" storageKey="addContent"></Editor>
	<Editor  v-if="editorSources" @close="editorSources = false" @submit="submitSources" storageKey="addSources"></Editor>
</template>

<style scoped>

	.final {
		margin: 1rem 0rem;
		width: 100%;
		display: flex;
		gap: 1rem;
		justify-content: space-between;
	}
	
	.final span {
		display: flex;
		gap: 1rem;
	}
	
	.final svg:hover {
		fill: var(--accent);
	}
	
	.final button {
		padding: 0.8rem 1.5rem;
		background-color: var(--surface);
	}
	
	.final .submit {
		background-color: var(--accent);
		color: var(--background);
	}
	
	.final .submit:hover {
		background-color: var(--surface);
		color: var(--accent);
	}

	.editors {
		margin: 1rem 0rem;
		display: flex;
		flex-direction: row;
		gap: 1rem;
		flex-wrap: wrap;
	}
	
	.explain {
		flex: 10 0 10rem;
		background-color: var(--surface);
		border-radius: 10px;
		padding: 2rem;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}
	
	.explain ul {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}
	
	.width {
		max-width: 55rem;
		margin: auto;
		fill: var(--text);
	}
	
	.content {
		flex-basis: 12rem;
		display: flex;
		flex-direction: column;
		flex-grow: 1;
		gap: 1rem;
	}
	
	.content .main {
		background-color: var(--surface);
		padding: 2rem;
		border-radius: 10px;
		flex-grow: 1;
		gap: 1rem;
		display: flex;
		flex-direction: column;
	}
	
	.content .sources {
		background-color: var(--surface);
		padding: 2rem;
		border-radius: 10px;
		flex-grow: 1;
		display: flex;
		gap: 1rem;
		flex-direction: column;
	}
	
	.sources em {
		opacity: 0.5;
		margin-left: 2rem;
	}
	
	.margin {
		margin: 0rem 1rem;
	}
	
	h2 {
		margin: 2rem 0rem;
		display: flex;
		gap: 0.5rem;
		align-items: center;
	}

	h4 {
		display: flex;
		gap: 0.5rem;
		align-items: center;
	}
	
	input {
		padding: 0.5rem;
		border-radius: 10px;
		background-color: var(--background);
		color: var(--text);
		border: none;
		outline: none;
		font-size: 17px;
		display: block;
	}
	
	.double {
		flex-direction: row;
		margin: 1rem 0rem;
		display: flex;
		gap: 1rem;
		flex-wrap: wrap;
		justify-content: center;
		align-items: stretch;
		align-content: center;
	}
	
	.first {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		justify-content: center;
		padding: 2rem;
		background-color: var(--surface);
		border-radius: 10px;
		flex: 1 0 5rem;
	}
	
	
	.second {
		flex: 2 0 10rem;
		padding: 2rem;
		gap: 1rem;
		display: flex;
		flex-direction: column;
		background-color: var(--surface);
		border-radius: 10px;
		justify-content: center;
	}
	
	#edit {
		flex: 4.5 0 10rem;
	}
	
	.first input {
		width: auto;
	}
	
	.language {
		display: flex;
		background-color: var(--surface);
		border-radius: 10px;
		padding: 1.5rem 2rem;
		gap: 1rem;
		align-items: start;
		flex-direction: column;
	}
	
	.language .inner {
		display: flex;
		flex-wrap: wrap;
		gap: 0.7rem;
	}
	
	button {
		padding: 0.5rem 1rem;
		border-radius: 10px;
		background-color: var(--background);
		border: none;
		outline: none;
		color: var(--text);
		font-size: 17px;
	}
	
	.language button {
		font-size: 16px;
	}
	
	button:hover {
		color: var(--accent) !important;
	}
	
	::placeholder {
		font-style: italic;
	}
	
	a {
		color: var(--accent);
	}
	
</style>