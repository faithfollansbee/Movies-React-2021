import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import Card from '@material-ui/core/Card'
import Tooltip from '@material-ui/core/Tooltip'
import Button from '@material-ui/core/Button'
import ArrowBack from '@material-ui/icons/ArrowBack'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import CardHeader from '@material-ui/core/CardHeader'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import Fab from '@material-ui/core/Fab'
import FavoriteIcon from '@material-ui/icons/Favorite'
import AddMovieDialog from './AddMovieDialog'

class MovieInfoClass extends Component {
  state = {
    movies: [],
    isLoading: true,
    currentMovie: this.props.currentMovie,
    genres: []
    // movie: null,
    // id: props.id,
  }

  componentDidMount (props) {
    // console.log('getting movie')
    // console.log(this.props)
    // fetch(`https://api.themoviedb.org/3/movie/${this.props.id}?api_key=4a0223110b505876ba0985949c17e865&language=en-US`)
    fetch(`https://api.themoviedb.org/3/movie/${this.props.currentMovie.id}?api_key=4a0223110b505876ba0985949c17e865&language=en-US&${this.props.currentMovie.id}`)
      .then(data => data.json())
      .then(data => {
        this.setState({ currentMovie: { ...data } })
        // console.log(this.state.currentMovie, 'got movie')
        // console.log(data)
        this.setState({ genres: data.genres })
      })
      .catch(error => {
        console.error(error)
      })
    console.log('Rendered from MovieInfoClass')
  }
  // https://api.themoviedb.org/3/movie/385128?api_key=4a0223110b505876ba0985949c17e865&language=en-US&movie_id=385128
  // https://api.themoviedb.org/3/movie/${this.state.currentMovie.id}?api_key=4a0223110b505876ba0985949c17e865&language=en-US
  getMovie = (event) => {
    // console.log('got movie')
    // console.log(this.state.currentMovie.id)
    // console.log(this.props.currentMovie.id)
    // console.log(this.props.id)
    fetch(`https://api.themoviedb.org/3/movie/${this.props.currentMovie.id}?api_key=4a0223110b505876ba0985949c17e865&language=en-US&${this.props.currentMovie.id}`)
      .then(data => data.json())
      .then(data => {
        this.setState({ currentMovie: { ...data } })
        console.log(this.state.currentMovie, 'got movie')
        console.log(data)
      })
      .catch(error => {
        console.error(error)
      })
  }
  render () {
    console.log(this.state)
    // console.log(this.props)
    return (
      <div className="layout-style">
        <Button
          href="#/search" // if on trending page, should go back to that page, not search.
          style={{ color: 'inherit', textDecoration: 'none' }}
          startIcon={<ArrowBack />}
        >
         Back
        </Button>
        <h4>{this.state.currentMovie.title}</h4>
        <div style={{ backgroundColor: 'LavenderBlush' }} className="movie-container mx-auto my-3 px-3 py-3 border">
          <Card>
            <div className="row">
              <div>
                <div style={{ width: '100%' }}>
                  { this.state.currentMovie.poster_path == null ? <img src={'https://i.imgur.com/R7mqXKL.png'} alt="card image" style={{ width: '100', height: 450 }}/> : <img src={`https://image.tmdb.org/t/p/w185/${this.state.currentMovie.poster_path}`} alt="card image" style={{ width: '100', height: 500 }}/> }
                </div>
              </div>
              <div className="col" style={{ backgroundColor: 'AliceBlue' }}>

                <div style={{ flexDirection: 'column' }}>
                  <CardHeader
                    // variant="h5"
                    // component="h3"
                    action={
                      <Tooltip title="more">
                        <IconButton tooltip="settings">
                          <MoreVertIcon />
                        </IconButton>
                      </Tooltip>
                    }
                    title={this.state.currentMovie.title}
                    subheader={this.state.currentMovie.release_date.substring(5).split('-').concat(this.state.currentMovie.release_date.substring(0, 4)).join('/')}
                  />
                  <CardContent>

                    <div style={{ display: 'flex' }}>
                      { this.state.genres.map((genre, i) => {
                        return (
                          <Typography key={i}>{genre.name}&nbsp;</Typography>
                        )
                      })}
                    </div>
                    <br/>
                    <Typography><a href={this.state.currentMovie.homepage}>{this.state.currentMovie.homepage}</a></Typography>
                    { this.state.currentMovie.tagline ? <Typography>&quot;{this.state.currentMovie.tagline}&quot;</Typography> : '' }
                    <Typography>runtime {this.state.currentMovie.runtime}</Typography>
                    <Typography>budget {this.state.currentMovie.budget}</Typography>
                    <Typography>revenue {this.state.currentMovie.revenue}</Typography>
                    <Typography variant="body2">
                      {this.props.currentMovie.overview}
                    </Typography>
                  </CardContent>
                </div>
              </div>
            </div>

            <CardActions>
              <div className="row" style={{ backgroundColor: 'MintCream', alignContent: 'center', alignSelf: 'flex-end' }}>
                <CardActions>
                  <Tooltip title="Back">
                    <Fab href="#/search" aria-label="Back">
                      <ArrowBack />
                    </Fab>
                  </Tooltip>
                  <Tooltip title="Favorite">
                    <Fab className='hidden-button floating waves-effect waves-light' color="primary" aria-label="favorite" >
                      <FavoriteIcon />
                    </Fab>
                  </Tooltip>
                  <AddMovieDialog id={this.props.currentMovie.id} title={this.props.currentMovie.title} released={this.props.currentMovie.release_date} description={this.props.currentMovie.overview} image={this.props.currentMovie.poster_path} user={this.props.user} tagline={this.props.currentMovie.tagline} runtime={this.props.currentMovie.runtime} />
                </CardActions>
              </div>
            </CardActions>
          </Card>
        </div>
      </div>
    )
  }
}
// <a style={{ textDecoration: 'none' }} className="right" href={`#/movies/${this.state.movie._id}`}><i className="material-icons right navigate_next">navigate_next</i></a>

// <p>{this.state.movie.genre.name}</p>
// <EditMenu className="material-icons right" id={this.props.id} movie={this.props.movie} title={this.props.title} user={this.props.user} released={this.props.released} genre={this.props.genre} description={this.props.description} image={this.props.image} style={{ textDecoration: 'none' }} deleteMovie={this.deleteMovie} editMovie={this.editMovie}/>
// <EditMenu className="material-icons right" id={this.state.movie._id} movie={this.state.movie} title={this.state.movie.title} user={this.props.user} released={this.props.released} genre={this.props.genre} description={this.state.movie.description} image={this.state.movie.image} style={{ textDecoration: 'none' }} deleteMovie={this.deleteMovie} editMovie={this.editMovie}/>

export default withRouter(MovieInfoClass)
