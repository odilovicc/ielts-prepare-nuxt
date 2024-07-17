import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDxgUUb-4gBAERd2zKklHJ_u-nk1Hq2wV0",
    authDomain: "dashboard-nuxt-d9bfb.firebaseapp.com",
    projectId: "dashboard-nuxt-d9bfb",
    storageBucket: "dashboard-nuxt-d9bfb.appspot.com",
    messagingSenderId: "453581315755",
    appId: "1:453581315755:web:d0cf2fa3ddcfff4908a1ee"
};

const app = initializeApp(firebaseConfig);

export default function useFirebaseClient() {
    const auth = getAuth(app);
    const db = getFirestore(app)
    return { app, auth, db }
}
