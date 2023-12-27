// Import the functions you need from the SDKs you need

import 'firebase/firestore';
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration

export const firebaseConfig = {
   apiKey: "AIzaSyCfrisMdi_ICtaVIQrMKm1y9Bmm2p7uB5M",
  authDomain: "cero-mata-cero-online.firebaseapp.com",
  projectId: "cero-mata-cero-online",
  storageBucket: "cero-mata-cero-online.appspot.com",
  messagingSenderId: "642479158730",
  appId: "1:642479158730:web:940fb0ce0f6c1da41b0b33"

};



// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const db = getFirestore(FirebaseApp);


