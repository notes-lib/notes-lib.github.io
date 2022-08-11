<script setup>
  import IconBookMark from '@/components/icons/IconBookMark.vue';
  import IconContrast from '@/components/icons/IconContrast.vue';
  import IconLanguage from '@/components/icons/IconLanguage.vue';
  import IconRules from '@/components/icons/IconRules.vue';
  import IconAdd from '@/components/icons/IconAdd.vue';

</script>

<template>
  <nav>
    <div class="width">
      <div class="start">
        <IconBookMark></IconBookMark>
        <p>Notes DB</p>
      </div>
      <div class="end">
        <IconContrast></IconContrast>
        <IconLanguage></IconLanguage>
        <IconRules></IconRules>

        <div class="surround">
          <IconAdd></IconAdd>         
        </div>

      </div>
    </div>
  </nav>
</template>

<style scoped>
  nav {
    background-color: var(--surface);
  }

  .width {
    padding: 1rem;
    max-width: 55rem;
    margin: auto;
    display: flex;
    justify-content: space-between;
  }

  svg {
    fill: var(--text);
    padding: 10px;
  }

  svg:hover {
    fill: var(--accent);
    padding: 10px;
  }

  .surround {
    display: inline-block;
  }

  .surround svg {
    fill: var(--accent);
  }

  .surround svg:hover {
    fill: var(--text);
  }

  .end {
    display: inline;
  }

  .start {
    display: flex;
    align-items: center;
  }


  @media (max-width: 500px) {
      p {
          visibility: hidden;
      }
  }
</style>