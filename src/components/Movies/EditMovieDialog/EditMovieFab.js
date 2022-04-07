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
  // const handleSubmitClose = event => {
  //   event.preventDefault()
  //   axios({
  //     method: 'POST',
  //     url: `${apiUrl}/movies`,
  //     headers: {
  //       'Authorization': `Token token=${this.props.user.token}`
  //     },
  //     data: {
  //       movie: {
  //         title: this.props.title,
  //         description: this.props.description,
  //         released: this.props.released,
  //         image: this.props.image,
  //         genre: this.state.genre
  //       }
  //     }
  //   })
  //     .then(response => {
  //       this.props.history.push(`/movies/${response.data.movie._id}`)
  //     })
  //     .then(() => setOpen(false))
  //     .this.handleClose()
  //     .then(() => this.props.history.push('/movies'))
  //     .catch(err => this.setState({ error: err.message }))
  // }
  // <DialogContentText>
  //   To subscribe to this website, please enter your email address here. We will send updates
  //   occasionally.
  // </DialogContentText>
  // "MuiDialog-scrollPaper"
  // "MuiDialog-paperFullWidth"
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
// <AddIcon onClick={handleClickOpen}/>
// <Dialog
//   fullWidth={true}
//   maxWidth="sm"
//   open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
//   <DialogTitle id="form-dialog-title">{props.title}</DialogTitle>
//   <DialogContent>
//     <DialogForm handleSubmitClose={handleClose} user={props.user} saved={props.saved} closeMovieInfo={props.closeMovieInfo} title={props.title} released={props.released} description={props.description} image={props.image} categories={props.categories} runtime={props.runtime} tagline={props.tagline}/>
//   </DialogContent>
// </Dialog>
// <DialogActions>
//   <Button onClick={handleClose} color="primary">
//     Close
//   </Button>
//   <Button onClick={handleClose} color="primary">
//     Submit
//   </Button>
// </DialogActions>
// <SaveMovie user={props.user} saved={props.saved} closeMovieInfo={props.closeMovieInfo} title={props.movieId.title} released={props.currentMovie.release_date} description={props.currentMovie.overview} image={props.currentMovie.poster_path}/>
