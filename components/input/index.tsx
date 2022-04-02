import React from 'react';

/* Import Stylesheet */
import styles from './styles.module.scss';

/* Prop Types */
export interface Props {
  /**
   * The name of the thing
   */
  name: string;
  /**
   * The colour of the thing
   */
  colour: string;
}

/* Render component */
export const Input: React.FC<Props> = ({ name, colour }: Props) => (
  <div className={styles[colour]}>
    This is an example component, the name provided to it was {name}
  </div>
);

export default Input;
