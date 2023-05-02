/* eslint-disable @typescript-eslint/no-floating-promises */
import React, { useEffect, type FC, type ChangeEvent } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  ListItemAvatar,
  Avatar,
  Typography,
  Button,
  type Theme
} from '@mui/material'
import { makeStyles } from '@mui/styles'
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Search as SearchIcon
} from '@mui/icons-material'

import { type ContactItem } from 'shared'
import { Search, SearchIconWrapper, StyledInputBase } from './styled'
import { useAppDispatch, useAppSelector } from 'app/hooks'
import { selectContacts, selectContactsStatus } from 'slices/contact/selectors'
import { deleteContact, fetchContacts } from 'slices/contact/slice'

const useStyles = makeStyles((theme: Theme) => ({
  tableHead: {
    backgroundColor: 'lightGray'
  },
  table: {
    minWidth: 650
  }
}))

const ContactsList: FC = () => {
  const dispatch = useAppDispatch()
  const contactsList = useAppSelector(selectContacts)
  const status = useAppSelector(selectContactsStatus)
  const classes = useStyles()

  useEffect(() => {
    (async () => {
      try {
        await dispatch(fetchContacts())
      } catch (e) {
        console.log(e)
      }
    })()
  }, [])

  const handleEdit = (contact: ContactItem): void => {
    console.log('selectedContact: ', contact)
  }
  const handleDelete = (contact: ContactItem): void => {
    dispatch(deleteContact(contact.id))
  }

  const handleSearch = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>): void => {
    console.log(e.target.value)
  }

  return (
    <>
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
                    disabled={status === 'loading'}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    aria-label='delete'
                    onClick={() => {
                      handleDelete(contact)
                    }}
                    disabled={status === 'loading'}
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
