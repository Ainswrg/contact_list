import { type FC } from 'react'
import { IconButton, Toolbar, Typography, type Theme } from '@mui/material'
import {
  Logout as LogoutIcon
} from '@mui/icons-material'
import { makeStyles } from '@mui/styles'
import { logout } from 'slices/auth/slice'
import { useAppDispatch } from 'app/hooks'

const useStyles = makeStyles((theme: Theme) => ({
  toolbar: {
    backgroundColor: '#400CCC',
    display: 'flex',
    justifyContent: 'flex-end'
  }
}))

export const Header: FC = () => {
  const classes = useStyles()
  const dispatch = useAppDispatch()
  const user = localStorage.getItem('username')

  const handleLogout = (): void => {
    dispatch(logout())
  }

  return (
    <Toolbar className={classes.toolbar}>
      <Typography>{user}</Typography>
      <IconButton
        aria-label='logout'
        onClick={() => {
          handleLogout()
        }}
      >
        <LogoutIcon />
      </IconButton>
    </Toolbar>
  )
}
