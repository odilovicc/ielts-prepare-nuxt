<template>
    <span>{{beforeNumber}}{{ displayedNumber }}</span>
</template>

<script lang="ts" setup>
const props = defineProps<{
  targetNumber: number,
  beforeNumber?: string
}>()

const displayedNumber = ref(0)
const duration = 2000; // Длительность анимации в миллисекундах

function animateCount() {
  const startTimestamp = performance.now();
  const startNumber = 0;

  function updateNumber(timestamp: number) {
    const elapsedTime = timestamp - startTimestamp;
    const progress = Math.min(elapsedTime / duration, 1);
    displayedNumber.value = Math.floor(
      startNumber + progress * (props.targetNumber - startNumber)
    );

    if (progress < 1) {
      requestAnimationFrame(updateNumber);
    }
  }

  requestAnimationFrame(updateNumber);
}

onMounted(() => {
  animateCount();
});
</script>

<style></style>
