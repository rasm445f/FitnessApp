import firebase from "firebase/compat/app";
import "firebase/compat/auth"; // Import only the auth service you are using

const firebaseConfig = {
  apiKey: "AIzaSyDW1YxJdjloFwl1OVr0JVZlbFF8aNT73DY",
  authDomain: "workout-c0377.firebaseapp.com",
  projectId: "workout-c0377",
  storageBucket: "workout-c0377.appspot.com",
  messagingSenderId: "230752795149",
  appId: "1:230752795149:web:ebd8d9ef350b4f0003f344",
  measurementId: "G-096JB6PJYF",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;
