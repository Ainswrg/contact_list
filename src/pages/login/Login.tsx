/* eslint-disable react/display-name */
import React, { useMemo, useState } from 'react'
import type { FC } from 'react'
import { FormHelperText, Paper, TextField, Typography } from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton'

import styles from './Login.module.scss'

import { wrapAsyncFunction, USERS_URL } from '../../shared'
import { Navigate } from 'react-router-dom'
import { useAppDispatch } from '../../app/hooks'
import { login } from '../../redux/auth/slice'
import { selectIsAuth } from '../../redux/auth/selectors'
import { useSelector } from 'react-redux'

interface UserItem {
  name: string
  username: string
  avatar: string
  email: string
  id: string
}

const Login: FC = React.memo(() => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const isAuth = useSelector(selectIsAuth)
  const dispatch = useAppDispatch()

  React.useEffect(() => {
    if (username.length !== 0) {
      setError('')
    }
  }, [username, isAuth])

  const isValid = useMemo(
    () => Boolean(username) && Boolean(password),
    [username, password]
  )

  const onSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault()
    try {
      setIsLoading(true)
      const response = await fetch(USERS_URL)
      const userList: UserItem[] = await response.json()

      const foundUser: UserItem | undefined = userList.find(
        (user: UserItem) => user.username === username
      )

      if (foundUser === undefined) {
        setError('User not found')
      } else {
        setError('')
        dispatch(login())
      }
      setIsLoading(false)
    } catch (e) {
      console.log(e)
    }
  }

  if (isAuth) {
    return <Navigate to='/' />
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
        {error.length !== 0
          ? (
          <FormHelperText
            sx={{ display: 'flex', justifyContent: 'center' }}
            error
          >
            {error}
          </FormHelperText>
            )
          : (
          <Typography sx={{ paddingTop: '23px' }}></Typography>
            )}
        <LoadingButton
          disabled={!isValid}
          type='submit'
          size='large'
          variant='contained'
          fullWidth
          loading={isLoading}
        >
          Login
        </LoadingButton>
      </form>
    </Paper>
  )
})

export default Login
