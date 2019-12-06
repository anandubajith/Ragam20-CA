import firebase from 'firebase/app';

import 'firebase/database';
import 'firebase/storage';
import 'firebase/auth';
import 'firebase/functions';
import 'firebase/analytics';

const app = firebase.initializeApp({
  apiKey: 'AIzaSyDRTSjI8HDXiLQSCOu2cY4j-ZVdFisqow8',
  authDomain: 'ragam-ca.firebaseapp.com',
  databaseURL: 'https://ragam-ca.firebaseio.com',
  projectId: 'ragam-ca',
  storageBucket: 'ragam-ca.appspot.com',
  messagingSenderId: '432438280307',
  appId: '1:432438280307:web:1a4a8bad9a917a83abea06',
  measurementId: 'G-5FQNLKVSS4',
});


export const db = app.database();
export const storage = app.storage();
export const auth = app.auth();
export const functions = app.functions();
export const analytics = app.analytics();
