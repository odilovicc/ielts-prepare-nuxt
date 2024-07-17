<template>
  <pre>{{ info }}</pre>
</template>
<script setup lang="ts">

const store = useMainStore()
const info = computed(() => store.userInfo)

onMounted(() => {
  
})
</script>