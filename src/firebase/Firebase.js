// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {
    getAuth,
    signInWithEmailAndPassword,
    onAuthStateChanged
} from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export const returnIsAuth = (a, navigate) => {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            a(true);
            navigate("/profile");
        } else {
            a(false);
            navigate("/giannagalard");
        }
    });
}

export const authenticate = (e, a, inputs, navigate) => {
    signInWithEmailAndPassword(auth, inputs.email, inputs.password)
        // eslint-disable-next-line
        .then((userCredential) => {
            e({});
            a(true);
            navigate("/profile");
        })
        .catch((error) => {
            // Handle Errors here.
            a(false);
            const errorCode = error.code;
            const errorMessage = error.message;
            e({
                errorCode: errorCode,
                errorMessage: errorMessage,
            });
        });
};

export async function signOut() {
    await auth.signOut();
}