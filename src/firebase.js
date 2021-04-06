import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyDZkdaqBiFFai0MgmyMyRLopN1KJi4zd9Y",
    authDomain: "syncvr-fc5d5.firebaseapp.com",
    projectId: "syncvr-fc5d5",
    storageBucket: "syncvr-fc5d5.appspot.com",
    messagingSenderId: "208181470935",
    appId: "1:208181470935:web:7b93b49572a2515178b292"
});

const db = firebaseApp.firestore();

export { db };