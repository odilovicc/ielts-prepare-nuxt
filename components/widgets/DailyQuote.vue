<template>
  <h1 class="text-xl font-semibold">
    Today is <span class="text-[--p-primary-color]">{{ dayName }}</span>. Why not to
    <span class="text-[--p-primary-color]">{{ action.message }}</span>?
  </h1>
</template>

<script lang="ts" setup>

const utilsStore = useUtilsStore();

const dayName = computed(() => utilsStore.getToday);
const action = computed(() => utilsStore.getActionByToday);
const code = computed(() => utilsStore.getActionByToday?.code);

const emit = defineEmits(['provide-code']);

onMounted(() => {
  emit('provide-code', code.value);
});
</script>

<style></style>
