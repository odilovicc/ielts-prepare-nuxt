<template>
  <div>
    <div
      class="min-h-full flex flex-col justify-between rounded-xl p-5 app-dark:bg-[--p-surface-900] bg-[--p-surface-100]"
    >
      <div class="flex flex-col gap-5">
        <Button
          v-for="route in routes"
          :key="route.path"
          :icon="route.icon"
          v-tooltip.right="route.name"
          text
          @click="$router.push(route.path)"
        />
      </div>
      <div class="flex flex-col gap-5">
        <Button
          icon="pi pi-cog"
          @click="$router.push('/settings')"
          text
          v-tooltip.right="'Settings'"
        />
        <Button
          :icon="isDark ? 'pi pi-sun' : 'pi pi-moon'"
          @click="toggleColorScheme"
          v-tooltip.right="isDark ? 'Light Mode' : 'Dark Mode'"
          text
        />
        <Button
          icon="pi pi-sign-out"
          @click="signOut"
          text
          v-tooltip.right="'Sign Out'"
        />
        <divider />
        <overlay-badge :value="notifs">
          <nuxt-link to="/profile" class="flex justify-center">
            <client-only>
              <Avatar
                :image="authStore.user.photoURL"
                v-if="authStore.user.photoURL"
              />
              <Avatar
                :label="authStore.user.displayName?.charAt(0).toUpperCase()"
                v-else
              />
            </client-only>
          </nuxt-link>
        </overlay-badge>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const authStore = useAuthStore();
const utilsStore = useUtilsStore();

const notifs = computed(() => {
  return utilsStore.notifications.length > 0
    ? utilsStore.notifications.length
    : null;
});

const routes = useState("routes", () => [
  { icon: "pi pi-home", path: "/", name: "Home" },
  { icon: "pi pi-book", path: "/vocabulary", name: "Vocabulary" },
  { icon: "pi pi-pencil", path: "/notes", name: "Notes" },
  { icon: "pi pi-box", path: "/resources", name: "Resources" },
]);

const isDark = useState(() => false);

const toggleColorScheme = () => {
  const theme = localStorage.getItem("theme");
  const element = document.querySelector("html");

  if (theme === "light") {
    localStorage.setItem("theme", "dark");
    element.classList.add("app-dark");
    isDark.value = true;
  } else {
    localStorage.setItem("theme", "light");
    element.classList.remove("app-dark");
    isDark.value = false;
  }
};



const signOut = async () => {
  await authStore.logOut();
  navigateTo("/auth/login");
};
</script>
