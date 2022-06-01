import React from 'react'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import EditIcon from '@material-ui/icons/Edit'
import EditMovieForm from './EditMovieForm'
import Tooltip from '@material-ui/core/Tooltip'
import Fab from '@material-ui/core/Fab'

export default function EditMovieFab (props) {
  const [open, setOpen] = React.useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <div>
      <Tooltip title="Edit">
        <Fab size="small" onClick={handleClickOpen} className='hidden-button floating waves-effect waves-light' color="primary" aria-label="edit">
          <EditIcon fontSize="small" className="material-icons right"/>
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
        <DialogTitle id="form-dialog-title">Edit &quot;{props.title}&quot;</DialogTitle>
        <DialogContent user={props.user}>
          <EditMovieForm user={props.user} movie={props.movie} id={props.id} title={props.title} genre={props.genre} released={props.released} description={props.description} image={props.image} handleSubmitClose={handleClose} saved={props.saved} closeMovieInfo={props.closeMovieInfo} categories={props.categories} runtime={props.runtime} tagline={props.tagline}/>
        </DialogContent>
      </Dialog>
    </div>
  )
}
