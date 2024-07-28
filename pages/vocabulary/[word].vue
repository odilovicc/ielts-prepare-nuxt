<template>
  <div class="p-4 px-0">
    <div v-if="wordInfo" class="space-y-4">
      <div class="flex gap-5">
        <div class="flex gap-5">
          <h1 class="text-4xl font-bold capitalize">
            {{ wordInfo.word.charAt(0).toUpperCase() + wordInfo.word.slice(1) }}
            <span v-if="wordInfo.phonetic" class="text-xl text-gray-700">
              {{ wordInfo.phonetic }}
            </span>
          </h1>
          <AudioPlayer
            v-if="wordInfo.phonetics[0].audio.length > 0"
            :audioSrc="wordInfo.phonetics[0].audio"
          />
        </div>
        <Button
          icon="pi pi-bookmark"
          rounded
          outlined
          @click="addWord"
          :disabled="isLoading"
          :loading="isLoading"
          :class="{ 'opacity-50': !wordInfo.meanings.length }"
          v-if="!hasMarked"
        />
        <Button
          icon="pi pi-trash"
          rounded
          outlined
          severity="danger"
          :disabled="isLoading"
          :loading="isLoading"
          @click="removeWord"
          v-else
        />
      </div>
      <div class="flex flex-col gap-4">
        <div v-if="wordInfo.meanings.length">
          <div v-for="meaning in wordInfo.meanings" :key="meaning.partOfSpeech">
            <h3 class="text-xl font-medium my-5">
              {{
                meaning.partOfSpeech.charAt(0).toUpperCase() +
                meaning.partOfSpeech.slice(1)
              }}
            </h3>
            <ul class="list-disc list-inside">
              <li
                v-for="definition in meaning.definitions"
                :key="definition.definition"
              >
                {{ definition.definition }}
                <span class="text-sm text-gray-500" v-if="definition.example">Ex: {{ definition.example }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <template v-if="errors.length > 0">
      <div class="flex justify-center items-center w-full h-[80vh]">
        <Sorry />
      </div>
    </template>
  </div>

</template>

<script lang="ts" setup>
import type { IWord } from "~/types";

const route = useRoute();
const toast = useToast();
const isLoading = ref(false);
const hasMarked = ref(false);
const errors = ref([]);

const wordInfo = ref<IWord>();
const wordIndex = route.query.wordIndex;
const word = route.params.word;

const addWord = async () => {
  isLoading.value = true;
  try {
    await updateInfo("userInfo.words.favourites", word);
    const res = await getInfo();
    if (res?.userInfo.words.favourites.includes(word)) {
      toast.add({
        severity: "success",
        summary: "Success",
        detail: "Word added to favourites",
        life: 3000,
      });
      hasMarked.value = true;
    }
  } catch (error) {
    console.error(error);
  } finally {
    isLoading.value = false;
  }
};

const removeWord = async () => {
  isLoading.value = true;
  try {
    await updateInfo("userInfo.words.favourites", word, {
      method: "remove",
    });
    hasMarked.value = false;
  } catch (error) {
    console.error(error);
  } finally {
    isLoading.value = false;
  }
};

const getWord = async () => {
  isLoading.value = true;
  try {
    const { data, error } = await useFetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`,
      {
        method: "GET",
      }
    );
    if (data.value?.length) wordInfo.value = data.value[wordIndex];
    if (error.value) errors.value = error.value;
    const res = await getInfo();
    if (res?.userInfo.words.favourites.includes(word)) hasMarked.value = true;
  } catch (error) {
    console.error(error);
  } finally {
    isLoading.value = false;
  }
};

onMounted(getWord);
</script>
