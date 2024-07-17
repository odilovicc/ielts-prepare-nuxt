<template>
  <div class="widget">
    <div class="flex items-center justify-between mb-7">
      <h1 class="text-xl font-bold my-auto">{{ bookName }}</h1>
      <nuxt-img src="/images/Direct Hit.svg" class="ml-auto w-12" />
    </div>
    <progress-bar :value="progress" />
  </div>
</template>

<script lang="ts" setup>
const store = useMainStore()
const bookName = computed(() => store.userInfo.book.name);
const progress = computed(() => store.userInfo.book.progress);
</script>

<style></style>
