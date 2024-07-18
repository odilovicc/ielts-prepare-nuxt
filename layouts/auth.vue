<template>
  <div class="flex flex-col items-center justify-center min-h-screen px-4">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";

onMounted(async () => {
  try {
    const theme = localStorage.getItem("theme");
    const element = document.querySelector("html");
    if (theme === "dark") {
      element.classList.add("app-dark");
    } else {
      localStorage.setItem("theme", "light");
      element.classList.remove("app-dark");
    }
    await waitForData();
  } catch (error) {
    console.log(error);
  }
});
</script>

<style scoped>
html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
}
</style>
