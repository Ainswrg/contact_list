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
  Button
} from '@mui/material'
import type { Theme } from '@mui/material'
import { makeStyles } from '@mui/styles'
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Logout as LogoutIcon,
  Search as SearchIcon
} from '@mui/icons-material'
import { logout } from 'slices/auth/slice'
import type { ContactItem } from 'shared'
import { CONTACT_LIST } from 'shared'
import { useAppDispatch } from 'app/hooks'
import { Search, SearchIconWrapper, StyledInputBase } from './styled'

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

const ContactsList: FC = () => {
  const [selectedContact, setSelectedContact] = useState<ContactItem | null>(
    null
  )
  const [contactsList, setContactsList] = useState<ContactItem[]>([])
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
