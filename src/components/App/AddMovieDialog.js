import React from 'react'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import AddIcon from '@material-ui/icons/Add'

import DialogForm from './DialogForm'

export default function AddMovieDialog (props) {
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
      <AddIcon onClick={handleClickOpen}/>
      <Dialog
        fullWidth="true"
        maxWidth="sm"
        open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">{props.title}</DialogTitle>
        <DialogContent>
          <DialogForm handleSubmitClose={handleClose} user={props.user} saved={props.saved} closeMovieInfo={props.closeMovieInfo} title={props.title} released={props.released} description={props.description} image={props.image}/>
        </DialogContent>
      </Dialog>
    </div>
  )
}
// <DialogActions>
//   <Button onClick={handleClose} color="primary">
//     Close
//   </Button>
//   <Button onClick={handleClose} color="primary">
//     Submit
//   </Button>
// </DialogActions>
// <SaveMovie user={props.user} saved={props.saved} closeMovieInfo={props.closeMovieInfo} title={props.movieId.title} released={props.currentMovie.release_date} description={props.currentMovie.overview} image={props.currentMovie.poster_path}/>
