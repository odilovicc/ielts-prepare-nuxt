<template>
  <div>
    <div
      :class="[
        'flex items-center justify-between',
        device === 'mobile' ? 'px-10 py-5' : '',
      ]"
    >
      <h1 class="text-xl md:text-2xl font-bold">
        <span class="text-[--p-primary-color]">{{ username }}</span>
      </h1>
      <Button v-if="notifs.length === 0" icon="pi pi-bell" @click="openNotifs($event)" rounded />
      <overlay-badge v-else :value="notifs.length">
        <Button icon="pi pi-bell" @click="openNotifs($event)" rounded />
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
defineProps<{
  device: string;
}>();
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
