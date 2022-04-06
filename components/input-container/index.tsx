import React, { ReactNode } from 'react';
import classNames from 'classnames';

/* Import Stylesheet */
import styles from './styles.module.scss';

/* Prop Types */
export interface Props {
  /**
   * The name of the input, (the id value of the child input) used for the label target
   */
  inputName: string;
  /**
   * The label to display above the input
   **/
  labelText: string;
  /**
   * Should the label be hidden or visible?
   */
  hideLabel?: boolean;
  /**
   * The helper text to display below the input
   * If not provided, the helper text will will not be displayed
   * */
  helperText?: string;
  /**
   * The state of the input (not providing a value or setting the value to '' or 'default' will all return a default state)
   **/
  inputState?: 'error' | 'success' | 'warning' | 'default' | '';
  /**
   * If the state requires a message, this is the message to display
   * */
  stateMessage?: string;
  /**
   * The input to display in the container
   */
  children: ReactNode;
}

const cx = classNames.bind(styles);

/* Render component */
export const InputContainer: React.FC<Props> = ({
  inputName,
  labelText,
  hideLabel,
  helperText,
  inputState,
  stateMessage,
  children
}: Props) => (
  <div
    className={cx(styles['input-container'], inputState && styles[inputState])}
  >
    {!hideLabel && (
      <label className={styles['input-label']} htmlFor={inputName}>
        {labelText}
      </label>
    )}
    {children}
    {helperText && <div className={styles['helper-text']}>{helperText}</div>}
    {stateMessage && (
      <div className={styles['state-message']}>{stateMessage}</div>
    )}
  </div>
);

export default InputContainer;
