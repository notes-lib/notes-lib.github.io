<script setup>
import Like from '@/components/note/Like.vue';
import IconDate from '@/components/icons/IconDate.vue';
import IconModify from '@/components/icons/IconModify.vue';
import IconTag from '@/components/icons/IconTag.vue';
import IconLanguage from '@/components/icons/IconLanguage.vue';
import IconAuthor from '@/components/icons/IconAuthor.vue';
import IconComments from '@/components/icons/IconComments.vue';
import IconTime from '@/components/icons/IconTime.vue';
import IconDown from '@/components/icons/IconDown.vue';
import IconMenuOpen from '@/components/icons/IconMenuOpen.vue';
import { useHead } from "@vueuse/head"

const props = defineProps([
    'id',
    'title',
    'language', 
    'tag', 
    'author', 
    'date', 
    'datemod', 
    'modauthors', 
    'likes',
    'readTime',
]);

const emit = defineEmits(['toggleMenu', 'scrollComments']);

const image = "/tagImages/" + props.tag + ".jpg";

function formatDate(dateString) {
  let date = new Date(dateString + "Z");
  return (
    date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear()
  );
}

useHead({
    title: props.title,
    meta: [
    {
        name: `title`,
        type: 'og:title',
        content: props.title,
    },
    {
        name: `description`,
        type: 'og:description',
        content: '✍️ ' + props.author + ': 📅 ' + formatDate(props.date) + ', ⏱️ ' + props.readTime + 'min',
    },
    {
        type: 'og:type',
        content: 'article',
    },
    ],
})
</script>

<template>
    <div class="top">
        <div class="left">
            <img :src="image" :alt="props.tag" />
            <div class="section">
                <div class="main">
                    <h2>{{props.title}}</h2>
                    <div class="authors" :title="$t('note.author')">
                        <div class="author">
                            <IconAuthor></IconAuthor>{{props.author}}
                        </div>
                        <div v-if="props.modauthors !== null && props.modauthors !== ''" class="modifiers" :title="$t('note.contributors')">
                            <IconModify></IconModify>{{JSON.parse(props.modauthors).join(', ')}}
                        </div>
                        <div class="time" :title="$t('note.readTime')">
                            <IconTime></IconTime>{{$t('note.read')}}: {{props.readTime}}{{$t('note.min')}}
                        </div>
                    </div>

                </div>
                <div class="under">
                    <div @click="emit('toggleMenu')" class="menu" :title="$t('note.openMenu')">
                        <IconMenuOpen></IconMenuOpen>
                    </div>
                    <div class="comments" :title="$t('note.jumpComments')" @click="emit('scrollComments')">
                        <IconComments></IconComments><IconDown></IconDown>               
                    </div>
                </div>
            </div>
        </div>
        <div class="right">
            <img :src="image" :alt="props.tag" />
            <div class="details">
            <Like :title="$t('note.giveLike')" :id="props.id" :likes="props.likes"></Like>
            <div class="bottom">
                <div class="detail" :title="$t('note.tag')">
                    <IconTag class="tag"></IconTag>
                    <span class="tag">{{$t('tags.' + props.tag)}}</span>
                </div>
                <div class="detail" :title="$t('note.language')">
                    <IconLanguage></IconLanguage>
                    {{$t('languages.' + props.language)}}
                </div>
                <div v-if="props.datemod !== null && props.datemod !== ''" :title="$t('note.modified')" class="detail">
                    <IconModify></IconModify>
                    <span>{{formatDate(props.datemod)}}</span>
                </div>
                <div :title="$t('note.created')" class="detail">
                    <IconDate></IconDate>
                    <span>{{formatDate(props.date)}}</span>
                </div>
            </div>
        </div>
        </div>
    </div>
</template>

<style scoped>
    .top {
        border-radius: 10px;
        display: flex;
        flex-direction: row;
        gap: 1rem;
        justify-content: stretch;
        flex-wrap: nowrap;
    }

    .left {
        flex-grow: 1;
        display: flex;
        flex-direction: row;
        justify-content: stretch;
        height: 15rem;
    }

    .left img {
        border-radius: 10px 0px 0px 10px;
        height: 15rem;
    }

    .section {
        flex-grow: 1;
        background-color: var(--surface);
        padding: 1rem;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        border-radius: 0px 10px 10px 0px;
        justify-content: space-between;
    }

    .main {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }

    .authors {
        padding-top: 1rem;
        display: flex;
        gap: 0.5rem;
        flex-direction: column;
    }

    .author {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }

    .modifiers {
        font-style: italic;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        opacity: 0.5;
    }

    .right {
        display: flex;
        flex-shrink: 1;
    }

    .right img {
        display: none;
    }

    .details {
        flex-shrink: 1;
        background-color: var(--surface);
        display: flex;
        flex-direction: column;
        flex-grow: 1;
        padding: 1rem;
        justify-content: start;
        border-radius: 10px;
    }

    .bottom {
        display: flex;
        gap: 1rem;
        flex-direction: column;
        margin-top: 1.5rem;
        flex-shrink: 1;
    }

    .detail {
        opacity: 1;
        display: flex;
        justify-content: start;
        align-content: center;
        align-items: center;
        gap: 0.5rem;
        flex-shrink: 1;
    }

    .tag {
        color: var(--accent);
        fill: var(--accent);
    }

    .comments {
        display: flex;
        align-items: center;
        gap: 0.2rem;
    }

    .comments:hover {
        fill: var(--accent);
    }

    .under {
        display: flex;
        flex-direction: row;
        gap: 1rem;
        justify-content: space-between;
    }

    .time {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        opacity: 0.5;
    }

    .menu:hover {
        fill: var(--accent);
    }

    @media (max-width: 650px) {
        .top {
            flex-direction: column;
        }

        .bottom {
            margin-top: 1.5rem;
            flex-direction: row;
            justify-content: space-between;
            flex-wrap: wrap;
        }

        .right {
            flex-grow: 1;
        }
    }

    @media (max-width: 500px) {
        .left img {
            display: none;
        }

        .section {
            border-radius: 10px;
        }

        .bottom {
            justify-content: right;
        }

        .right img {
            display: block;
            height: 15rem;
            border-radius: 10px 0px 0px 10px;
        }

        .details {
            border-radius: 0px 10px 10px 0px;
        }

        .bottom {
            flex-direction: column;
        }
    }
</style>