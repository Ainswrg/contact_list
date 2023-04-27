import React, { useState } from 'react'
import type { FC } from 'react'
import {
  FormHelperText,
  Paper,
  TextField,
  Typography
} from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton'

import styles from './Login.module.scss'

import { USERS_URL } from '../../shared/constants'

interface UserItem {
  name: string
  username: string
  avatar: string
  email: string
  id: string
}

function wrapAsyncFunction<ARGS extends unknown[]> (
  fn: (...args: ARGS) => Promise<unknown>
): (...args: ARGS) => void {
  return (...args) => {
    void fn(...args)
  }
}

const Login: FC = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  React.useEffect(() => {
    if (username.length !== 0) {
      setError('')
    }
  }, [username])

  const isValid = Boolean(username) && Boolean(password)

  const onSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault()
    try {
      setLoading(true)
      const response = await fetch(USERS_URL)
      const userList: UserItem[] = await response.json()

      const foundUser: UserItem | undefined = userList.find(
        (user: UserItem) => user.username === username
      )

      if (foundUser === undefined) {
        setTimeout(() => {
          setLoading(false)
          setError('User not found')
        }, 1000)
      } else {
        setError('')
        console.log('userList: ', userList)
        console.log('username: ', username)
        console.log('password: ', password)
        console.log('auth: ', foundUser)
        setTimeout(() => {
          setLoading(false)
        }, 2500)
      }
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant='h5'>
        Sign In
      </Typography>
      <form onSubmit={wrapAsyncFunction(onSubmit)}>
        <TextField
          className={styles.field}
          label={error.length !== 0 ? 'Error' : 'Username'}
          onChange={(e) => {
            setUsername(e.target.value)
          }}
          value={username}
          fullWidth
          error={Boolean(error)}
        />
        <TextField
          className={styles.field}
          onChange={(e) => {
            setPassword(e.target.value)
          }}
          value={password}
          label='Password'
          type='password'
          fullWidth
        />
        {error.length !== 0 ? <FormHelperText error>{error}</FormHelperText> : <Typography sx={{ paddingTop: '23px' }}></Typography>}
        <LoadingButton
          disabled={!isValid}
          type='submit'
          size='large'
          variant='contained'
          fullWidth
          loading={loading}
        >
          Login
        </LoadingButton>
      </form>
    </Paper>
  )
}

export default Login
