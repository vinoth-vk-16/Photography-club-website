// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCpwMyBHzt32jHLkKy0LSxA3KzClQUiEZU",
    authDomain: "photoclub-4c2c0.firebaseapp.com",
    projectId: "photoclub-4c2c0",
    storageBucket: "photoclub-4c2c0.appspot.com",
    messagingSenderId: "86089036813",
    appId: "1:86089036813:web:4b28ec154a7959f54a1144"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, signInWithPopup };
