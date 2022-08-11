<script setup>
    import NotePreview from './NotePreview.vue';
</script>

<template>
    <div class="notes">
        <note-preview></note-preview>
        <note-preview></note-preview>
        <note-preview></note-preview>
        <note-preview></note-preview>
        <note-preview></note-preview>
        <note-preview></note-preview>
        <note-preview></note-preview>
        <note-preview></note-preview>
    </div>
</template>

<style scoped>
    .notes {
        align-content: strech;
        display: flex;
        flex-wrap: wrap;
        margin: 1rem;
        gap: 1rem;
        justify-content: left;
    }
</style>