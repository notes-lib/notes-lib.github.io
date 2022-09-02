<script setup>
    import IconClose from '@/components/icons/IconClose.vue';
    import  { tags } from '@/assets/config.js';

    const emit = defineEmits(['close', 'action']);
    const props = defineProps(['title', 'action']);
</script>

<template>
    <div class="modal-overlay">
        <div class="modal">
            <h3>{{$t(props.title)}}<icon-close @click="emit('close')"></icon-close></h3>       
            <div class="bottom">
              <button @click="emit('close')">{{$t('newNote.cancel')}}</button>
              <button class="important" @click="emit('action')">{{$t(props.action)}}</button>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .modal {
        z-index: 2;
        position: fixed;
        background-color: var(--background);
        max-width: 30rem;
        min-height: 12rem;
        margin: 1rem;
        top: 50%;
        -ms-transform: translateY(-50%);
        transform: translateY(-50%);
        border: solid 1px var(--text);
        border-radius: 10px;
    }

    button {
        width: 8rem;
        background-color: var(--surface);
        color: var(--text);
        font-size: 1.2rem;
        font-weight: bold;
        border-radius: 10px;
        padding: 1rem;
        border: none;
    }
    
    button:hover {
      color: var(--accent);
    }
    
    .important {
      background-color: var(--accent);
      color: var(--background);
    }
    
    .important:hover {
      background-color: var(--surface);
      color: var(--accent);
    }
    
    .bottom {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 2rem 2rem;
      gap: 2rem;
      flex-wrap: wrap;
    }

    h3 {
        font-weight: bold;
        background-color: var(--surface);
        padding: 2rem;
        border-radius: 10px 10px 0px 0px;
        display: flex;
        justify-content: space-between;
        font-size: 1.3rem;
        fill: var(--text);
        gap: 1rem;
    }
        
    svg:hover {
        fill: var(--accent);          
    }

    .modal-overlay {
        z-index: 2;
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        display: flex;
        justify-content: center;
        background-color: #000000a1;
    }
</style>