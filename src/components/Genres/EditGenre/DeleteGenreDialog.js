import React from 'react'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import DeleteIcon from '@material-ui/icons/Delete'
import MenuItem from '@material-ui/core/MenuItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import Button from '@material-ui/core/Button'

export default function DeleteGenreDialog (props) {
  const [open, setOpen] = React.useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
    props.onMenuClose()
  }
  return (
    <div>
      <MenuItem onClick={handleClickOpen}>
        <ListItemIcon>
          <DeleteIcon className="material-icons right"/>
        </ListItemIcon>
        Delete
      </MenuItem>
      <Dialog
        user={props.user}
        movie={props.movie}
        title={props.title}
        genre={props.genre}
        id={props.id}
        fullWidth={true}
        maxWidth="sm"
        open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Sure you want to delete?</DialogTitle>
        <DialogContent>
          <Button color="primary" onClick={handleClose}>Cancel</Button>
          <Button onClick={props.deleteGenre} color="primary" type="delete">
              Delete
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  )
}
