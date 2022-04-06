import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

import { getAuth } from 'firebase/auth';

import logInWithEmail from './auth/login-email';
import logInWithGoogle from './auth/login-google';
import logout from './auth/logout';
import registerWithEmail from './auth/register-email';
import sendPasswordReset from './auth/password-reset';

const init = initializeApp({
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
});

const db = getFirestore(init);

const auth = getAuth(init);

export {
  init,
  db,
  auth,
  logInWithEmail,
  logInWithGoogle,
  logout,
  registerWithEmail,
  sendPasswordReset
};
