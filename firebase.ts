import firebase from 'firebase/app';
import 'firebase/auth';

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: 'AIzaSyDK5PxwStdJ7tIdei28KS1E6egfn3v1sKs',
  authDomain: 'auth0testproject-d2e65.firebaseapp.com',
  projectId: 'auth0testproject-d2e65',
  storageBucket: 'auth0testproject-d2e65.appspot.com',
  messagingSenderId: '647036846161',
  appId: '1:647036846161:web:236ba8879cbe95b20a7870',
};

// Initialize Firebase
// eslint-disable-next-line import/no-mutable-exports
let app: firebase.app.App;
if (!firebase.apps.length) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app(); // if already initialized, use that one
}

export const auth = app.auth();

export const googleProvider = new firebase.auth.GoogleAuthProvider();

export default app;
