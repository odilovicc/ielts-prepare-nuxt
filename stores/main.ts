import { defineStore } from 'pinia';
import { getInfo } from '#imports';

export const useMainStore = defineStore({
  id: 'mainStore',
  state: () => ({
    isLoading: false,
    userInfo: {
    }
  }),
  actions: {
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
    }
  }
});
