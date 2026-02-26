import { Capacitor } from '@capacitor/core';
import { initializeApp } from 'firebase/app';
import { browserLocalPersistence, createUserWithEmailAndPassword, deleteUser, getAuth, indexedDBLocalPersistence, initializeAuth, sendPasswordResetEmail, setPersistence, signInWithEmailAndPassword, signOut, updatePassword } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import { getAnalytics } from "firebase/analytics";
import { toast } from './toast';


const mafteaḥ = process.env.REACT_APP_FB_KEY;
const appID = process.env.REACT_APP_FIREBASE_APP_ID;
const authDomain = process.env.REACT_APP_FIREBASE_AUTH_DOMAIN;
const dbURL = process.env.REACT_APP_FB_DATABASE_URL;
const msg_sender = process.env.REACT_APP_MSG_SENDER;
const measurementID = process.env.REACT_APP_MEASUREMENT_ID;

const config:any = {
  apiKey: mafteaḥ,
  authDomain: authDomain,
  projectId: "project-harvest-bikergeoloc",
  storageBucket: "project-harvest-bikergeoloc.appspot.com",
  messagingSenderId: msg_sender,
  appId: appID,
  databaseURL: dbURL,
  measurementId: measurementID
}

const app = initializeApp(config);
const analytics = getAnalytics(app);

const database = getDatabase(app);

export default app;

  if (Capacitor.isNativePlatform()) {
    initializeAuth(app, {
      persistence: indexedDBLocalPersistence
    });
  }

export async function loginUser(email: string, password: string){
    const auth = getAuth();
    //console.log(auth);
    
    const res = signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
        const user = userCredential.user;
        window.user.fbUserInfo = user;
        //console.log(user);
        return true;
    }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        //console.log(errorCode, errorMessage);
        return false;
    })
    
    return res;
}

export async function registerUser(email: string, password: string){
    const auth = getAuth();
    const res = createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
      const user = userCredential.user;
      //console.log(user);
    return true;

  }).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      //console.log(errorCode, errorMessage);
      //May need to be updated in future to accound for possible edge cases
      toast(errorMessage.substr(9, 41), 2000, "bottom");
      return false;
  });

  return res;
}

export async function resetUserPassword(email:any){
  const auth = getAuth();
  
  const res = sendPasswordResetEmail(auth, email)
  .then(() => {
    //console.log('Password reset email sent.');
    return true;
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    //console.log(errorCode, errorMessage);
    return false;
  });

  return res;

}

export async function signOutUser(){
  const auth = getAuth();
  const res = signOut(auth).then(() => {
    //console.log('User successfully signed out');
    return true;
  }).catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    //console.log(errorCode, errorMessage);
    return false;
  })

  return res;
}

export async function deleteUserAcct(){
  const res = deleteUser(window.user.fbUserInfo).then(() => {
    //console.log('Account deleted');
    window.user.fbUserInfo = {};
    return true;
  }).catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    //console.log(errorCode, errorMessage);
    toast("Recent Login Required", 4000, "bottom");
    return false;
  })

  return res;
}

