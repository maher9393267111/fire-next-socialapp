
import { initializeApp,getApp } from 'firebase/app';
import { getStorage, ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
//import firebase from "firebase/app";
const firebaseConfig =  initializeApp({
   
  apiKey: "AIzaSyC1SM6UMsjp5GgdNsHjEzeRvID8LdmeEY8",
  authDomain: "next-fire3.firebaseapp.com",
  projectId: "next-fire3",
  storageBucket: "next-fire3.appspot.com",
  messagingSenderId: "351689395813",
  appId: "1:351689395813:web:c2e4b31c5c410d9ac1808c"
});


let firebaseApp;
try {
    firebaseApp = getApp();
    console.log(
        'firebaseApp',
    )
} catch (e) {
  firebaseApp = initializeApp(firebaseConfig);
  console.log('firebaseApp', firebaseApp);
}



// Initialize Firebase
//export const app = initializeApp(firebaseConfig);
export const app = firebaseApp
export const storage = getStorage(app);
export const db = getFirestore();
export const auth = getAuth();

export {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytes,
}
