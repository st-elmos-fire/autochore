import {useState } from 'react';
import Head from 'next/head'
import { Box, TextField, Select, MenuItem, Button, InputLabel, FormGroup, Checkbox, Grid, Chip, Container, Card, CardContent, Typography, Paper } from '@mui/material'

import styles from '../styles/Home.module.css'

const apiRoot = `${process.env.NEXT_PUBLIC_APP_URL}/api`

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
  const months = [
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

export default function Home({chores, users}) {

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [effort, setEffort] = useState<number>(0)
  const [assignee, setAssignee] = useState<number>(0)
  const [exceptionType, setExceptionType] = useState<string>('never')
  const [existingTask, setExistingTask] = useState<string>('')
  const [frequency, setFrequency] = useState('daily')
  const [day, setDay] = useState<number[]|any[]>([])
  const [month, setMonth] = useState<number[]|any[]>([])
  const [runOn, setRunOn] = useState<string[]|any[]>([])

  const addChore = async () => {
    setRunOn(() => month.map(m => day.map(d => `${d}/${m}`)).flat())
    const existingChores = chores.filter(chore => {
      return chore.content === name
    })
    if (existingChores.length > 0) {
      alert('Chore already exists')
      return
    }
    const newChore = {
      content: name,
      description,
      project_id: parseInt(process.env.NEXT_PUBLIC_PROJECT_ID),
      priority: effort,
      except: `${exceptionType} run if '${existingTask}' exists`,
      assignee,
      frequency,
      run_on: runOn
    }


    const response = await fetch(`${apiRoot}/add-chore`, {
      method: 'POST',
      body: JSON.stringify(newChore),
    })

    const data = await response.json()

    if (data.success) {
      alert('Chore added')
    }

  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Chores CMS</title>
        <meta name="description" content="Add your chores here!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
      <Container fixed component={Card}>
        <CardContent>
        <Typography variant="h1" component="div" gutterBottom align='center'>
          Welcome to the chores CMS
        </Typography>
        <Box
        component="form"
        sx={{
          '& > :not(style)': { m: 1, width: '100ch' },
        }}
        noValidate
        autoComplete="off"
      >
        <InputLabel htmlFor="task-name" required >Name</InputLabel>
        <TextField id="task-name" label="Task Name" variant="outlined" sx={{ minWidth: '99%' }} required onChange={(e) => setName(e.target.value)} />
        <InputLabel htmlFor="description">Description</InputLabel>
        <TextField id="description" label="description" variant="outlined" sx={{ minWidth: '99%' }} multiline rows={2} onChange={(e) => setDescription(e.target.value)} />
        <InputLabel htmlFor="effort" required>Effort</InputLabel>
        <Select
          id="effort"
          value={effort}
          inputProps={{ 'aria-label': 'Without label' }}
          required
          sx={{ minWidth: '99%' }}
          onChange={(e) => setEffort(e.target.value as number)}
        >
          <MenuItem value={0}>
            <em>Choose effort level</em>
          </MenuItem>
          <MenuItem value={1}>Super easy</MenuItem>
          <MenuItem value={2}>Pretty easy</MenuItem>
          <MenuItem value={3}>Kinda difficult</MenuItem>
          <MenuItem value={4}>Not fun at all</MenuItem>
        </Select><br />
        <InputLabel htmlFor="assignee">Assignee</InputLabel>
        <Select
          id="assignee"
          value={assignee}
          inputProps={{ 'aria-label': 'Without label' }}
          sx={{ minWidth: '99%' }}
          onChange={(e) => setAssignee(e.target.value as number)}
        >
          <MenuItem value={0}>Unassigned</MenuItem>
          {users.map(user => (
            <MenuItem key={user.trello_id} value={user.trello_id}>{user.name}</MenuItem>
          ))}
        </Select><br />
        { chores.length > 0 &&
        <>
          <InputLabel htmlFor="exception">Exceptions</InputLabel>
          <Select
            id="exception"
            value={exceptionType}
            inputProps={{ 'aria-label': 'Without label' }}
            sx={{ minWidth: '99%' }}
            onChange={(e) => setExceptionType(e.target.value as string)}
          >
            <MenuItem value={'only'}>Only create task</MenuItem>
            <MenuItem value={'never'}>Never create task</MenuItem>
          </Select><br />
          <InputLabel htmlFor="exception">If the following task exists</InputLabel>
          <Select
            id="exception"
            value={existingTask}
            inputProps={{ 'aria-label': 'Without label' }}
            sx={{ minWidth: '99%' }}
            onChange={(e) => setExistingTask(e.target.value as string)}
          >
            <MenuItem value={''}>Select task</MenuItem>
            {chores.map(chore => {
              return <MenuItem key={chore.content} value={chore.content}>{chore.content}</MenuItem>
            })}
          </Select><br />
          </>
        }   
        <InputLabel htmlFor="frequency" required>Frequency</InputLabel>
        <Select
          id="frequency"
          value={frequency}
          inputProps={{ 'aria-label': 'Without label' }}
          sx={{ minWidth: '99%' }}
          required
          onChange={(e) => {
            setFrequency(e.target.value)
            setMonth([])
            setDay([])
            setRunOn([])
            }
          }
        >
          <MenuItem value={'daily'}>Daily</MenuItem>
          <MenuItem value={'weekly'}>Weekly</MenuItem>
          <MenuItem value={'monthly'}>Monthly</MenuItem>
          <MenuItem value={'yearly'}>Yearly</MenuItem>
        </Select>
        {
          frequency === 'weekly' && (
            <FormGroup>
              <InputLabel htmlFor="run-on">Run on</InputLabel>
              <Grid container spacing={1} columns={4}>
                {
                  days.map((wd, i) => (
                    <Grid item key={i}>
                      <Checkbox
                        id={`run-on-${i}`}
                        checked={runOn.includes(wd)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setRunOn([...runOn, wd])
                          } else {
                            setRunOn(runOn.filter(d => d !== wd))
                          }
                        }}
                      />
                      <label htmlFor={`run-on-${i}`}>{wd}</label>
                </Grid>
                  ))
                }
              </Grid>
            </FormGroup>
          )
        }
        <br />
        {
          frequency === 'monthly' && (
            <>
            <FormGroup >
              <InputLabel htmlFor="select-month">Run on which month(s)</InputLabel>
              <Grid container spacing={1} columns={4}>
                {
                  months.map((m, i) => (
                    <Grid item key={i}>
                      <Checkbox
                        id={`run-on-${i}`}
                        checked={month.includes(m.number)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setMonth([...month, m.number])
                          } else {
                            setMonth(month.filter(d => d !== m.number))
                          }
                        }
                      } />
                      <label htmlFor={`run-on-${i}`}>{m.name}</label>
                      </Grid>
                  ))
                }
              </Grid>
              <Button onClick={
                () => {
                  setMonth([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12])
                }
              } >Select all</Button> 
            </FormGroup>
            {
              month.length > 0 && (
                <FormGroup>
                  <InputLabel htmlFor="select-day">on which day(s)</InputLabel>
                  <Grid container spacing={1} columns={4}>
                    {
                      Array.from({ length: 31 }, (v, i) => i + 1).map((d, i) => (
                        <Grid item key={i}>
                          <Checkbox
                            id={`run-on-${i+1}`}
                            checked={day.includes(d)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setDay([...day, d])
                              } else {
                                setDay(day.filter(x => x !== day))
                              }
                            }
                          }
                          />
                          <label htmlFor={`run-on-${i+1}`}>{i+1}</label>
                        </Grid>
                      ))                         
                    }
                  </Grid>
                </FormGroup>
              )
            }
            </>
          )
        }
        {
          frequency === 'yearly' && (
            <>
              {
                runOn.length > 0 && (
                  <div>
                    {
                      runOn.map((d, i) => (
                        <Chip key={i} label={d} onDelete={() => {
                          setRunOn(runOn.filter(x => x !== d))
                        }
                        } />
                      ))
                    }
                  </div>
                )
              }
              <InputLabel htmlFor="select-month">Run on which month?</InputLabel>
              <Select
                id="month-of-year"
                value={month}
                inputProps={{ 'aria-label': 'Without label' }}
                onChange={(e) => setMonth([e.target.value])}
                sx={{ minWidth: '99%' }}
              >
                {
                  months.map((m, i) => (
                    <MenuItem key={i} value={m.number}>{m.name}</MenuItem>
                  ))
                }
              </Select>
              <br />
              <InputLabel htmlFor="select-month">Add which day?</InputLabel>
              <Select
                id="day-of-month"
                value={day}
                inputProps={{ 'aria-label': 'Without label' }}
                onChange={(e) => setDay([e.target.value])}
                sx={{ minWidth: '99%' }}
              >
                {
                  Array.from({ length: 31 }, (v, i) => i + 1).map((d, i) => (
                    <MenuItem key={i} value={d}>{d}</MenuItem>
                  ))
                }
              </Select>
              <br />
              <Button variant="contained" color="primary" onClick={() => {
                setRunOn([...runOn, `${day}-${month}`])
              }}>Add</Button>
            </>
          )
        }
        
        <br />
      </Box>
      <Box sx={{
          '& > :not(style)': { m: 1, width: '100ch' },
        }}>
        <h2>The following data will be pushed to the database</h2>
        <Paper variant="outlined" sx={{ minWidth: '99%' }}>
          <Box p={2} sx={{ minWidth: '99%' }}>
          <code>
            {
              JSON.stringify({
                name,
                description,
                effort,
                frequency,
                assignee,
                'run_on': runOn
              })
            }
          </code>
          </Box>
        </Paper>
        <br />
        <Button variant="contained" color="primary" sx={{ minWidth: '99%' }} size="large" disabled={
           name === '' || 
           effort === 0 || 
           frequency === '' || 
           frequency === 'weekly' && runOn.length === 0 ||
           frequency === 'yearly' && runOn.length === 0 ||
           frequency === 'monthly' && (month.length === 0) ||
           frequency === 'monthly' && (day.length === 0)
          } onClick={addChore} >Add Chore</Button>
        </Box>
        </CardContent>
        </Container>
      </main>
    </div>
  )
}

export async function getServerSideProps(_ctx) {
  
  const getData = async (endpoint: string) => {
    const response = await fetch(`${apiRoot}/${endpoint}`)
    const res = await response.json()
    return res
  }
  
  return {
    props: {
      chores: await getData('get-chores'),
      users: await getData('get-users')
    }
  }
}
