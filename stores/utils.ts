import { defineStore } from 'pinia'

export const useUtilsStore = defineStore({
  id: 'UtilsStore',
  state: () => ({
    notifications: []
  }),
  actions: {
    async addNotif() {
      try {
        setTimeout(() => {
          
        })
      } catch (e) {
        console.error(e)
      }
    }
  },
  getters: {
    getToday() {
      const today = new Date().getDay();
      switch (today) {
        case 0:
          return 'Sunday';
        case 1:
          return 'Monday';
        case 2:
          return 'Tuesday';
        case 3:
          return 'Wednesday';
        case 4:
          return 'Thursday';
        case 5:
          return 'Friday';
        case 6:
          return 'Saturday';
      }
    },
    getActionByToday() {
      const today = new Date().getDay();
      switch (today) {
        case 0:
          return {
            code: 'day-off',
            message: "take some rest today 😴"
          };
        case 1:
          return {
            code: 'vocabulary',
            message: 'work up with your vocabulary 📖'
          };
        case 2:
          return {
            code: "reading",
            message: 'shade some light to your reading 📚'
          };
        case 3:
          return {
            code: "listening",
            message: 'keep up with your listening 🎧'
          };
        case 4:
          return {
            code: "writing",
            message: 'keep up with your writing 📝'
          }
        case 5:
          return {
            code: "speaking",
            message: 'keep up with your speaking 🎤'
          }
        case 6:
          return {
            code: "all-skills",
            message: 'focus on your all IELTS skills 🔥'
          }
      }
    }
  },
})
