import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDei8mImLaErZl7Vz0duYcMbWydtqZl94g",
    authDomain: "chat-8bf66.firebaseapp.com",
    projectId: "chat-8bf66",
    storageBucket: "chat-8bf66.appspot.com",
    messagingSenderId: "19326243105",
    appId: "1:19326243105:web:18e55e0d7088076062ae60",
    measurementId: "G-VCDL02L9LY",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get a reference to the auth service
const auth = getAuth(app);

auth.setPersistence(auth.Auth.Persistence.NONE);

// Implement login function
export default async function googleLogin() {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    try {
        const result = await signInWithPopup(auth, provider);
        // This gives you a Google Access Token. You can use it to access the Google API.
        const token = result.credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // ...
    } catch (error) {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
    }
}
