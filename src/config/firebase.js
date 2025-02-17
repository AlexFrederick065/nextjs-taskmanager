// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCEkvsnQvtj0O_l0HrOxzuk_j42l4-e4ws",
  authDomain: "reactjs-sample-1325.firebaseapp.com",
  projectId: "reactjs-sample-1325",
  storageBucket: "reactjs-sample-1325.firebasestorage.app",
  messagingSenderId: "783362725255",
  appId: "1:783362725255:web:38f3f82484f956b33c2f22",
  measurementId: "G-YP15PKST69"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);


const db = getFirestore(app);

export default db