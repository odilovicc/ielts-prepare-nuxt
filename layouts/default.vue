<template>
  <nuxt-loading-indicator />
  <div
    class="min-h-screen w-svw flex items-center justify-center"
    v-if="loading"
  >
    <ui-loader />
  </div>
  <template v-else>
    <div class="flex min-h-screen">
      <ui-sidebar v-if="device === 'desktop'" class="p-10 pr-0 fixed" />
      <div
        :class="
          device === 'desktop' ? 'flex-grow p-10 max-w-[93%] ml-auto' : 'pb-20'
        "
      >
        <top-header
          :class="{
            'bg-[--p-surface-800] w-svw rounded-b-xl': device === 'mobile',
          }"
          :device="device"
        />
        <div :class="{ 'p-5 pt-0': device === 'mobile' }">
            <slot />
        </div>
      </div>
      <ui-mobile-menu
        v-if="device !== 'desktop'"
        class="fixed bottom-0 left-0 right-0"
      />
    </div>
  </template>
</template>

<script setup lang="ts">
const route = useRoute();
const mainStore = useMainStore();

const routeName = computed(() => {
  const name = route.name?.toString();
  return name ? `${name.charAt(0).toUpperCase()}${name.slice(1)}` : "";
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
  } catch {
    mainStore.setIsLoading(false);
  }
});
</script>
