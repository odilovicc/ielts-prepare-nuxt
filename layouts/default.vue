<template>
  <nuxt-loading-indicator />
  {{ isLoading }}
  <template v-if="isLoading">
    <div class="min-h-screen flex items-center justify-center">
      <progress-spinner />
    </div>
  </template>
  <template v-else>
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

const isLoading = computed(() => mainStore.isLoading);

onMounted(async () => {
  mainStore.setIsLoading(true);
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
  } finally {
    mainStore.setIsLoading(false);
  }
});
</script>
