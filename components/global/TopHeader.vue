<template>
  <div>
    <div class="flex justify-between items-center">
      <h1 class="text-2xl font-bold">
        Glad to see you
        <client-only>
          <span class="text-[--p-primary-color]">{{ username }}</span>
        </client-only>
      </h1>
      <overlay-badge :value="notifs.length">
        <Button icon="pi pi-bell" @click="openNotifs($event)" />
      </overlay-badge>
    </div>

    <popover
      ref="notifMenu"
      :class="notifs.length > 0 ? 'min-w-[50rem]' : 'w-max'"
    >
      <template v-if="notifs.length === 0">
        <p class="text-center">In development</p>
      </template>
      <ul v-else>
        <li v-for="(notif, index) in notifs" :key="notif">
          <h1 class="text-xl font-bold">{{ notif.title }}</h1>
          <p v-if="notif.body">{{ notif.body }}</p>
          <divider v-if="index < notifs.length - 1" />
        </li>
      </ul>
    </popover>
  </div>
</template>

<script lang="ts" setup>
const authStore = useAuthStore();
const utilsStore = useUtilsStore();

const username = computed(() => authStore.user.displayName);
const notifs = computed(() => utilsStore.notifications);
const notifMenu = ref();

const openNotifs = (event: Event) => {
  notifMenu.value.toggle(event);
};
</script>

<style>
.p-popover::after {
  display: none !important;
}
.p-popover::before {
  display: none !important;
}
</style>
