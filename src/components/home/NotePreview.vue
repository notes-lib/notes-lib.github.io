<template>
    <div class="main">
        <img src="/src/assets/tagImages/art.jpg" alt="chemistry">
        <div class="section">
            <h3>Random Reactions</h3>
            <div class="author">
                By ScratchX98 <br>
                <em>10/08/22</em>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .main {
        background-color: var(--surface);
        border-radius: 10px;
        flex-basis: 17rem;
        flex-direction: row;
        display: flex;
        flex-grow: 1;
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
</style>