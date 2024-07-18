import { onAuthStateChanged } from "firebase/auth";

export async function waitForData() {
  const authStore = useAuthStore();
  const utilsStore = useUtilsStore();
  const mainStore = useMainStore();
  await onAuthStateChanged(useFirebaseClient().auth, (user) => {
    if (!user) {
      navigateTo("/auth/login");
    } else {
      authStore.setUser(user);
    }
  })
}

