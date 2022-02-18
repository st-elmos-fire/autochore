import { Container, Card, CardContent, Typography, Box, InputLabel, TextField, Select, MenuItem, FormGroup, Grid, Checkbox, Button, Chip, Paper } from '@mui/material'

import React, { useEffect, useState, useRef } from 'react'

/* Import Types */
import { Chore } from '../../types/chore'
import { Month } from '../../types/month'
import { User } from '../../types/user'

/* Prop Types */
export interface Props {
  /**
   * The entire chores list (used in add mode)
   */
  choresList: Chore[]
  /**
   * Get a single chore (used in edit mode)
   */
  chore?: Chore
  /**
   * The function to call when the button is clicked
   */
  updateChoresList: (newChore: Chore, existingChore?: Chore) => void
  /**
   * The users list
   */
  users: User[]
  /**
   * A list of the days of the week
   */
  days: string[]
  /**
   * A list of the months of the year
   * */
  months: Month[],
  /**
   * Update type
   * */
  updateType: 'update' | 'add'

}

// TODO: REFACTOR: This page is chaos, it should be split into multiple components

/* Render component */
export const ChoreForm: React.FC<Props> = ({ choresList, chore, updateChoresList, users, days, months, updateType }: Props) => {

  const [name, setName] = useState(chore?.content || '')
  const [description, setDescription] = useState(chore?.description || '')
  const [effort, setEffort] = useState<number>(chore?.priority || 0)
  const [assignee, setAssignee] = useState<number>(chore?.assignee || 0)
  const [exceptionType, setExceptionType] = useState(chore?.exceptionType || 'none')
  const [existingChore, setExistingChore] = useState(chore?.existingChore || '')
  const [frequency, setFrequency] = useState(chore?.frequency || 'daily')
  const [day, setDay] = useState<number[]|any[]>([])
  const [month, setMonth] = useState<number[]|any[]>([])
  const [runOn, setRunOn] = useState<string[]|any[]>(chore?.run_on || [])
  const [rollingRunOn, setRollingRunOn] = useState({
    day: null,
    month: null,
  })
  
  const updateChore = async () => {
    if (updateType === 'add') {
      const existingChores = choresList.filter(chore => chore.content === name)

      if (existingChores.length > 0) {
        alert('Chore already exists')
        return
      }
    }
    
    let stitchedDates = []

    if (rollingRunOn.month && rollingRunOn.day) {
      stitchedDates = rollingRunOn.month.map(m => {
        return rollingRunOn.day.map(d => {
          return `${d}/${m}`
        })
      }).flat()
    }
        
    const choreDetails = {
      content: name,
      description,
      project_id: parseInt(process.env.NEXT_PUBLIC_PROJECT_ID),
      priority: effort,
      exceptionType,
      existingChore,
      assignee,
      frequency,
      run_on: stitchedDates?.length ? stitchedDates : runOn
    }

    return updateChoresList(choreDetails, chore);
  }

  useEffect(() => {
    if (frequency === 'monthly') {
      const m = runOn.map(r => parseInt(r.split('/')[1]))
      const d = runOn.map(r => parseInt(r.split('/')[0]))
      setMonth(() => m)
      setDay(() => d)
      setRollingRunOn({
        day: Array.from( new Set(d)),
        month: Array.from( new Set(m))
      })
    }
  }, [frequency, runOn])

  return <>
  <Box
  component="form"
  sx={{
    '& > :not(style)': { m: 1, width: '100ch' },
  }}
  noValidate
  autoComplete="off"
  >
  <InputLabel htmlFor="task-name" required >Name</InputLabel>
  <TextField id="task-name" label="Task Name" variant="outlined" sx={{ minWidth: '99%' }} required onChange={(e) => setName(e.target.value)} value={name} />
  <InputLabel htmlFor="description">Description</InputLabel>
  <TextField id="description" label="description" variant="outlined" sx={{ minWidth: '99%' }} multiline rows={2} onChange={(e) => setDescription(e.target.value)} value={description} />
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
    <MenuItem value={4}>Super easy</MenuItem>
    <MenuItem value={3}>Pretty easy</MenuItem>
    <MenuItem value={2}>Kinda difficult</MenuItem>
    <MenuItem value={1}>Not fun at all</MenuItem>
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
      <MenuItem key={user.todoist_id} value={user.todoist_id}>{user.name}</MenuItem>
    ))}
  </Select><br />
  { choresList.length > 0 &&
  <>
    <InputLabel htmlFor="exception">Exceptions</InputLabel>
    <Select
      id="exception"
      value={exceptionType}
      inputProps={{ 'aria-label': 'Without label' }}
      sx={{ minWidth: '99%' }}
      onChange={(e) => setExceptionType(e.target.value as string)}
    >
      <MenuItem value={'none'}>No exceptions</MenuItem>
      <MenuItem value={'only'}>Only create chore</MenuItem>
      <MenuItem value={'never'}>Never create chore</MenuItem>
    </Select><br />
    { exceptionType !== 'none' &&
    <>
    <InputLabel htmlFor="exception">If the following chore exists</InputLabel>
    <Select
      id="exception"
      value={existingChore}
      inputProps={{ 'aria-label': 'Without label' }}
      sx={{ minWidth: '99%' }}
      onChange={(e) => setExistingChore(e.target.value as string)}
    >
      <MenuItem value={''}>Select task</MenuItem>
      {choresList.map(chore => {
        return <MenuItem key={chore.content} value={chore.content}>{chore.content}</MenuItem>
      })}
    </Select><br />
    </>
  }
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
                  checked={runOn.includes(wd.toLowerCase())}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setRunOn([...runOn, wd.toLowerCase()])
                    } else {
                      setRunOn(runOn.filter(d => d !== wd.toLowerCase()))
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
            months.map((m, i) => {
              return <Grid item key={i}>
                <Checkbox
                  id={`run-on-${i}`}
                  checked={month.includes(m.number)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setMonth([...month, m.number])
                      setRollingRunOn({
                        ...rollingRunOn,
                        month: [...rollingRunOn.month, m.number]
                      })
                    } else {
                      setMonth(month.filter(d => d !== m.number))
                      setRollingRunOn({
                        ...rollingRunOn,
                        month: rollingRunOn.month.filter(d => d !== m.number)
                      })
                    }

                  }
                } />
                <label htmlFor={`run-on-${i}`}>{m.name}</label>
                </Grid>
            })      
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
                          setRollingRunOn({
                            ...rollingRunOn,
                            day: [...rollingRunOn.day, d]
                          })
                        } else {
                          setDay(day.filter(x => x !== d))
                          setRollingRunOn({
                            ...rollingRunOn,
                            day: rollingRunOn.day.filter(x => x !== d)
                          })
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
                    console.log(d)
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
          setRunOn([...runOn, `${day}/${month}`])
        }}>Add</Button>
      </>
    )
  }
  
  <br />
  </Box>
  <Box sx={{
    '& > :not(style)': { m: 1, width: '100ch' },
  }}>
  <Button variant="contained" color="primary" sx={{ minWidth: '99%' }} size="large" disabled={
    name === '' || 
    effort === 0 || 
    frequency === '' || 
    frequency === 'weekly' && runOn.length === 0 ||
    frequency === 'yearly' && runOn.length === 0 ||
    frequency === 'monthly' && (month.length === 0) ||
    frequency === 'monthly' && (day.length === 0)
    } onClick={updateChore} >{updateType} Chore</Button>
  </Box>
  </>
}


export default ChoreForm
