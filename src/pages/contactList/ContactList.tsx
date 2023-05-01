/* eslint-disable @typescript-eslint/no-floating-promises */
import React, { useEffect, useState, type FC, type ChangeEvent } from 'react'
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

import { CONTACT_LIST, type ContactItem } from 'shared'
import { Search, SearchIconWrapper, StyledInputBase } from './styled'

const useStyles = makeStyles((theme: Theme) => ({
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
