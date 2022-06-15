import React, { Component } from 'react'
import DialogForm from './DialogForm'

class AddMovieClass extends Component {
  constructor (props) {
    super(props)
    this.state = {
      open: false,
      currentMovie: null,
      genres: [],
      id: this.props.id,
      directors: []
    }
  }

  componentDidMount (props) {
    this.loadData(this.props.id)
    // console.log('hi')
    // console.log(this.props.id)
    // console.log('this.state.id', this.state.id)
    this.props.getMovieDetails(this.props.id)
    fetch(`https://api.themoviedb.org/3/movie/${this.props.id}?api_key=${process.env.REACT_APP_MY_API_KEY}&language=en-US&append_to_response=credits`)
      .then(data => data.json())
      .then(data => {
        this.setState({ currentMovie: { ...data } })
        this.setState({ genres: data.genres })
        const directors = []
        data.credits.crew.forEach(function (entry) {
          if (entry.job === 'Director') {
            directors.push(entry.name)
          }
        })
        this.setState({ directors: directors })
      })
      .catch(error => {
        console.error(error)
      })
  }
  loadData = (id) => {
    fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_MY_API_KEY}&language=en-US&${id}`)

    // fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=4a0223110b505876ba0985949c17e865&language=en-US`)
      .then(data => data.json())
      .then(data => {
        this.setState({ currentMovie: [...data] })
        // console.log(data)
        // console.log(this.state.currentMovie, 'got movie')
      })
      .catch(error => {
        console.error(error)
      })
  }
  // componentDidMount (props) {
  //   // fetch(`https://api.themoviedb.org/3/movie/${this.props.id}?api_key=4a0223110b505876ba0985949c17e865&language=en-US`)
  //   fetch(`https://api.themoviedb.org/3/movie/${this.props.currentMovie.id}?api_key=4a0223110b505876ba0985949c17e865&language=en-US&${this.props.currentMovie.id}`)
  //     .then(data => data.json())
  //     .then(data => {
  //       this.setState({ currentMovie: { ...data } })
  //       this.setState({ genres: data.genres })
  //       console.log('MovieInfoClass mounted + fetched more info from api')
  //     })
  //     .catch(error => {
  //       console.error(error)
  //     })
  // }
  render () {
    const { handleSubmitClose, user, saved, closeMovieInfo, title, released, description, image } = this.props
    const { currentMovie, directors, genres } = this.state
    if (!this.state.currentMovie) {
      return <div />
    }
    // directors={props.directors} closeMovieInfo={props.closeMovieInfo} title={props.title} released={props.released} description={props.description} image={props.image} categories={props.categories} revenue={props.revenue} budget={props.budget} runtime={props.runtime} tagline={props.tagline}
    return (
      <span>
        <DialogForm handleSubmitClose={handleSubmitClose} revenue={currentMovie.revenue} user={user} genres={genres} directors={directors} saved={saved} closeMovieInfo={closeMovieInfo} title={title} released={released} description={description} image={image} categories={genres} budget={currentMovie.budget} runtime={currentMovie.runtime} tagline={currentMovie.tagline}/>
      </span>
    )
  }
}
export default AddMovieClass

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
// <Tooltip title="Save">
//   <IconButton onClick={handleClickOpen} className='hidden-button floating waves-effect waves-light' color="primary" aria-label="add" >
//     <AddIcon />
//   </IconButton>
// </Tooltip>

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
