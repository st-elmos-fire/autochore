import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRouter } from 'next/router';

import { auth, logInWithEmail, logInWithGoogle } from '@firebase';

/** Import template */
import MainTemplate from '@templates/main';
import Link from 'next/link';

/** Import libs */

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, loading, error] = useAuthState(auth);
  const router = useRouter();

  useEffect(() => {
    if (loading) return;
    if (user) router.push('/');
  }, [user, loading]);
  return (
    <MainTemplate>
      <h1>Hello world</h1>
      <h2>Here is a your login screen</h2>
      <div>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          onClick={async (e) => {
            e.preventDefault();
            await logInWithEmail(email, password);
          }}
        >
          Login
        </button>
        <button onClick={logInWithGoogle}>Login with Google</button>
        <div>
          {error && <p>{error.message}</p>}
          Don&apos;t have an account?{' '}
          <Link href="/auth/register">Register</Link> now.
        </div>
      </div>
    </MainTemplate>
  );
};

export default LoginPage;
