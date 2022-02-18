import { createContext, useReducer, useState } from 'react';
import { Alert, Paper, Snackbar, Typography} from '@mui/material'

/** Import components */
import ChoresList from '../components/chores-list';
import ChoreForm from '../components/chore-form';

/** Import types */
import { Month } from '../types/month';
import { Chore } from '../types/chore';

/** Import template */
import MainTemplate from '../templates/main';

/** Import libs */
import postToDatabase from '../lib/post-to-database';
import getData from '../lib/get-from-database';
import deleteFromDatabase from '../lib/delete-from-database';
import editInDatabase from '../lib/edit-in-database';
import Response from '../types/response';


const days = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday'
]

  // Create an array of months with the month name and month number
const months: Month[] = [
  { name: 'January', number: 1, days: 31 },
  { name: 'February', number: 2, days: 28 },
  { name: 'March', number: 3, days: 31 },
  { name: 'April', number: 4, days: 30},
  { name: 'May', number: 5, days: 31 },
  { name: 'June', number: 6, days: 30 },
  { name: 'July', number: 7, days: 31 },
  { name: 'August', number: 8, days: 31 },
  { name: 'September', number: 9, days: 31 },
  { name: 'October', number: 10, days: 30 },
  { name: 'November', number: 11, days: 31 },
  { name: 'December', number: 12, days: 31 }
]

export const ModeContext = createContext(null);

const initialState = 'view'

const reducer = (view: string, action: string) => {
  if (!view) return initialState;
  if (view === action.toLowerCase()) return view;
  return action.toLowerCase()
}

export default function Home(pageProps) {

  const {users, chores} = pageProps;

  const [choresList, setChoresList] = useState<Chore[]>(chores)
  const [chore, setChore] = useState<Chore | null>()
  
  const [view, dispatch] = useReducer(reducer, initialState);
  const [feedback, setFeedback] = useState<Response>(null);
  
  const updateChoresList = async (newChore: Chore, existingChore?: Chore ) => {
    const response = (!existingChore) 
      ? await postToDatabase(newChore)
      : await editInDatabase(newChore, existingChore)
    
      setFeedback(response as Response)
    
      if (response.status === 'success') {
      if (!existingChore) {
        setChoresList([...choresList, newChore])
      } else {
        const updatedChoresList = choresList.map(chore => {
          if (chore.content === existingChore.content) {
            return newChore
          }
          return chore
        })
        setChoresList(updatedChoresList)
        dispatch('VIEW')
      }
    }
  }


  const editChore = async (chore: Chore) => {
    dispatch('UPDATE')
    setChore(choresList.find(c => c.content === chore.content))    
  }

  const deleteChore = async (chore: Chore) => {
    const response = await deleteFromDatabase(chore)
    setFeedback(response as Response)
    if (response.status === 'success') {
      setChoresList(choresList.filter(c => c.content !== chore.content))
    }
  }

  return (
    <ModeContext.Provider value={{ view, dispatch }}>
      <MainTemplate>
        <>
        <Snackbar open={feedback !== null} autoHideDuration={6000} onClose={() => setFeedback(null)}>
            <Alert onClose={() => setFeedback(null)} severity={feedback?.status === 'success' ? 'success' : 'error'} sx={{ width: '100%' }}>
              {feedback?.message}
            </Alert>
        </Snackbar>
        {
          view === 'view' && <>
          <Typography variant="h2" component="div" gutterBottom>
            Existing Chores
          </Typography>
          <Typography variant="body2" component="div" gutterBottom>
            <p>This is a list of chores templates that have been added to the database. This is a master list and does not reflect the chores that have actually been added to users. </p>
            <p>Deleting a chore from this list will only prevent it&apos;s future creation and will not delete the chore from todoist.</p>
          </Typography>
          <ChoresList chores={choresList} users={users} editChore={editChore} deleteChore={deleteChore} />
        </>
        }
        {
          view === 'add' && <>
          <Typography variant="h2" component="div" gutterBottom>
            Add new chores
          </Typography>
          <Paper sx={{
            padding: '24px',
          }}> 
            <ChoreForm choresList={choresList} users={users} updateChoresList={updateChoresList} days={days} months={months} updateType='add'/>
          </Paper>
        </>
        }
        {
          view === 'update' && <>
          <Typography variant="h2" component="div" gutterBottom>
            Update {chore?.content}
          </Typography>
          <Paper sx={{
            padding: '24px',
          }}> 
            <ChoreForm choresList={choresList} chore={chore} users={users} updateChoresList={updateChoresList} days={days} months={months} updateType='update'/>
          </Paper>
        </>
        }
        </>
      </MainTemplate>
    </ModeContext.Provider>
  )
}

export async function getServerSideProps(_ctx) {
  return {
    props: {
      chores: await getData('get-chores'),
      users: await getData('get-users')
    }
  }
}