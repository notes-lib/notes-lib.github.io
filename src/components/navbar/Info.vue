<script setup>
    import IconClose from '@/components/icons/IconClose.vue';

    const emit = defineEmits(['close']);

</script>

<template>
    <div class="modal-overlay">
        <div class="modal">
            <h3 class="top">{{$t('info.info')}}<IconClose class="click" @click="emit('close')"></IconClose></h3>       
            <div class="bottom">
                <i18n-t keypath="info.createdBy" tag="h3" for="info.createdBy">
                    <a href="https://scratchx98.github.io" target="_blank">ScratchX98</a>
                </i18n-t>
                <i18n-t keypath="info.contact" tag="h3" for="info.contact">
                    <a href="mailto:scratchx@gmx.com" target="_blank">scratchx@gmx.com</a>
                </i18n-t>
                 <i18n-t keypath="info.source" tag="h3" for="info.source">
                    <a href="https://github.com/notes-lib" target="_blank">Github</a>
                </i18n-t>
                <h3>{{$t('info.createdWith')}}</h3>
                <ul>
                    <li>
                        <a class="inner" href="https://vuejs.org/" target="_blank">
                            <svg alt="Vue.js logo" version="1.1" viewBox="0 0 261.76 226.69" xmlns="http://www.w3.org/2000/svg"><g transform="matrix(1.3333 0 0 -1.3333 -76.311 313.34)"><g transform="translate(178.06 235.01)"><path d="m0 0-22.669-39.264-22.669 39.264h-75.491l98.16-170.02 98.16 170.02z" fill="#41b883"/></g><g transform="translate(178.06 235.01)"><path d="m0 0-22.669-39.264-22.669 39.264h-36.227l58.896-102.01 58.896 102.01z" fill="#34495e"/></g></g></svg>
                            Vue.js
                        </a>
                    </li>
                    <li>
                        <a class="inner" href="https://vitejs.dev" target="_blank">
                            <img alt="Vite logo" src="https://vitejs.dev/logo.svg">
                            Vite
                        </a>
                    </li>
                    <li>
                        <a class="inner" href="https://www.php.net/" target="_blank">
                            <img alt="PHP logo" src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/PHP-logo.svg/512px-PHP-logo.svg.png">
                            PHP
                        </a>
                    </li>
                    <li>
                        <a class="inner" href="https://www.mysql.com/" target="_blank">
                            <img alt="MySQL logo" src="https://www.mysql.com/common/logos/logo-mysql-170x115.png">
                            MySQL
                        </a>
                    </li>
                    <li>
                        <a class="inner" href="https://github.com/features/actions" target="_blank">
                            <img alt="Github actions logo" src="https://github.githubassets.com/images/modules/site/features/actions-icon-actions.svg">
                            Github actions
                        </a>
                    </li>
                    <li>
                        <a class="inner" href="https://metrica.yandex.com" target="_blank">
                            <img class="metrica" alt="Metrica logo" src="https://yastatic.net/s3/home/services/all/svg/metrika.svg">
                            Yandex Metrica
                        </a>
                    </li>
                    <li>
                        <a class="inner">
                            {{$t('info.asWell')}}
                        </a>
                    </li>
                </ul>
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
        max-height: 90%;
        margin: 1rem;
        border: solid 1px var(--text);
        border-radius: 10px;
        overflow-y: auto;
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
    
    .bottom {
      display: flex;
      justify-content: space-between;
      padding: 2rem 2rem;
      gap: 1.5rem;
      flex-wrap: wrap;
      flex-direction: column;
    }

    h3.top {
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
        align-items: center;
        align-content: center;
    }

    svg.click:hover {
        fill: var(--accent);          
    }

    a {
        text-decoration: none;
        color: var(--accent);
    }

    ul {
        list-style: none;
    }

    li {
        padding: 1rem;
        background-color: var(--surface);
        border-radius: 10px;
        margin: 0.5rem 0rem;
    }

    .inner {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-size: 17px;
        vertical-align: middle;
        height: 35px;
        color: var(--text);
    }

    .inner svg {
        height: 30px;
    }

    .inner img {
        width: 30px;
    }

    .metrica {
        margin-bottom: 0.5rem;
    }
</style>