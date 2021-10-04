import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({

    apiKey: "AIzaSyAEun_Hyu6-mIAKKN1iiV6D_xfEDek8g3E",
    authDomain: "instagram-clone-reactjs-e4d34.firebaseapp.com",
    projectId: "instagram-clone-reactjs-e4d34",
    storageBucket: "instagram-clone-reactjs-e4d34.appspot.com",
    messagingSenderId: "877350350691",
    appId: "1:877350350691:web:9d43e53ca123f310972d56",
    measurementId: "G-1F0X50BZQN"
    
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export {db,auth,storage};