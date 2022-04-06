import React from 'react'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import AddIcon from '@material-ui/icons/Add'
import IconButton from '@material-ui/core/IconButton'
import AddGenre from './AddGenre'

export default function AddGenreDialog (props) {
  const [open, setOpen] = React.useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }
  return (
    <div>
      <IconButton onClick={handleClickOpen}>
        <AddIcon/>
      </IconButton>
      <Dialog
        user={props.user}
        fullWidth={true}
        maxWidth="sm"
        open={open} onClose={handleClose}>
        <DialogTitle id="form-dialog-title">New Genre</DialogTitle>
        <DialogContent user={props.user}>
          <AddGenre handleSubmitClose={handleClose} user={props.user}/>
        </DialogContent>
      </Dialog>
    </div>
  )
}
