import {useState } from 'react';
import Head from 'next/head'
import { Box, TextField, Select, MenuItem, Button, InputLabel, FormGroup, Checkbox, Grid, Chip, Container, Card, CardContent, Typography, Paper } from '@mui/material'

import styles from '../styles/Home.module.css'
import { Month } from '../types/month';
import ChoresList from '../components/chores-list';

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
  const months: Month = [
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

const updateChoresList = async (newChore) => {
  const response = await fetch(`${apiRoot}/add-chore`, {
    method: 'POST',
    body: JSON.stringify(newChore),
  })

  const data = await response.json()

  if (data.success) {
    alert('Chore added')
  }
}

export default function Home({chores, users}) {

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
        <ChoresList chores={chores} users={users} />
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
