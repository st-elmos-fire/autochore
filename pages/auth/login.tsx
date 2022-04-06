import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRouter } from 'next/router';
import { FcGoogle } from 'react-icons/fc';
import { auth, logInWithEmail, logInWithGoogle } from '@firebase';

/** Import template */
import MainTemplate from '@templates/main';
import Link from 'next/link';
import LoginForm from '@components/login-form';

/** Import libs */

const LoginPage: React.FC = () => {
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
      <LoginForm
        loginWithEmail={logInWithEmail}
        federatedProvider={[
          {
            name: 'Google',
            logo: <FcGoogle />,
            loginWithProvider: () => {
              logInWithGoogle;
            }
          }
        ]}
      />
      <div>
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
