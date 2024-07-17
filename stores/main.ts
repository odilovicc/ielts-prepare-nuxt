import { defineStore } from 'pinia'

export const useMainStore = defineStore({
  id: 'mainStore',
  state: () => ({
    isLoading: false,
    userInfo: {}
  }),
  actions: {
    setIsLoading(payload: boolean) {
      this.isLoading = payload
    },
    async fetchUserInfo() {
      getInfo('userInfo').then(r => {
        this.userInfo = r
      })
    }
  }
})
