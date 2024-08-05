<template>
  <div class="flex flex-col gap-2 mt-8  h-full">
    <InputText
      @input="debouncedFindWord"
      v-model="vocabPrompt"
      @focus="openPopover($event)"
      placeholder="Search..."
    />
  </div>

  <Popover ref="resultsMenu" class="w-[90vw] p-0">
    <template v-if="!isLoading && !hasError">
      <div v-for="(word, index) in result" :key="index">
        <vocabulary-about-word :word-index="index" :word="word" />
        <divider v-if="index < result.length - 1" />
      </div>
    </template>
    <template v-if="!hasError && vocabPrompt.length === 0">
      please enter a word
    </template>
    <template v-if="isLoading">
      <ui-loader />
    </template>
  </Popover>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { debounce } from "lodash";

const vocabPrompt = ref("");
const result = ref([]);
const hasError = ref(false);
const isLoading = ref(false);
const resultsMenu = ref();

async function findWord() {
  hasError.value = false;
  isLoading.value = true;

  try {
    const { data, error, status } = await useFetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${vocabPrompt.value}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (status.value === "success" && !error.value) {
      result.value = data.value;
    }
    if (error.value) hasError.value = true;
  } catch (e) {
    console.error(e);
    hasError.value = true;
  } finally {
    isLoading.value = false;
  }
}

const debouncedFindWord = debounce(findWord, 300);

function openPopover(event: Event) {
  resultsMenu.value.toggle(event);
}
</script>

<style scoped>
/* Add necessary styles */
</style>
