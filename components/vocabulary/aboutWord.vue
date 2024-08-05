<template>
  <div
    class="p-2 rounded-lg aboutContainer transition-all duration-500"
    @click="
      $router.push({
        path: `/vocabulary/${props.word.word}`,
        query: { wordIndex: props.wordIndex },
      })
    "
  >
    <div>
      <h1 class="text-2xl font-medium">{{ capitalizedWord }}</h1>
      <p>{{ props.word.meanings[0].definitions[0].definition }}</p>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { IWord } from "~/types";
const props = defineProps<{
  word: IWord;
  wordIndex: number;
}>();

const capitalizedWord = computed(
  () => props.word.word.charAt(0).toUpperCase() + props.word.word.slice(1)
);
</script>
<style scoped>
.aboutContainer:hover {
  cursor: pointer;
  box-shadow: 0 0 10px var(--p-primary-color)
}
.aboutContainer:active {
  cursor: pointer;
  box-shadow: 0 0 10px var(--p-primary-color)
}
</style>