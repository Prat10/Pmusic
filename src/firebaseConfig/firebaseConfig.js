import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import {getStorage} from 'firebase/storage';
import { getDatabase } from 'firebase/database';

  const firebaseConfig = {
    apiKey:process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    databaseURL: "https://musicplayer-2d980-default-rtdb.firebaseio.com",
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    measurementId: "G-G9G7HXZB40"
  };
  const FireBaseApp = initializeApp(firebaseConfig);
  const auth = getAuth(FireBaseApp);
  const db = getDatabase(FireBaseApp);

  const StorageHub = getStorage(FireBaseApp);
  const googleProvider = new GoogleAuthProvider();
  export { auth,db,googleProvider,StorageHub };
