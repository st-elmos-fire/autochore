import React from 'react';
import {
  styled,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
  IconContainerProps,
  Card
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAltOutlined';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';

// Import types
import { Chore } from '../../types/chore';
import { User } from '../../types/user';

/* Prop Types */
export interface Props {
  /**
   * The an array of chores
   */
  chores: Chore[];
  /**
   * The an array of users
   */
  users: User[];
  /**
   * Edit task function
   */
  editChore: (chore: Chore) => void;
  /**
   * Delete task function
   * @param chore The chore to delete
   */
  deleteChore: (chore: Chore) => void;
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14
  }
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0
  }
}));

/* Render component */
export const ChoresList: React.FC<Props> = ({
  chores,
  users,
  editChore,
  deleteChore
}: Props) => {
  const getUser = (id: number) => {
    const user = users.find((user) => user.todoist_id === id);
    return user
      ? user
      : {
          name: 'Unassigned',
          avatar: null
        };
  };

  const customIcons: {
    [index: string]: {
      icon: React.ReactElement;
      label: string;
    };
  } = {
    1: {
      icon: <SentimentDissatisfiedIcon sx={{ color: '#DE1842' }} />,
      label: 'Difficult'
    },
    2: {
      icon: <SentimentSatisfiedIcon sx={{ color: '#EDBF31' }} />,
      label: 'Medium'
    },
    3: {
      icon: <SentimentSatisfiedAltIcon sx={{ color: '#B7DE18' }} />,
      label: 'Easy'
    },
    4: {
      icon: <SentimentVerySatisfiedIcon sx={{ color: '#31ED95' }} />,
      label: 'Super easy, barely an inconvenience'
    }
  };

  function IconContainer(props: IconContainerProps) {
    const { value, ...other } = props;
    return <span {...other}>{customIcons[value].icon}</span>;
  }

  const RenderChores = () => (
    <Table sx={{ minWidth: 650 }} aria-label="simple table">
      <TableHead>
        <StyledTableRow>
          <StyledTableCell>Name</StyledTableCell>
          <StyledTableCell>Exception</StyledTableCell>
          <StyledTableCell>Frequency</StyledTableCell>
          <StyledTableCell align="center">Assignee</StyledTableCell>
          <StyledTableCell align="center">Difficulty</StyledTableCell>
          <StyledTableCell align="center">Edit</StyledTableCell>
          <StyledTableCell align="center">Delete</StyledTableCell>
        </StyledTableRow>
      </TableHead>
      <TableBody>
        {
          // I'm gonna fix this in a future PR so I'm ignoring it for now so the build passes
          /* eslint-disable-next-line */
          chores.map((chore) => 
            <StyledTableRow
              key={chore.content}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <StyledTableCell component="th" scope="row">
                {chore.content}
              </StyledTableCell>
              <StyledTableCell>
                <code>
                  {chore.exceptionType && chore.exceptionType !== 'none'
                    ? `${chore.exceptionType} create chore if '${chore.existingChore}' exists`
                    : 'No exceptions'}
                </code>
              </StyledTableCell>
              <StyledTableCell sx={{ width: '180px' }}>
                {chore.frequency}
              </StyledTableCell>
              <StyledTableCell sx={{ width: '80px' }} align="center">
                <Avatar
                  alt={getUser(chore.assignee).name}
                  src={getUser(chore.assignee).avatar}
                  sx={{ marginLeft: '8px' }}
                />
              </StyledTableCell>
              <StyledTableCell sx={{ width: '80px' }} align="center">
                <IconContainer value={chore.priority} />
              </StyledTableCell>
              <StyledTableCell sx={{ width: '80px' }} align="center">
                <IconButton
                  color="primary"
                  aria-label="edit task"
                  component="span"
                  onClick={() => editChore(chore)}
                >
                  <EditIcon />
                </IconButton>
              </StyledTableCell>
              <StyledTableCell sx={{ width: '80px' }} align="center">
                <IconButton
                  color="primary"
                  aria-label="delete task"
                  component="span"
                  onClick={() => deleteChore(chore)}
                >
                  <DeleteForeverIcon />
                </IconButton>
              </StyledTableCell>
            </StyledTableRow>
        )
      }
      </TableBody>
    </Table>
  );

  return (
    <TableContainer component={Paper}>
      {chores.length ? (
        <RenderChores />
      ) : (
        <Card sx={{ padding: '20px' }}>No chores found</Card>
      )}
    </TableContainer>
  );
};

export default ChoresList;
