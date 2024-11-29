import firebase from "firebase/compat/app";
import 'firebase/compat/firestore';
import 'firebase/compat/auth'; // Thêm Firebase Auth
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCTmpoY-1NSxY_5VSnwhOs2mpgoWrcA6LE",
  authDomain: "flight-61667.firebaseapp.com",
  projectId: "flight-61667",
  storageBucket: "flight-61667.firebasestorage.app",
  messagingSenderId: "1054394084983",
  appId: "1:1054394084983:web:8de0c795e8026669a82072",
  measurementId: "G-060YPRD59Z"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }


export {firebase}