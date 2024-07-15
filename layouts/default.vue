<template>
  <nuxt-loading-indicator />
  <template v-if="isLoading">
    <div class="min-h-screen flex items-center justify-center">
      <progress-spinner />
    </div>
  </template>
  <template v-else>
    <div class="flex min-h-screen">
      <ui-sidebar class="p-10" />
      <div class="flex-grow p-10">
        <span class="text-sm mb-4 text-[--p-surface-500] font-medium">{{
          routeName
        }}</span>

        <slot />
      </div>
    </div>
  </template>
</template>
<script setup lang="ts">
import { onAuthStateChanged } from "firebase/auth";

const authStore = useAuthStore();
const auth = useFirebaseClient().auth;
const route = useRoute();
const mainStore = useMainStore();

const routeName = computed(
  () =>
    route.name?.toString().charAt(0).toUpperCase() +
    route.name?.toString().slice(1)
);
const isLoading = computed(() => mainStore.isLoading);

await onAuthStateChanged(auth, (user) => {
  if (!user) {
    navigateTo("/auth/login");
  } else {
    authStore.setUser(user);
  }
});

onMounted(async () => {
  await waitForData();
  const theme = localStorage.getItem("theme");
  if (theme === "dark") {
    const element = document.querySelector("html");
    element.classList.add("app-dark");
  } else {
    localStorage.setItem("theme", "light");
    const element = document.querySelector("html");
    element.classList.remove("app-dark");
  }
});
</script>
