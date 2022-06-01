import React from 'react'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import DeleteIcon from '@material-ui/icons/Delete'
import Tooltip from '@material-ui/core/Tooltip'
import Fab from '@material-ui/core/Fab'
import Button from '@material-ui/core/Button'

export default function DeleteMovieFab (props) {
  const [open, setOpen] = React.useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <div>
      <Tooltip title="Delete">
        <Fab size="small" onClick={handleClickOpen} className='hidden-button floating waves-effect waves-light' color="primary" aria-label="delete">
          <DeleteIcon fontSize="small" className="material-icons right"/>
        </Fab>
      </Tooltip>
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
          <Button onClick={props.deleteMovie} color="primary" type="delete">
              Delete
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  )
}
