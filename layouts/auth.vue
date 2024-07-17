<template>
  <div class="flex items-center justify-center min-h-screen">
    <slot />
  </div>
</template>
<script setup lang="ts">
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
