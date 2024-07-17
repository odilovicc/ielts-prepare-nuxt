<template>
  <Card class="min-w-full md:min-w-[50rem]">
    <template #title>
      <h1 class="text-2xl font-bold text-center">Login</h1>
    </template>
    <template #content>
      <form-container>
        <form-field label="Email">
          <input-text
            type="email"
            :invalid="error.length > 0"
            placeholder="Email"
            v-model="email"
          />
        </form-field>
        <form-field label="Password">
          <input-text
            type="password"
            :invalid="error.length > 0"
            placeholder="Password"
            v-model="password"
          />
        </form-field>
        <Button label="Log in" @click="logIn" severity="success" />
        <p>
          Don't have account?
          <nuxt-link to="/auth/register" class="text-[--p-primary-color]"
            >Register.</nuxt-link
          >
        </p>
      </form-container>
    </template>
  </Card>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue";
import { useAuthStore } from "~/stores/auth";

definePageMeta({
  layout: "auth",
});

const store = useAuthStore();

const email = ref<string>("");
const password = ref<string>("");
const error = computed(() => store.getError);
const toast = useToast();

watch(error, () => {
  if (error.value) {
    toast.add({ summary: error.value, severity: "error", life: 3000 });
  }
});

const logIn = async () => {
  await store.logIn({
    email: email.value,
    password: password.value,
  });
  navigateTo("/dashboard");
};
</script>

<style></style>
