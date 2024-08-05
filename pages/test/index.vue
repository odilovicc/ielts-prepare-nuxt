<template>
  <div>
    <input type="text" v-model="promptUser" />
    <button @click="sendPrompt">Отправить</button>
    <p v-if="responseUser">{{ responseUser }}</p>
  </div>
</template>

<script setup lang="ts">
import { GoogleGenerativeAI } from "@google/generative-ai";
// AIzaSyAx4619YK1ecbZiKiujAhnHPnwDZziXmgE
const promptUser = ref("");
const responseUser = ref("")

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI("AIzaSyAx4619YK1ecbZiKiujAhnHPnwDZziXmgE");

async function sendPrompt() {
  // The Gemini 1.5 models are versatile and work with both text-only and multimodal prompts
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = promptUser.value;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  responseUser.value = text
  console.log(text);
}

</script>
