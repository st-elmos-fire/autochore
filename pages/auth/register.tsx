import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRouter } from 'next/router';

import { auth, registerWithEmail, logInWithGoogle } from '@firebase';

/** Import template */
import MainTemplate from '@templates/main';
import Link from 'next/link';

/** Import libs */

const RegisterPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const router = useRouter();

  const register = () => {
    if (!name) alert('Please enter name');
    registerWithEmail(name, email, password);
  };
  const [user, loading, error] = useAuthState(auth);

  useEffect(() => {
    if (loading) return;
    if (user) router.push('/');
  }, [user, loading]);

  return (
    <MainTemplate>
      <h1>Hello world</h1>
      <h2>Here is a your register screen</h2>
      <div>
        <input
          type="text"
          className="register__textBox"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Full Name"
        />
        <input
          type="text"
          className="register__textBox"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail Address"
        />
        <input
          type="password"
          className="register__textBox"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button className="register__btn" onClick={register}>
          Register
        </button>
        <button
          className="register__btn register__google"
          onClick={logInWithGoogle}
        >
          Register with Google
        </button>
        <div>
          Already have an account? <Link href="/auth/login">Login</Link> now.
        </div>
      </div>
      {error && <p>{error.message}</p>}
    </MainTemplate>
  );
};

export default RegisterPage;
