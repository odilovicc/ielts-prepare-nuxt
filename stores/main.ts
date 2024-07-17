import { defineStore } from 'pinia'

export const useMainStore = defineStore({
  id: 'mainStore',
  state: () => ({ 
    isLoading: false,
    userInfo: {
      book: {
        name: 'Harry Potter',
        progress: 50
      },
      words: {
        total: 1000,
        plusForToday: 50
      }
    }
  }),
  actions: {
    setIsLoading(payload: boolean) {
      this.isLoading = payload
    }
  }
})
