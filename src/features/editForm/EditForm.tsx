/* eslint-disable @typescript-eslint/no-unused-vars */
import { type FormEvent, type FC, useState, useEffect } from 'react'
import Backdrop from '@mui/material/Backdrop'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Fade from '@mui/material/Fade'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { FormHelperText, Paper, TextField, type Theme } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { useAppDispatch, useAppSelector } from 'app/hooks'
import { selectContactsStatus } from 'slices/contact/selectors'
import { editContact } from 'slices/contact/slice'
import { type ContactItem, wrapAsyncFunction } from 'shared'

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4
}

const useStyles = makeStyles((theme: Theme) => ({
  form: {
    margin: '30px 0 10px',
    display: 'flex',
    flexDirection: 'column',
    rowGap: '10px'
  },
  avatar: {
    display: 'flex',
    justifyContent: 'center'
  }
}))

interface stateModal {
  open: boolean
  setOpen: (v: boolean) => void
  selectedContact: ContactItem | null
}

export const EditForm: FC<stateModal> = ({ open, setOpen, selectedContact }) => {
  const dispatch = useAppDispatch()

  const handleClose = (): void => setOpen(false)
  const styles = useStyles()
  const status = useAppSelector(selectContactsStatus)

  const [name, setName] = useState<string>('')
  const [phone, setPhone] = useState<string>('')

  useEffect(() => {
    if (selectedContact !== null) {
      setName(selectedContact.name)
      setPhone(selectedContact.phone)
    }
  }, [selectedContact])

  const onSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()

    if (selectedContact !== null) {
      await dispatch(editContact({ ...selectedContact, name, phone }))
    }
  }

  return (
    <>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500
          }
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
          <Paper>
            <Typography variant="h5" textAlign={'center'}>
              Edit contact
            </Typography>
            <form onSubmit={wrapAsyncFunction(onSubmit)} className={styles.form}>
              <TextField
                label="Name"
                name='name'
                helperText={''}
                fullWidth
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <TextField
                label="Phone"
                name='phone'
                helperText={''}
                fullWidth
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              { status === 'failed'
                ? <FormHelperText
                    sx={{ display: 'flex', justifyContent: 'center' }}
                    error
                  >
                    {'Error'}
                  </FormHelperText>
                : <Typography sx={{ paddingTop: '23px' }}></Typography>
              }
              <Button
                disabled={status === 'loading'}
                type="submit"
                size="large"
                variant="contained"
                fullWidth
                onClick={handleClose}
              >
                Edit
              </Button>
            </form>
          </Paper>
          </Box>
        </Fade>
      </Modal>
    </>
  )
}
