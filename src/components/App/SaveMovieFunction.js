import React from 'react'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import AddIcon from '@material-ui/icons/Add'
import DialogForm from './DialogForm'
import Tooltip from '@material-ui/core/Tooltip'
import IconButton from '@material-ui/core/IconButton'

const dialogStyle = {
}
// button border:
// #919091
// #9d9a9b

// button icon: #ffffffffffff,

// text on black: #e5e5e5,

const buttonStyle = {
  border: '2px solid #9d9a9b',
  // backgroundColor: 'grey',
  borderRadius: '50%',
  padding: '10px',
  color: '#9d9a9b'
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
        <IconButton style={buttonStyle} onClick={handleClickOpen} aria-label="save movie">
          <AddIcon fontSize="small" />
        </IconButton>
      </Tooltip>
      <Dialog
        fullWidth={true}
        maxWidth="sm"
        open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">{props.title}</DialogTitle>
        <DialogContent>
          <DialogForm handleSubmitClose={handleClose} user={props.user} saved={props.saved} directors={props.directors} closeMovieInfo={props.closeMovieInfo} title={props.title} released={props.released} description={props.description} image={props.image} categories={props.categories} revenue={props.revenue} budget={props.budget} runtime={props.runtime} tagline={props.tagline}/>
        </DialogContent>
      </Dialog>
    </span>
  )
}
