import { Chore } from '@typedefs/chore';
import { User } from '@typedefs/user';
import React from 'react';
import { Avatar, Button } from '@components';

/* Import Stylesheet */
import styles from './styles.module.scss';
import { FaPencilAlt, FaTrash } from 'react-icons/fa';

/* Prop Types */
export interface Props {
  /**
   * An array of chores
   */
  chores: Chore[];
  /**
   * An array of users
   */
  users: User[];
}

/* Render component */
export const ChoresList: React.FC<Props> = ({ chores, users }: Props) => {
  // convert assignee to user
  const assigneeToUser = (assignee: number) => {
    const user = users.find((user) => user.todoist_id === assignee);
    return user ? user : null;
  };

  return (
    <>
      <table className={styles['chores-list']}>
        <thead className={styles['chores-header']}>
          <tr>
            <th>Chore</th>
            <th>Assignee</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody className={styles['chores-body']}>
          {chores.map((chore) => (
            <tr className={styles['chore-row']} key={chore.id}>
              <th>{chore.content}</th>
              <td>
                <Avatar
                  name={assigneeToUser(chore.assignee)?.name || undefined}
                  imagePath={
                    assigneeToUser(chore.assignee)?.avatar || undefined
                  }
                  size="50px"
                />
              </td>
              <td>
                <Button
                  iconOnly
                  title="Edit"
                  className={styles['action-button']}
                >
                  <FaPencilAlt />
                </Button>
              </td>
              <td>
                <Button
                  iconOnly
                  title="delete"
                  className={styles['action-button']}
                >
                  <FaTrash />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default ChoresList;
