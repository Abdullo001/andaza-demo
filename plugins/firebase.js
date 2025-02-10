import { initializeApp } from 'firebase/app'
import { getMessaging } from 'firebase/messaging'


const firebaseConfig = {
  apiKey: "AIzaSyBBTwVdvR26nnycC2IaaAV5uD0sDU34XU0",
  authDomain: "andaza-d9c48.firebaseapp.com",
  projectId: "andaza-d9c48",
  storageBucket: "andaza-d9c48.firebasestorage.app",
  messagingSenderId: "613085841293",
  appId: "1:613085841293:web:ddd54438996b3ff6db9fc4",
  measurementId: "G-8KCZDLR1W2"
};

// Firebase ni initialize qilish
const firebaseApp = initializeApp(firebaseConfig)
const messaging = getMessaging(firebaseApp)

export { firebaseApp, messaging }


