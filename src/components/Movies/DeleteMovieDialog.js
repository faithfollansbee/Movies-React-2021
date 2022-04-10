import React from 'react'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import DeleteIcon from '@material-ui/icons/Delete'
import MenuItem from '@material-ui/core/MenuItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
// import EditMovieForm from './EditMovieForm'
import DialogActions from '@material-ui/core/DialogActions'
import Button from '@material-ui/core/Button'

export default function DeleteMovieDialog (props) {
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
          <Button color="primary" onClick={handleClose}>No</Button>
          <Button onClick={props.deleteMovie} color="primary" type="delete">
              Delete
          </Button>
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={handleClose}>No</Button>
          <Button onClick={props.deleteMovie} color="primary" type="delete">
              Delete
          </Button>
        </DialogActions>
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
