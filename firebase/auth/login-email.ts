import { signInWithEmailAndPassword } from 'firebase/auth';

import { auth } from '@firebase';

const logInWithEmail = async (email: string, password: string) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    console.error(err);
  }
};

export default logInWithEmail;
