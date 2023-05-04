/* eslint-disable react/display-name */
import React, { useMemo, useState } from 'react'
import type { FC } from 'react'
import { FormHelperText, Paper, TextField, Typography } from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton'

import styles from './Login.module.scss'

import { wrapAsyncFunction } from 'shared'
import { useAppDispatch, useAppSelector } from 'app/hooks'
import { login } from 'slices/auth/slice'
import { fetchUsers } from 'slices/user/slice'
import { selectUserStatus } from 'slices/user/selectors'

const Login: FC = React.memo(() => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useAppDispatch()
  const status = useAppSelector(selectUserStatus)

  const isValid = useMemo(
    () => Boolean(username) && Boolean(password),
    [username, password]
  )

  const onSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault()
    try {
      const isUserFound = await dispatch(fetchUsers(username)).unwrap()

      if (isUserFound.length !== 0) {
        dispatch(login())
      }
    } catch (err) {}
  }

  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant='h5'>
        Sign In
      </Typography>
      <form onSubmit={wrapAsyncFunction(onSubmit)}>
        <TextField
          className={styles.field}
          label={status === 'failed' ? 'Error' : 'Username'}
          onChange={(e) => {
            setUsername(e.target.value)
          }}
          value={username}
          fullWidth
          error={status === 'failed'}
        />
        <TextField
          className={styles.field}
          onChange={(e) => {
            setPassword(e.target.value)
          }}
          value={password}
          label='Password'
          type='password'
          error={status === 'failed'}
          fullWidth
        />
        {status === 'failed'
          ? (
          <FormHelperText
            sx={{ display: 'flex', justifyContent: 'center' }}
            error
          >
            {'The user or password id incorrect'}
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
          loading={status === 'loading'}
        >
          Login
        </LoadingButton>
      </form>
    </Paper>
  )
})

export default Login
