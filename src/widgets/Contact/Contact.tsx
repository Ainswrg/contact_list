import { memo, type FC } from 'react'
import { IconButton, ListItemAvatar, TableCell, TableRow } from '@mui/material'
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material'
import { AvatarBase } from 'widgets/Avatar/AvatarBase'
import { type TypeStatus, type ContactItem } from 'shared'
import { useAppDispatch, useAppSelector } from 'app/hooks'
import { deleteContact, selectContactsStatus } from 'slices'

interface Props {
  handleEdit: (e: ContactItem) => void
  contact: ContactItem
}

const Contact: FC<Props> = memo(function Contact ({ contact, handleEdit }) {
  const status: TypeStatus = useAppSelector(selectContactsStatus)
  const dispatch = useAppDispatch()

  const handleDelete = (contact: ContactItem): void => {
    dispatch(deleteContact(contact.id))
  }

  return (
      <TableRow>
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
  )
})

export default Contact
