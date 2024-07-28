<template>
  <div class="flex flex-col gap-2 mt-8 h-full">
    <input-group>
      <InputText
        @keyup.enter="findWord"
        v-model="vocabPrompt"
        placeholder="Search..."
      />
      <Button icon="pi pi-search" @click="findWord" />
    </input-group>
    <template v-if="!isLoading && !hasError">
      <div class="flex flex-col gap-5 mt-5">
        <vocabulary-about-word
          v-for="(words, index) in result"
          :word-index="index"
          :word="words"
        />
      </div>
    </template>
    <template v-if="hasError">
      <Sorry class="my-auto mx-auto" />
    </template>
    <progress-spinner v-if="isLoading" />
  </div>
</template>

<script lang="ts" setup>
const vocabPrompt = ref("");
const result = ref([]);
const hasError = ref(false);
const isLoading = ref(false);

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
    } else {
      hasError.value = true;
    }
  } catch (e) {
    console.error(e);
    hasError.value = true;
  } finally {
    isLoading.value = false;
  }
}
</script>

<style scoped>
/* Add necessary styles */
</style>
