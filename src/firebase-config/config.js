import * as firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyAMV5O1k4VMYGfq5dEjTJB2UvedX8CU6oA',
  authDomain: 'training-7b2f3.firebaseapp.com',
  databaseURL: 'https://training-7b2f3.firebaseio.com',
  projectId: 'training-7b2f3',
  storageBucket: 'training-7b2f3.appspot.com',
  messagingSenderId: '65042702841',
};
const fb = firebase.initializeApp(config);

export default fb;
