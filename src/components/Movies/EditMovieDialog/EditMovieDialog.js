import React from 'react'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import EditIcon from '@material-ui/icons/Edit'
import MenuItem from '@material-ui/core/MenuItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'

// import IconButton from '@material-ui/core/IconButton'
// import GenreForm from './GenreForm'
// import AddGenre from './AddGenre'
import EditMovie from './EditMovie'
// import MenuItem from '@material-ui/core/MenuItem'

// import GenreDialogForm from './GenreDialogForm'

export default function EditMovieDialog (props) {
  const [open, setOpen] = React.useState(false)

  const handleClickOpen = () => {
    setOpen(true)
    console.log('EditGenreDialog handleClickOpen()')
    // console.log(props.user)
    // console.log(props.genre)
    // console.log(props.id)
  }

  const handleClose = () => {
    setOpen(false)
    props.onMenuClose()
    console.log('EditGenreDialog handleClose()')
  }
  // console.log('props.user', props.user)
  return (
    <div>
      <MenuItem onClick={handleClickOpen}>
        <ListItemIcon>
          <EditIcon />
        </ListItemIcon>
        Edit
      </MenuItem>
      <Dialog
        user={props.user}
        genre={props.genre}
        id={props.id}
        fullWidth="true"
        maxWidth="sm"
        open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Edit &quot;{props.genre.name}&quot;</DialogTitle>
        <DialogContent user={props.user}>
          <EditGenre genre={props.genre} id={props.id} handleSubmitClose={handleClose} user={props.user}/>
        </DialogContent>
      </Dialog>
    </div>
  )
}
// <GenreDialogForm handleSubmit={props.handleSubmit} handleChange={props.handleChange} handleSubmitClose={handleClose} user={props.user} closeMovieInfo={props.closeMovieInfo} />
// <GenreForm handleSubmitClose={handleClose} saved={props.saved} user={props.user} />
