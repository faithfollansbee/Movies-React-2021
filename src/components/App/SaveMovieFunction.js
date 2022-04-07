import React from 'react'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import AddIcon from '@material-ui/icons/Add'
import DialogForm from './DialogForm'
import Tooltip from '@material-ui/core/Tooltip'
import Fab from '@material-ui/core/Fab'

const dialogStyle = {
}
const fabStyle = {
}
export default function SaveMovieFunction (props) {
  const [open, setOpen] = React.useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <span style={dialogStyle}>
      <Tooltip title="Add">
        <Fab style={fabStyle} size="small" onClick={handleClickOpen} className='hidden-button floating waves-effect waves-light' color="primary" aria-label="add" >
          <AddIcon fontSize="small" />
        </Fab>
      </Tooltip>
      <Dialog
        fullWidth={true}
        maxWidth="sm"
        open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">{props.title}</DialogTitle>
        <DialogContent>
          <DialogForm handleSubmitClose={handleClose} user={props.user} saved={props.saved} closeMovieInfo={props.closeMovieInfo} title={props.title} released={props.released} description={props.description} image={props.image} categories={props.categories} revenue={props.revenue} budget={props.budget} runtime={props.runtime} tagline={props.tagline}/>
        </DialogContent>
      </Dialog>
    </span>
  )
}
