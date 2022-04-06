import React, { ReactNode, useState } from 'react';
import { Input, InputContainer, Button } from '@components';

/* Import Stylesheet */
import styles from './styles.module.scss';

interface FederatedProvider {
  name: string;
  logo?: ReactNode;
  loginWithProvider: () => void;
}

/* Prop Types */
export interface Props {
  /**
   * The login function to call when the user submits the form
   **/
  loginWithEmail: (email: string, password: string) => Promise<void>;
  /**
   * The login function to call when the user clicks the google button
   */
  federatedProvider?: FederatedProvider[];
  /**
   * Any error message to display if the email field is invalid
   * */
  emailError?: string;
  /**
   * Any error message to display if the password field is invalid
   * */
  passwordError?: string;
  /**
   * The email value
   * */
  email?: string;
  /**
   * The password value
   * */
  password?: string;
}

/* Render component */
export const LoginForm: React.FC<Props> = ({
  loginWithEmail,
  federatedProvider,
  emailError,
  passwordError,
  email,
  password
}: Props) => {
  /* State */
  const [emailState, setEmailState] = useState(email || '');
  const [passwordState, setPasswordState] = useState(password || '');
  const [emailErrorState, setEmailErrorState] = useState(emailError);
  const [passwordErrorState, setPasswordErrorState] = useState(passwordError);
  const [hasErrors, setHasErrors] = useState(false);

  /* Handle form submission */
  const handleSubmit = () => {
    console.log(emailState, passwordState);

    if (!emailState) {
      setEmailErrorState('Email is required');
      setHasErrors(true);
    }
    if (!passwordState) {
      setPasswordErrorState('Password is required');
      setHasErrors(true);
    }
    if (
      !emailState?.match(
        /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
      )
    ) {
      setEmailErrorState('Please enter a valid email address');
      setHasErrors(true);
    }
    if (!hasErrors) {
      setEmailErrorState('');
      setPasswordErrorState('');
      loginWithEmail(emailState, passwordState);
    }
  };

  /* Render component */
  return (
    <div className={styles['login-form']}>
      <InputContainer
        inputName="Email"
        labelText="Enter your email address"
        inputState={emailErrorState ? 'error' : 'default'}
        stateMessage={emailErrorState}
      >
        <Input
          name="Email"
          placeholder="Email Address"
          type="email"
          value={emailState}
          onChange={(e) => setEmailState(e.target.value)}
        />
      </InputContainer>
      <InputContainer
        inputName="Password"
        labelText="Enter your password"
        inputState={passwordErrorState ? 'error' : 'default'}
        stateMessage={passwordErrorState}
      >
        <Input
          name="Password"
          placeholder="Password"
          type="password"
          value={passwordState}
          onChange={(e) => setPasswordState(e.target.value)}
        />
      </InputContainer>
      <Button variant="primary" onClick={handleSubmit}>
        Login
      </Button>
      {federatedProvider?.map((provider: FederatedProvider) => {
        return (
          <Button
            key={provider.name}
            variant="secondary"
            alignIcon="left"
            onClick={provider.loginWithProvider}
          >
            {provider.logo}
            Login with {provider.name}
          </Button>
        );
      })}
    </div>
  );
};

export default LoginForm;
