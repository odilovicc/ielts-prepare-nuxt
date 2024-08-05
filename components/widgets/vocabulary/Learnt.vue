<template>
  <div class="widget flex flex-col gap-5">
    <div class="flex items-center gap-2">
      <div class="p-2 bg-green-500 inline-block rounded-lg">
        <img src="/images/Award.svg"/>
      </div>
      <h1 class="text-xl font-medium">Learnt</h1>
    </div>
    <h1 class="text-2xl font-medium">{{ learnedWords }} <span class="text-[--p-surface-500]">words</span></h1>
  </div>
</template>
<script setup lang="ts">
const store = useMainStore()

const learnedWords = computed(() => store.userInfo.words.learnt.length);
</script>