import React, { Fragment } from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
// import Container from '@material-ui/core/Container'
import Button from '@material-ui/core/Button'
// import { makeStyles } from '@material-ui/core/styles'
import apiUrl from '../../apiConfig'
// import Card from '@material-ui/core/Card'
// import CardActions from '@material-ui/core/CardActions'
// import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import Row from 'react-bootstrap/Row'
// import CardHeader from '@material-ui/core/CardHeader'
// import Collapse from '@material-ui/core/Collapse'
// import IconButton from '@material-ui/core/IconButton'
// import EditIcon from '@material-ui/icons/Edit'
import Movie2 from '../Movies/Movie2'
// import FavoriteIcon from '@material-ui/icons/Favorite'
// import ShareIcon from '@material-ui/icons/Share'
// import MoreVertIcon from '@material-ui/icons/MoreVert'

class Genre extends React.Component {
  state = {
    genre: '',
    deleted: false,
    movies: null,
    // userRecipes: [],
    filtered: false,
    addingMovie: false
  }

  handleRefresh = async () => {
    const response = await axios(`${apiUrl}/genres/${this.props.match.params.id}`)
    this.setState({
      genre: response.data.genre
    })
  }
  // async componentDidMount () {
  //   const response = await axios(`${apiUrl}/cookbooks/${this.props.match.params.id}`)
  //
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
      console.log('Got to one genre')
      this.setState({ genre: response.data.genre })
      this.setState({ movies: response.data.genre.movies })
      // this.setState({ userRecipes: response.data.cookbook.recipes })
      // console.log(this.state.genre)
      // console.log(this.state.genre.movies)
      // console.log(this.state.movies)
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
          // name: this.state.movie.name,
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
        // console.log(this.state.movie)
      })
      // .then(response => {
      //   this.props.history.push(`/recipes/${this.state.recipe._id}`)
      // })
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
      .then(() => this.props.history.push('/genres'))
  }

  render () {
    const { genre, addMovie } = this.state
    if (genre) {
      const deletebutton = (
        <Fragment>
          <Button
            variant="outlined" onClick={this.handleDelete}>Delete The Genre</Button>
        </Fragment>
      )
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
        console.log('there are no movies here')
        moviesStatus = (
          <div className="nomovies">No movies added yet. get started! </div>
        )
      }

      // const recipesJSX = cookbook.recipes.map(recipe => (
      //   <Card key={recipe._id} className="card-style" maxWidth="sm">
      //     <CardHeader
      //       action={
      //         <IconButton aria-label="settings">
      //           <MoreVertIcon />
      //         </IconButton>
      //       }
      //       title={recipe.name}
      //       subheader="September 14, 2016"
      //     />
      //     <CardContent className="content">
      //       <Typography>{recipe.name}</Typography>
      //     </CardContent>
      //     <br/>
      //     <CardActions>
      //       <IconButton
      //         onClick={this.handleDelete}
      //       >
      //       </IconButton>
      //       <IconButton aria-label="add to favorites">
      //         <FavoriteIcon />
      //       </IconButton>
      //       <IconButton aria-label="share">
      //         <ShareIcon />
      //       </IconButton>
      //       <Button>
      //         <Link id={recipe._id} className="link-style" to={`/recipes/${recipe._id}`}> View details</Link>
      //         <a href="" className="waves-effect waves-teal btn-flat"></a>
      //       </Button>
      //     </CardActions>
      //   </Card>
      // ))

      return (
        <div className="layout-style">
          { genre && (
            <Fragment>
              <div>
                <h1 className="title-style">{genre.name}</h1>
                <Typography><i>Last updated at {genre.updatedAt}</i></Typography>
              </div>
              <div className="row mx-lg-n5">
                {this.state.genre.movies.map(movie => (
                  <Movie2
                    key={movie.name + movie._id}
                    handleRefresh={this.handleRefresh}
                    user={this.props.user}
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
              <Row className="row-style">
                <Button
                  variant="outlined"
                  href={`#genres/${genre._id}/edit`}>Edit</Button>
                <Button
                  variant="outlined"
                  href={'#genres/'}>Back to genres</Button>
                {(this.props.user && genre) && this.props.user._id === genre.owner
                  ? deletebutton
                  : ''
                }
              </Row>
            </Fragment>
          )}
        </div>
      )
    }
    return (
      <p>no movie found</p>
    )
  }
}
// {this.state.cookbook.recipes.map(recipe => (
//   <Recipe2
//     key={recipe.name + recipe._id}
//     handleRefresh={this.handleRefresh}
//     cookbook={this.state.cookbook}
//     cookbookid={this.state.cookbook._id}
//     user={this.props.user}
//     id={recipe._id}
//     thisstate={this.state}
//     alert={this.props.alert}
//   />
// ))}
export default withRouter(Genre)
