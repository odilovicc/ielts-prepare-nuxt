<template>
  <div class="flex flex-wrap gap-5">
    <widgets-academic-performance />
    <widgets-total-words />
    <widgets-progress/>
  </div>
</template>

<script lang="ts" setup>
const WidgetsTotalWords = defineAsyncComponent({
  loader: () => import("@/components/widgets/TotalWords.vue"),
});
</script>

<style></style>
