import React, { Fragment } from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import apiUrl from '../../apiConfig'
import Typography from '@material-ui/core/Typography'
import MaterializeMovieClass from '../Movies/MaterializeMovieClass'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import ArrowBack from '@material-ui/icons/ArrowBack'
import EditGenreMenu from './EditGenre/EditGenreMenu'
import CardHeader from '@material-ui/core/CardHeader'

class Genre extends React.Component {
  state = {
    genre: '',
    deleted: false,
    movies: [],
    filtered: false,
    addingMovie: false
  }
  // static propTypes = {
  //   match: PropTypes.object.isRequired,
  //   location: PropTypes.object.isRequired,
  //   history: PropTypes.object.isRequired
  // };

  handleRefresh = async () => {
    const response = await axios(`${apiUrl}/genres/${this.props.match.params.id}`)
    this.setState({
      genre: response.data.genre
    })
  }
  // async componentDidMount () {
  //   const response = await axios(`${apiUrl}/cookbooks/${this.props.match.params.id}`)
  //   this.setState({
  //     cookbook: response.data.cookbook
  //   })
  // }
  async componentDidMount () {
    try {
      const response = await axios({
        url: `${apiUrl}/genres/${this.props.match.params.id}`,
        method: 'GET',
        headers: {
          'Authorization': `Token token=${this.props.user.token}`
        }
      })
      this.setState({ genre: response.data.genre })
      this.setState({ movies: response.data.genre.movies })
    } catch (error) {
    }
  }

  handleFilter = event => {
    event.preventDefault()
    this.setState({ filtered: !this.state.filtered })
  }

  handleChange = event => {
    const searchString = event.target.value.toLowerCase()
    const queryLength = searchString.length
    const prevQueryLength = this.state.queryLength || 0
    const movies = queryLength > prevQueryLength ? this.state.userMovies : this.state.movies
    const searchResults = movies.filter(movie => movie.name.toLowerCase().includes(searchString))
    this.setState({ userMovies: searchResults, queryLength: queryLength })
  }

  handleSubmit = event => {
    event.preventDefault()
    axios({
      method: 'POST',
      url: `${apiUrl}/movies`,
      headers: {
        'Authorization': `Token token=${this.props.user.token}`
      },
      data: {
        movie: {
          title: this.state.movie.name,
          description: this.state.movie.description,
          released: this.state.movie.released,
          image: this.state.movie.image,
          genre: this.props.match.params.id,
          owner: this.props.user._id
        }
      }
    })
      .then(response => {
        this.props.history.push(`/genres/${this.props.match.params.id}/`)
        this.props.alert({
          heading: 'Success',
          message: 'You created a movie'
        })
      })
      .catch(() => {
        this.props.alert({
          heading: 'Failed',
          message: 'Did not create'
        })
      })
      .catch(err => this.setState({ error: err.message }))
  }

  handleDelete = () => {
    event.preventDefault()
    axios.delete(`${apiUrl}/genres/${this.props.match.params.id}`,
      {
        headers: {
          'Authorization': `Bearer ${this.props.user.token}`
        },
        data: {
          genre: this.state.genre
        }
      })
      .then(() => this.setState({ deleted: true }))
      .then(response => {
        this.props.history.goBack()
      })
  }
  editGenre = () => {
    console.log('edit eventually')
  }

  render () {
    const { genre, addMovie } = this.state
    if (genre) {
      // console.log(genre.movies[0].released.substring(5).split('-').concat(genre.movies[0].released.substring(0, 4)).join('/'))
      // console.log(genre.updatedAt.split('T', 1)[0])
      // console.log(genre.updatedAt.substring(0, genre.updatedAt.indexOf('T')))
      // const deletebutton = (
      //   <Fragment>
      //     <IconButton onClick={this.handleDelete} aria-label="Delete">
      //       <DeleteIcon />
      //     </IconButton>
      //   </Fragment>
      // )
      let updateMovieButton
      if (addMovie) {
        updateMovieButton = (
          <Fragment>
            <Button className="updateMovieButton" variant="outlined" onClick={this.handleUpdate}>edit movie</Button>
          </Fragment>
        )
      }

      let moviesStatus

      if (!this.state.genre.movies.length) {
        moviesStatus = (
          <div className="nomovies">No movies added yet. get started! </div>
        )
      }
      return (
        <div className="layout-style my-5">
          { genre && (
            <div>
              <Card className="card-style" variant="outlined">
                <CardContent>
                  <div>
                    <CardHeader
                      // variant="h5"
                      // component="h3"
                      // subheader={movie.released.substring(5).split('-').concat(movie.released.substring(0, 4)).join('/')}
                      // subheader={genre.updatedAt.substring(5).split('-').concat(genre.updatedAt.substring(0, 4)).join('/')}
                      action={
                        <EditGenreMenu id={this.state.genre._id} genre={this.state.genre} user={this.props.user} deleteGenre={this.handleDelete} />
                      }
                      title={genre.name}
                      // subheader={`last updated: ${genre.updatedAt.split('T').shift()}`}
                    />
                    { /* {genre.updatedAt.split('T')[0]}
                    {genre.updatedAt.split('T', 1)[0]} */ }
                  </div>
                  <div className="row">
                    { /* className="row mx-lg-n5" */}
                    {this.state.genre.movies.map(movie => (
                      <MaterializeMovieClass
                        key={movie.name + movie._id}
                        handleRefresh={this.handleRefresh}
                        user={this.props.user}
                        title={movie.title}
                        id={movie._id}
                        description={movie.description}
                        released={movie.released}
                        image={movie.image}
                        thisstate={this.state}
                        alert={this.props.alert}
                        genre={this.genre}
                      />
                    ))}
                  </div>
                  {moviesStatus}
                  {updateMovieButton}
                </CardContent>
                <CardActions>
                </CardActions>
              </Card>
            </div>
          )}
          <Typography><i>Displaying x out of {this.state.movies.length} movies</i></Typography>
          <Tooltip title="back">
            <IconButton onClick={this.props.history.goBack} aria-label="BACK">
              <ArrowBack />
            </IconButton>
          </Tooltip>
          <Tooltip title="back">
            <Button onClick={this.props.history.goBack} startIcon={<ArrowBack />}>BACK</Button>
          </Tooltip>
        </div>
      )
    }
    return (
      <p>no movie found</p>
    )
  }
}
// {(this.props.user && genre) && this.props.user._id === genre.owner
//   ? deletebutton
//   : ''
// }
// <Paper elevation={1}/>
// { genre && (
//   <Fragment>
//     <div>
//       <h1 className="title-style">{genre.name}</h1>
//       <Typography><i>Last updated at {genre.updatedAt}</i></Typography>
//       <Typography><i>Movies in this genre: {this.state.movies.length}</i></Typography>
//     </div>
//     <div className="row mx-lg-n5">
//       {this.state.genre.movies.map(movie => (
//         <Movie2
//           key={movie.name + movie._id}
//           handleRefresh={this.handleRefresh}
//           user={this.props.user}
//           id={movie._id}
//           description={movie.description}
//           released={movie.released}
//           image={movie.image}
//           thisstate={this.state}
//           alert={this.props.alert}
//           genre={this.genre}
//         />
//       ))}
//     </div>
//     {moviesStatus}
//     {updateMovieButton}
//     <Row className="row-style">
//       <Button
//         variant="outlined"
//         href={`#genres/${genre._id}/edit`}>Edit</Button>
//       <Button
//         variant="outlined"
//         href={'#genres/'}>Back to genres</Button>
//       {(this.props.user && genre) && this.props.user._id === genre.owner
//         ? deletebutton
//         : ''
//       }
//     </Row>
//   </Fragment>
// )}

export default withRouter(Genre)
