<script setup>
    import IconClose from '@/components/icons/IconClose.vue';

    const emit = defineEmits(['close', 'filter']);
    const props = defineProps(['filter', 'options']);
    let title = 'home.choose' + props.filter;
    const displayList = [];
    
    if (props.filter === 'tag') {
        for (var i in props.options) {
            displayList.push('tags.' + props.options[i]);
        }
    }
        
    if (props.filter === 'language') {
        for (var i in props.options) {
            displayList.push('languages.' + props.options[i]);
        }    
    }

    if (props.filter === 'author') {
        for (var i in props.options) {
            displayList.push(props.options[i]);
        }    
    }

    function emitResponse (e) {
        emit('filter', e.target.value);
        emit('close');
    }
</script>

<template>
    <div class="modal-overlay">
        <div class="modal">
            <h3>{{$t(title)}}<icon-close @click="emit('close')"></icon-close></h3>       
            <div :class="props.filter">
                <button :class="props.filter + '-button'" @click="emitResponse($event)" v-for="i in displayList" :value="i">
                    {{$t(i)}}
                </button>
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
        height: 30rem;
        margin: 1rem;
        top: 50%;
        -ms-transform: translateY(-50%);
        transform: translateY(-50%);
        border: solid 1px var(--text);
        border-radius: 10px;
    }

    .tag {
        overflow-y:scroll;
        height: 22.3rem;
        padding: 1rem 2rem;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 0rem;
    }
        
    .tag::-webkit-scrollbar {
      display: none;
    }   

    .language::-webkit-scrollbar {
      display: none;
    }   

    .author::-webkit-scrollbar {
      display: none;
    }   

             
    .author {
        overflow-y:scroll;
        height: 22.3rem;
        padding: 1rem 2rem;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 1rem;
        align-content: flex-start;
    }
        
    .language {
        overflow-y:scroll;
        padding: 1rem 2rem;
				display: flex;
        justify-content: center;
				gap: 1rem;
				flex-wrap: wrap;
        height: 22.3rem;
        align-content: flex-start;
    }
		
		.language button {
        padding: 0.5rem 0.5rem;
				background-color: var(--surface);
				border-radius: 10px;
				height: auto;
        flex-basis: 8rem;
        flex-shrink: 1;
		}

    button {
        width: 8rem;
        height: 2rem;
        background-color: transparent;
        color: var(--accent);
        border: none;
        font-size: 1.2rem;
        font-weight: bold;
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