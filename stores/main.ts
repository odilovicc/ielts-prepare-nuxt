import { defineStore } from 'pinia'

export const useMainStore = defineStore({
  id: 'mainStore',
  state: () => ({ 
    isLoading: false,
  }),
  actions: {
    setIsLoading(payload: boolean) {
      this.isLoading = payload
    }
  }
})
