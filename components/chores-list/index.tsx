import React from 'react'
import { styled, IconButton, Paper, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TableRow } from '@mui/material';
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

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

/* Render component */
export const ChoresList: React.FC<Props> = ({ chores, users }: Props) => {

  const getUserName = (id: number) => {
    const user = users.find(user => user.todoist_id === id)
    return user ? user.name : 'Unassigned'
  }

  return <TableContainer component={Paper}>
    <Table sx={{ minWidth: 650 }} aria-label="simple table">
      <TableHead>
        <StyledTableRow>
          <StyledTableCell>Name</StyledTableCell>
          <StyledTableCell>Frequency</StyledTableCell>
          <StyledTableCell>Assignee</StyledTableCell>
          <StyledTableCell>Exception</StyledTableCell>
          <StyledTableCell>Edit</StyledTableCell>
          <StyledTableCell>Delete</StyledTableCell>
        </StyledTableRow>
      </TableHead>
      <TableBody>
        {chores.map((row) => (
          <StyledTableRow
            key={row.content}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
            <StyledTableCell component="th" scope="row">
              {row.content}
            </StyledTableCell>
            <StyledTableCell>{row.frequency}</StyledTableCell>
            <StyledTableCell>{getUserName(row.assignee)}</StyledTableCell>
            <StyledTableCell><code>{row.except}</code></StyledTableCell>
            <StyledTableCell>
              <IconButton color="primary" aria-label="edit task" component="span">
                <EditIcon />
              </IconButton>
            </StyledTableCell>
            <StyledTableCell>
              <IconButton color="primary" aria-label="delete task" component="span">
                <DeleteForeverIcon />
              </IconButton>
            </StyledTableCell>
          </StyledTableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
}


export default ChoresList
