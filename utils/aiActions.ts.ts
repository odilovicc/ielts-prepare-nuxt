import { GoogleGenerativeAI } from "@google/generative-ai";

/**
 * Usage example:
 *
 * <template>
 *   <div>
 *     <input type="text" v-model="promptUser" />
 *     <button @click="sendPrompt">Отправить</button>
 *     <p v-if="responseUser">{{ responseUser }}</p>
 *   </div>
 * </template>
 *
 * <script setup lang="ts">
 * import { useAI } from '@/utils/aiActions';
 *
 * const { promptUser, responseUser, sendPrompt } = useAI();
 * </script>
 *
 * @returns {Object} - Object with promptUser, responseUser and sendPrompt properties
 */
const genAI = new GoogleGenerativeAI(
  "AIzaSyAx4619YK1ecbZiKiujAhnHPnwDZziXmgE"
);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export const useAiUtil = async (payload: string) => {
  const promptUser = ref(payload);

  const result = await model.generateContent(promptUser.value);
  const response = await result.response;
  const text = await response.text();

  return { text };
};

