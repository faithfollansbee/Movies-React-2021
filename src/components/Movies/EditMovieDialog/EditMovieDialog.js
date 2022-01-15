import React from 'react'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import EditIcon from '@material-ui/icons/Edit'
import MenuItem from '@material-ui/core/MenuItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import EditMovieForm from './EditMovieForm'

export default function EditMovieDialog (props) {
  const [open, setOpen] = React.useState(false)

  const handleClickOpen = () => {
    setOpen(true)
    console.log('EditGenreDialog handleClickOpen()')
    // console.log(props.movie)
  }

  const handleClose = () => {
    setOpen(false)
    props.onMenuClose()
    console.log('EditGenreDialog handleClose()')
  }
  // console.log(props.movie)
  return (
    <div>
      <MenuItem onClick={handleClickOpen}>
        <ListItemIcon>
          <EditIcon className="material-icons right" />
        </ListItemIcon>
        Edit
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
        <DialogTitle id="form-dialog-title">Edit &quot;{props.title}&quot;</DialogTitle>
        <DialogContent user={props.user}>
          <EditMovieForm user={props.user} movie={props.movie} id={props.id} title={props.title} genre={props.genre} released={props.released} description={props.description} image={props.image} handleSubmitClose={handleClose}/>
        </DialogContent>
      </Dialog>
    </div>
  )
}
// <EditMovie user={props.user} movie={props.movie} id={props.id} title={props.title} genre={props.genre} released={props.released} description={props.description} image={props.image} handleSubmitClose={handleClose}/>

// handleChange={this.handleChange}
// handleSubmit={this.handleSubmit}
// <EditMovieForm user={props.user} id={props.id} title={props.title} genre={props.genre} released={props.released} description={props.description} image={props.image} handleSubmitClose={handleClose}/>
// <EditMovie genre={props.genre} id={props.id} handleSubmitClose={handleClose} user={props.user}/>
// <GenreDialogForm handleSubmit={props.handleSubmit} handleChange={props.handleChange} handleSubmitClose={handleClose} user={props.user} closeMovieInfo={props.closeMovieInfo} />
// <GenreForm handleSubmitClose={handleClose} saved={props.saved} user={props.user} />
