<template>
  <div class="ai-helper-wrapper">
    <div class="ai-helper-content">
      <ui-loader v-if="isLoading" />
      <div v-else v-html="renderedAiResponse"></div>
    </div>
    <div class="ai-helper-footer">
      <input-group>
        <PInputText
          class="w-full"
          placeholder="Insert your prompt"
          @keyup.enter="sendPrompt"
          v-model="userPrompt"
        />
        <Button label="Send" />
      </input-group>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue";
import { defineAsyncComponent } from "vue";
import markdownIt from "markdown-it";

const PInputText = defineAsyncComponent(() => import("primevue/inputtext"));

const md = new markdownIt();
const userPrompt = ref("");
const store = useMainStore();
const aiResponse = computed(() => store.aiResponse);
const renderedAiResponse = computed(() => md.render(aiResponse.value));
const isLoading = ref(false);

function sendPrompt() {
  isLoading.value = true;
  return new Promise((resolve, reject) => {
    store
      .sendPrompt(userPrompt.value)
      .then(() => {
        resolve("done");
        isLoading.value = false;
        userPrompt.value = "";
      })
      .catch((error: PromiseRejectedResult) => {
        reject(error);
        isLoading.value = false;
      });
  });
}
</script>

<style scoped>
.ai-helper-wrapper {
  border: 2px solid var(--p-surface-800);
  border-radius: 9px;
  min-height: 59vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.ai-helper-content {
  padding: 2rem;
}
</style>
