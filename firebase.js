import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDvWh2E3m3M6u0tKJKmSDZ7I_juYwSQFZg",
    authDomain: "flashcard-saas-d1e94.firebaseapp.com",
    projectId: "flashcard-saas-d1e94",
    storageBucket: "flashcard-saas-d1e94.appspot.com",
    messagingSenderId: "493797764132",
    appId: "1:493797764132:web:7eaaab217a73f1ec68bcb1",
    measurementId: "G-B79Q0K1Z4R"
  };
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export default db;