import { Chore } from '@typedefs/chore';
import React from 'react';

/* Import Stylesheet */
import styles from './styles.module.scss';

/* Prop Types */
export interface Props {
  /**
   * An array of chores
   */
  chores: Chore[];
}

/* Render component */
export const ChoresList: React.FC<Props> = ({ chores }: Props) => {
  return (
    <ul>
      {chores.map((chore) => (
        <li key={chore.id}>
          <span>{chore.assignee}</span>
          <span>{chore.content}</span>
        </li>
      ))}
    </ul>
  );
};

export default ChoresList;
