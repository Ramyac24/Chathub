import firebase from "firebase"
var firebaseConfig = {
    apiKey: "AIzaSyDU6D55fWWQoo5WulC0AUCrJYL-LCNDELA",
    authDomain: "chathub-24793.firebaseapp.com",
    projectId: "chathub-24793",
    storageBucket: "chathub-24793.appspot.com",
    messagingSenderId: "259024803746",
    appId: "1:259024803746:web:f676ba9c67c0a814b8c4fb"
  };
const firebaseApp=firebase.initializeApp(firebaseConfig)
const database=firebaseApp.firestore();
const auth=firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
export {auth,provider};
export default database;