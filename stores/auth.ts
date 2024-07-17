import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut, updateProfile, type User, onAuthStateChanged } from 'firebase/auth'
import { defineStore } from 'pinia'
import { useFirebaseClient } from '#imports'
import { doc, setDoc } from 'firebase/firestore'

const auth = useFirebaseClient().auth

interface AuthPayload {
  username?: string | ""
  email: string
  password: string
}

export const useAuthStore = defineStore({
  id: 'authStore',
  state: () => ({
    isLoggedIn: false,
    user: {} as User,
    error: "",
  }),
  actions: {
    async logIn(payload: AuthPayload) {
      try {
        await signInWithEmailAndPassword(auth, payload.email, payload.password)
          .then((res) => {
            this.isLoggedIn = true;
            this.user = res.user;
            this.error = "";
          })
          .catch((e) => {
            this.error = e.code;
          });
      } catch (e) {
        console.error(e);
      }
    },
    async register(payload: AuthPayload) {
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, payload.email, payload.password);
        const user = userCredential.user;

        if (payload.username) {
          await updateProfile(user, { displayName: payload.username });
        }

        await setDoc(doc(useFirebaseClient().db, "users", user.uid), {
          uid: user.uid,
          name: user.displayName,
          email: user.email,
          userInfo: {
            book: {
              name: 'Harry Potter Chapter 2',
              progress: 60
            },
            words: {
              total: 1001,
              plusForToday: 60
            }
          }
        })

        this.isLoggedIn = true;
        this.user = user;
        this.error = "";
      } catch (e) {
        this.error = e.code;
      }
    },
    async logOut() {
      await signOut(auth).then(() => {
        this.isLoggedIn = false;
        this.user = {} as User;
        this.error = "";
      }).catch((e) => {
        this.error = e.code;
      });
    },
    setUser(user: Object) {
      if (!this.user) return
      this.user = user
    }
  },
  getters: {
    getError(state) {
      switch (state.error) {
        case "auth/invalid-email":
          return "Invalid email";
        case "auth/user-disabled":
          return "User disabled";
        case "auth/user-not-found":
          return "User not found";
        case "auth/wrong-password":
          return "Wrong password";
        case "auth/email-already-in-use":
          return "Email already in use";
        case "auth/weak-password":
          return "Password must be at least 6 characters";
        default:
          return state.error;
      }
    }
  }
})
