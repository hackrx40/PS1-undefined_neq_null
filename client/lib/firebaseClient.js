import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyDJWFCsxJgCinPiX0dmxAY6Cu3ODEtCdSk',
  authDomain: 'healthaid-3861e.firebaseapp.com',
  projectId: 'healthaid-3861e',
  storageBucket: 'healthaid-3861e.appspot.com',
  messagingSenderId: '629992781633',
  appId: '1:629992781633:web:9d2bc77fa37de50daed3c0',
  measurementId: 'G-42DF0W31VJ',
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;
