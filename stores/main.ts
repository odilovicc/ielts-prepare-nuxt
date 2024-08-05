import { defineStore } from 'pinia';
import { getInfo } from '#imports';

export const useMainStore = defineStore({
  id: 'mainStore',
  state: () => ({
    isLoading: false,
    device: '',
    userInfo: {
    },
    aiResponse: ''
  }),
  actions: {
    setDevice(payload: string) {
      this.device = payload
    },
    setIsLoading(payload: boolean) {
      this.isLoading = payload;
    },
    async fetchUserInfo() {
      this.isLoading = true
      try {
        await getInfo('userInfo').then((data) => {
          this.userInfo = data;
        })
      } catch (e) {
        console.error(e)
      } finally {
        this.isLoading = false
      }
    },
    sendPrompt(payload: string) {
      return new Promise((resolve, reject) => {
        this.aiResponse = ""
        useAiUtil(payload)
          .then((data) => {
            this.aiResponse = data.text
            resolve("done")
          })
          .catch((e: PromiseRejectedResult) => { reject(e)})
      })
    }
  }
});
