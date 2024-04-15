import firebase from "firebase";

// These are like a key for us to login to firebase
const firebaseConfig = {
  apiKey: "AIzaSyD2ZpItinFsYBO5D2GgHpcK0mO59tQj9eY",
  authDomain: "netfakes-d4679.firebaseapp.com",
  projectId: "netfakes-d4679",
  storageBucket: "netfakes-d4679.appspot.com",
  messagingSenderId: "455611584682",
  appId: "1:455611584682:web:7e2e6f32fccd84326700d3",
};

// Initialize the app
const firebaseApp = firebase.initializeApp(firebaseConfig);

// firestore: real-time db
// this will allow to keep track of what the user subscription is
const db = firebaseApp.firestore()
const auth = firebase.auth();

// I can only have 1 default export
// but i can have many explicit { } exports
export { auth };
export default db;