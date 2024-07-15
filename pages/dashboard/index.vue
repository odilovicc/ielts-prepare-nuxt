<template>
  <top-header />
  <div class="py-5">
    <widgets-daily-quote @provide-code="handleCode" />
  </div>
  <component :is="code"/>
  {{ code }}
</template>

<script lang="ts" setup>
const code = ref<string | null>(null);


function handleCode(newCode: string) {
  code.value = newCode;
}
</script>
