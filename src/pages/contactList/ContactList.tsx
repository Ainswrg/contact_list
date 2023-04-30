/* eslint-disable @typescript-eslint/no-floating-promises */
import React, { useEffect, useState } from 'react'
import type { FC, ChangeEvent } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Toolbar,
  ListItemAvatar,
  Avatar,
  Typography,
  Button,
  InputBase
} from '@mui/material'
import { styled, alpha } from '@mui/material/styles'
import type { Theme } from '@mui/material'
import { makeStyles } from '@mui/styles'
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Logout as LogoutIcon,
  Search as SearchIcon
} from '@mui/icons-material'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { selectIsAuth } from '../../slices/auth/selectors'
import { logout } from '../../slices/auth/slice'
import { CONTACT_LIST } from '../../shared'
import { useAppDispatch } from '../../app/hooks'

const useStyles: any = makeStyles((theme: Theme) => ({
  toolbar: {
    backgroundColor: '#400CCC',
    display: 'flex',
    justifyContent: 'flex-end'
  },
  tableHead: {
    backgroundColor: 'lightGray'
  },
  table: {
    minWidth: 650
  }
}))

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.black, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25)
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto'
  }
}))

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}))

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch'
    }
  }
}))

interface ContactItem {
  name: string
  phone: string
  avatar: string
  id: string
}

const ContactsList: FC = () => {
  const [selectedContact, setSelectedContact] = useState<ContactItem | null>(
    null
  )
  const [contactsList, setContactsList] = useState<ContactItem[]>([])
  const isAuth = useSelector(selectIsAuth)
  const dispatch = useAppDispatch()

  const classes = useStyles()

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(CONTACT_LIST)
        const res = await response.json()
        setContactsList(res)
      } catch (e) {
        console.log(e)
      }
    })()
  }, [])

  const handleEdit = (contact: ContactItem): void => {
    setSelectedContact(contact)
    console.log('selectedContact: ', selectedContact)
    // onEdit(contact)
  }

  const handleDelete = (contact: ContactItem): void => {
    setSelectedContact(null)
    // onDelete(contact)
  }

  const handleLogout = (): void => {
    dispatch(logout())
  }

  const handleSearch = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>): void => {
    console.log(e.target.value)
  }

  if (!isAuth) {
    return <Navigate to='/login' />
  }

  return (
    <>
      <Toolbar className={classes.toolbar}>
        <Typography>Logout</Typography>
        <IconButton
          aria-label='logout'
          onClick={() => {
            handleLogout()
          }}
        >
          <LogoutIcon />
        </IconButton>
      </Toolbar>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label='contacts table'>
          <TableHead>
            <TableRow className={classes.tableHead}>
              <TableCell>Name</TableCell>
              <TableCell align='right'>Phone</TableCell>
              <TableCell align='right'>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell colSpan={2}>
                <Button size='medium' variant='contained'>
                  <Typography variant='button'>Add contact</Typography>
                </Button>
              </TableCell>
              <TableCell colSpan={1}>
                <Search>
                  <SearchIconWrapper>
                    <SearchIcon />
                  </SearchIconWrapper>
                  <StyledInputBase
                    placeholder="Search…"
                    inputProps={{ 'aria-label': 'search' }}
                    onChange={(e) => { handleSearch(e) }}
                  />
                </Search>
              </TableCell>
            </TableRow>
            {contactsList.map((contact) => (
              <TableRow key={contact.id}>
                <TableCell component='th' scope='row' sx={{ display: 'flex' }}>
                  <ListItemAvatar>
                    <Avatar
                      variant='square'
                      alt='Remy Sharp'
                      src={contact.avatar}
                    />
                  </ListItemAvatar>
                  {contact.name}
                </TableCell>
                <TableCell align='right'>{contact.phone}</TableCell>
                <TableCell align='right'>
                  <IconButton
                    aria-label='edit'
                    onClick={() => {
                      handleEdit(contact)
                    }}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    aria-label='delete'
                    onClick={() => {
                      handleDelete(contact)
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default ContactsList
