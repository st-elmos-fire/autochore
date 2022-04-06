import React from 'react';
import classNames from 'classnames';

/* Import Stylesheet */
import styles from './styles.module.scss';

export type InputTypes =
  | 'text'
  | 'password'
  | 'email'
  | 'number'
  | 'file'
  | 'tel'
  | 'url';

/* Prop Types */
export interface Props {
  /**
   * The name of the input, (the id value of the child input) used for the label target
   */
  name: string;
  /**
   * The type of input to display (text, password, email, etc)
   */
  type: InputTypes;
  /**
   * Is the input required?
   */
  required?: boolean;
  /**
   * Placeholder text to display in the input
   */
  placeholder?: string;
  /**
   * Is the input disabled?
   */
  disabled?: boolean;
  /**
   * Is the input readonly?
   * */
  readonly?: boolean;
  /**
   * The input value
   */
  value?: string;
  /**
   * The event handler for when the input value changes
   */
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const cx = classNames.bind(styles);

/* Render component */
export const Input: React.FC<Props> = ({
  name,
  type,
  required,
  placeholder,
  disabled,
  readonly,
  value,
  onChange
}: Props) => (
  <input
    className={cx(styles['input'], styles[`type-${type}`])}
    id={name}
    name={name}
    type={type}
    required={required}
    placeholder={placeholder}
    disabled={disabled}
    readOnly={readonly}
    value={value}
    onChange={(e) => (onChange ? onChange(e) : null)}
  />
);

export default Input;
