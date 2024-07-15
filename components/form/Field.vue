<template>
  <div class="flex flex-col gap-2">
    <p class="font-semibold">{{ label }}</p>
    <slot/>
  </div>
</template>
<script setup lang="ts">
defineProps<{
  label: String,
}>()
</script>