<template>
  <nuxt-loading-indicator />
  <div class="flex min-h-screen">
    <ui-sidebar class="p-10" />
    <div class="flex-grow p-10">
      <span class="text-sm mb-4 text-[--p-surface-500] font-medium">
        {{ routeName }}
      </span>
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute();
const mainStore = useMainStore();

const routeName = computed(() => {
  return (
    route.name?.toString().charAt(0).toUpperCase() +
    route.name?.toString().slice(1)
  );
});

const loading = computed(() => mainStore.isLoading);

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
    mainStore.setIsLoading(false);
  }
});
</script>
