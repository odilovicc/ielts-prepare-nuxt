<template>
  <div class="flex flex-col gap-5">
    <LazyVocabularyFindWord />
    <LazyVocabularyWidgets v-if="device === 'desktop'" />
    <LazyWidgetsAiHelper />
  </div>
</template>
<script setup lang="ts">

const store = useMainStore()
const device = store.device
</script>
