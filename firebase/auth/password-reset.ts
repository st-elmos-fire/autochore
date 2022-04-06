import { sendPasswordResetEmail } from 'firebase/auth';

import { auth } from '@firebase';

const sendPasswordReset = async (email: string) => {
  try {
    await sendPasswordResetEmail(auth, email);
    alert('Password reset link sent!');
  } catch (err) {
    console.error(err);
  }
};

export default sendPasswordReset;
