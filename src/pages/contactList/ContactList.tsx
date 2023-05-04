/* eslint-disable @typescript-eslint/no-floating-promises */
import React, { useEffect, type FC, useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Typography,
  Button,
  type Theme,
  ListItemAvatar
} from '@mui/material'
import { makeStyles } from '@mui/styles'
import {
  Edit as EditIcon,
  Delete as DeleteIcon
} from '@mui/icons-material'

import { type ContactItem } from 'shared'
import { useAppDispatch, useAppSelector } from 'app/hooks'
import { selectContacts, selectContactsStatus } from 'slices/contact/selectors'
import { deleteContact, fetchContacts } from 'slices/contact/slice'
import { ModalForm } from 'features/addForm/AddForm'
import { AvatarBase } from 'widgets/Avatar/AvatarBase'
import { EditForm } from 'features/editForm/EditForm'
import { SearchComponent } from 'features/search/SearchComponent'

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
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [openEditModal, setOpenEditModal] = useState<boolean>(false)
  const [selectedContact, setSelectedContact] = useState<ContactItem | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredList, setFilteredList] = useState(contactsList)

  const handleOpen = (): void => setOpenModal(true)

  useEffect(() => {
    (async () => {
      try {
        await dispatch(fetchContacts())
      } catch (e) {
        console.log(e)
      }
    })()
  }, [])

  useEffect(() => {
    const newList = contactsList.filter((contact) => {
      if (searchTerm === '') {
        return contact
      }
      return (
        contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.phone.toLowerCase().includes(searchTerm.toLowerCase())
      )
    })
    setFilteredList(newList)
  }, [searchTerm, contactsList])

  const handleEdit = async (contact: ContactItem): Promise<void> => {
    setSelectedContact(contact)
    setOpenEditModal(true)
  }

  const handleDelete = (contact: ContactItem): void => {
    dispatch(deleteContact(contact.id))
  }

  return (
    <>
      <EditForm open={openEditModal} setOpen={setOpenEditModal} selectedContact={selectedContact}/>
      <ModalForm open={openModal} setOpen={setOpenModal} />
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label='contacts table'>
          <TableHead>
            <TableRow className={classes.tableHead}>
              <TableCell width={'33%'}>Name</TableCell>
              <TableCell width={'33%'} align='right'>Phone</TableCell>
              <TableCell width={'33%'} align='right'>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell colSpan={2}>
                <Button size='medium' variant='contained'>
                  <Typography onClick={handleOpen} variant='button'>
                    Add contact
                  </Typography>
                </Button>
              </TableCell>
              <TableCell colSpan={1}>
                <SearchComponent searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
              </TableCell>
            </TableRow>
            {(filteredList.length === 0 && searchTerm.length === 0
              ? contactsList
              : filteredList).map((contact) => (
              <TableRow key={contact.id}>
                <TableCell component='th' scope='row' sx={{ display: 'flex' }}>
                  <ListItemAvatar>
                      <AvatarBase />
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
