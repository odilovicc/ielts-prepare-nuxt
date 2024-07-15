// composables/useInitData.ts

export function waitForData() {
  const authStore = useAuthStore();
  const utilsStore = useUtilsStore();
  const mainStore = useMainStore();

  const initData = async () => {
    mainStore.setIsLoading(true);
    try {
      await authStore.fetchUserData();
    } catch (error) {
      console.error(error);
    } finally {
      mainStore.setIsLoading(false);
    }
  };

  return { initData };
}
