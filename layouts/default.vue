<template>
  <nuxt-loading-indicator />
  <div
    class="min-h-screen w-svw flex items-center justify-center"
    v-if="loading"
  >
    <ui-loader />
  </div>
  <template v-if="device === 'desktop'">
    <div class="flex min-h-screen">
      <ui-sidebar class="p-10" />
      <div class="flex-grow p-10">
        <span class="text-sm mb-4 text-[--p-surface-500] font-medium">
          {{ routeName === "Index" ? "Dashboard" : routeName }}
        </span>
        <slot />
      </div>
    </div>
  </template>
  <div v-else>
    <div class="flex flex-col flex-grow">
      <div class="p-5 pb-32">
        <slot />
      </div>
      <ui-mobile-menu class="fixed bottom-0 left-0 right-0" />
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
const device = computed(() => mainStore.device);
const loading = computed(() => mainStore.isLoading);

await mainStore.fetchUserInfo();
onMounted(async () => {
  try {
    const theme = localStorage.getItem("theme");
    const element = document.querySelector("html");
    if (theme === "dark") {
      element.classList.add("app-dark");
    } else {
      localStorage.setItem("theme", "dark");
      element.classList.remove("app-dark");
    }
    await waitForData();
  } catch (error) {
    console.log(error);
    mainStore.setIsLoading(false);
  }
});
</script>
