import React from 'react'
import { IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

// Import types
import { Chore } from '../../types/chore';
import { User } from '../../types/user';

/* Import Stylesheet */
import styles from './styles.module.scss'



/* Prop Types */
export interface Props {
  /**
   * The an array of chores
   */
  chores: Chore[]
  /**
   * The an array of users
   */
  users: User[]
}

/* Render component */
export const ChoresList: React.FC<Props> = ({ chores, users }: Props) => {

  const getUserName = (id: number) => {
    const user = users.find(user => user.todoist_id === id)
    return user ? user.name : 'Unassigned'
  }

  return <TableContainer component={Paper}>
    <Table sx={{ minWidth: 650 }} aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell>Name</TableCell>
          <TableCell>Exception</TableCell>
          <TableCell>Frequency</TableCell>
          <TableCell>Assignee</TableCell>
          <TableCell>Edit</TableCell>
          <TableCell>Delete</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {chores.map((row) => (
          <TableRow
            key={row.content}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
            <TableCell component="th" scope="row">
              {row.content}
            </TableCell>
            <TableCell>{row.except}</TableCell>
            <TableCell>{row.frequency}</TableCell>
            <TableCell>{getUserName(row.assignee)}</TableCell>
            <TableCell>
              <IconButton color="primary" aria-label="edit task" component="span">
                <EditIcon />
              </IconButton>
            </TableCell>
            <TableCell>
              <IconButton color="primary" aria-label="delete task" component="span">
                <DeleteForeverIcon />
              </IconButton>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
}


export default ChoresList
