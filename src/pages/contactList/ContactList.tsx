/* eslint-disable @typescript-eslint/no-floating-promises */
import React, { useEffect, useState } from 'react'
import type { FC } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton
} from '@mui/material'
import type { Theme } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material'
import { useSelector } from 'react-redux'
import { selectIsAuth } from '../../redux/auth/selectors'
import { CONTACT_LIST } from '../../shared'
import { Navigate } from 'react-router-dom'

const useStyles: any = makeStyles((theme: Theme) => ({
  table: {
    minWidth: 650
  }
}))

interface ContactItem {
  name: string
  phone: string
  avatar: string
  id: string
}
// { contacts, onEdit, onDelete }
const ContactsList: FC = () => {
  const classes = useStyles()
  const [selectedContact, setSelectedContact] = useState(null)
  const [contactsList, setContactsList] = useState<ContactItem[]>([])
  const isAuth = useSelector(selectIsAuth)

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(CONTACT_LIST)
        await response.json().then((res) => {
          setContactsList(res)
          return res
        })
      } catch (e) {
        console.log(e)
      }
    })()
  }, [])

  const handleEdit = (contact: any): void => {
    setSelectedContact(contact)
    console.log('selectedContact: ', selectedContact)
    // onEdit(contact)
  }

  const handleDelete = (contact: any): void => {
    setSelectedContact(null)
    // onDelete(contact)
  }

  if (!isAuth) {
    return <Navigate to='/login' />
  }

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="contacts table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Phone</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>

          {contactsList.map((contact) => (
            <TableRow key={contact.id}>
              <TableCell component="th" scope="row">
                {contact.name}
              </TableCell>
              <TableCell align="right">{contact.phone}</TableCell>
              <TableCell align="right">
                <IconButton aria-label="edit" onClick={() => { handleEdit(contact) }}>
                  <EditIcon />
                </IconButton>
                <IconButton aria-label="delete" onClick={() => { handleDelete(contact) }}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default ContactsList
