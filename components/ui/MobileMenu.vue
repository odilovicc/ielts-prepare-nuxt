<template>
  <div
    class="fixed bottom-0 left-0 right-0 bg-[--p-surface-800] py-4 flex justify-normal items-center relative"
  >
    <!-- Меню элементы -->
    <div class="flex w-[40%]">
      <nuxt-link
        :to="route.path"
        class="flex items-center flex-col justify-normal gap-1"
        v-for="route in leftRoutes"
        :key="route.path"
        active-class="active-link"
        :class="route.name === 'Notes' ? 'hidden' : 'menu-item'"
      >
        <i :class="route.icon" class="text-xl" />
        <span class="text-xs font-semibold text-[--p-primary-color]">
          {{ route.name }}
        </span>
      </nuxt-link>
    </div>

    <!-- Центральная кнопка -->
    <div
      class="absolute bottom-5 border-[1rem] border-[--p-surface-800] rounded-full left-1/2 transform -translate-x-1/2 z-20"
    >
      <nuxt-link to="/notes" class="center-button">
        <i class="pi pi-pencil text-2xl"></i>
      </nuxt-link>
    </div>

    <div class="w-[40%] flex ml-auto">
      <nuxt-link
        :to="route.path"
        class="flex items-center flex-col justify-normal gap-1"
        v-for="route in rightRoutes"
        :key="route.path"
        active-class="active-link"
        :class="route.name === 'Notes' ? 'hidden' : 'menu-item'"
      >
        <i :class="route.icon" class="text-xl" />
        <span class="text-xs font-semibold text-[--p-primary-color]">
          {{ route.name }}
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
  { icon: "pi pi-cog", path: "/settings", name: "Settings" },
]);
const leftRoutes = useState("leftRoutes", () => [
  { icon: "pi pi-home", path: "/", name: "Home" },
  { icon: "pi pi-book", path: "/vocabulary", name: "Vocabulary" },
]);
const rightRoutes = useState("rightRoutes", () => [
  { icon: "pi pi-box", path: "/resources", name: "Resources" },
  { icon: "pi pi-cog", path: "/settings", name: "Settings" },
]);
</script>

<style scoped>
.fixed {
  position: fixed;
}
.bottom-0 {
  bottom: 0;
}
.left-0 {
  left: 0;
}
.right-0 {
  right: 0;
}
.menu-item {
  flex: 1;
  text-align: center;
  color: var(--p-primary-color);
}
.center-button {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60px;
  height: 60px;
  background-color: var(--p-primary-color);
  color: white;
  border-radius: 50%;
  box-shadow: 0 0 20px 0 var(--p-primary-color);
}
</style>
