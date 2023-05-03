import { type FC } from 'react'
import Backdrop from '@mui/material/Backdrop'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Fade from '@mui/material/Fade'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { Paper, TextField } from '@mui/material'
import { makeStyles } from '@mui/styles'

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

const useStyles = makeStyles(() => ({
  form: {
    margin: '5px 0',
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
}

export const ModalForm: FC<stateModal> = ({ open, setOpen }) => {
  const handleClose = (): void => setOpen(false)
  const styles = useStyles()

  const onSubmit = (e: any): void => {
    console.log(e)
  }

  return (
    <div>
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
              Add contact
            </Typography>
            <form onSubmit={onSubmit} className={styles.form}>
              <TextField
                label="Name"
                helperText={''}
                fullWidth
                required
              />
              <TextField
                label="Phone"
                helperText={''}
                fullWidth
                required
              />
              <Button
                disabled={false}
                type="submit"
                size="large"
                variant="contained"
                fullWidth
              >
                Add
              </Button>
            </form>
          </Paper>
          </Box>
        </Fade>
      </Modal>
    </div>
  )
}
