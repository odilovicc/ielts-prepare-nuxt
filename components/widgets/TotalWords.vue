<template>
  <div class="widget min-w-fit flex flex-col justify-between">
    <div class="flex items-center justify-between">
      <h1 class="text-xl font-bold">Total words</h1>
      <nuxt-img src="/images/Open Book.svg" class="w-12" />
    </div>
    <div class="flex gap-2">
      <span class="text-2xl font-semibold items-end"
        ><ui-counter :target-number="displayedNumber"
      /></span>
      <span class="text-sm font-semibold"
        ><ui-counter
          before-number="+"
          :target-number="plusNumber"
          class="text-[--p-primary-color]"
        />
        for today</span
      >
    </div>
  </div>
</template>

<script lang="ts" setup>
const store = useMainStore();

const displayedNumber = computed(() => store.userInfo.words.total);
const plusNumber = computed(() => store.userInfo.words.plusForToday);
</script>
