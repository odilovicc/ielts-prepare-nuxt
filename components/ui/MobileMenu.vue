<template>
  <div class="bg-[--p-surface-800] rounded-t-xl">
    <div class="flex items-center p-5 gap-5">
      <nuxt-link
        :to="route.path"
        class="flex items-center flex-col justify-between w-full"
        v-for="route in routes"
        :key="route.path"
        active-class="active-link"
      >
        <i :class="route.icon" class="text-2xl text-[--p-primary-color]" />
        <span
          
          class="text-lg font-semibold text-[--p-primary-color]"
        >
          {{ $route.path === route.path ? route.name : "" }}
        </span>
      </nuxt-link>
    </div>
  </div>
</template>

<script lang="ts" setup>
const routes = useState("routes", () => [
  { icon: "pi pi-home", path: "/", name: "Home" },
  { icon: "pi pi-book", path: "/vocabulary", name: "Vocabulary" },
  { icon: "pi pi-pencil", path: "/notes", name: "Notes" },
  { icon: "pi pi-box", path: "/resources", name: "Resources" },
]);
</script>

<style></style>
