import React, { useEffect, type FC, useState, useMemo, memo } from 'react'
import qs from 'qs'
import { useNavigate } from 'react-router-dom'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Button,
  type Theme
} from '@mui/material'
import { makeStyles } from '@mui/styles'

import { type ContactItem } from 'shared'
import { useAppSelector } from 'app/hooks'
import { ModalForm, Sort, SearchComponent, EditForm } from 'features'
import { selectContacts, selectFilters } from 'slices'
import Contact from 'widgets/Contact/Contact'

const useStyles = makeStyles((theme: Theme) => ({
  tableHead: {
    backgroundColor: 'lightGray'
  },
  table: {
    minWidth: 650
  }
}))

const ContactsList: FC = memo(function ContactsList () {
  const contactsList = useAppSelector(selectContacts)
  const classes = useStyles()
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [openEditModal, setOpenEditModal] = useState<boolean>(false)
  const [selectedContact, setSelectedContact] = useState<ContactItem | null>(null)
  const { searchValue, orderSort } = useAppSelector(selectFilters)
  const navigate = useNavigate()

  const memoizedParams = useMemo(() => ({ sortBy: 'name', order: orderSort, search: searchValue }), [searchValue, orderSort])
  const memoizedContacts = useMemo(() => contactsList, [contactsList])

  const handleOpen = (): void => setOpenModal(true)

  useEffect(() => {
    const queryString = qs.stringify(memoizedParams, { skipNulls: true, addQueryPrefix: true })
    navigate(queryString)
  }, [])

  const handleEdit = (contact: ContactItem): void => {
    setSelectedContact(contact)
    setOpenEditModal(true)
  }
  return (
    <>
      <EditForm open={openEditModal} setOpen={setOpenEditModal} selectedContact={selectedContact}/>
      <ModalForm open={openModal} setOpen={setOpenModal} />
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label='contacts table'>
          <TableHead>
            <TableRow className={classes.tableHead}>
              <TableCell colSpan={1}>Name</TableCell>
              <TableCell colSpan={1} align='right'>Phone</TableCell>
              <TableCell colSpan={1} align='right'>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell colSpan={1}>
                <Button size='medium' variant='contained'>
                  <Typography onClick={handleOpen} variant='button'>
                    Add contact
                  </Typography>
                </Button>
              </TableCell>
              <TableCell colSpan={1}>
                <SearchComponent />
              </TableCell>
              <TableCell colSpan={1}>
                <Sort />
              </TableCell>
            </TableRow>
            {memoizedContacts.map((contact) => (
              <Contact key={contact.id} contact={contact} handleEdit={handleEdit} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
})

export default ContactsList
