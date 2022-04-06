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
const addDialogStyle = {
}
class MovieInfoClass extends Component {
  state = {
    movies: [],
    isLoading: true,
    currentMovie: this.props.currentMovie,
    genres: []
  }

  componentDidMount (props) {
    // fetch(`https://api.themoviedb.org/3/movie/${this.props.id}?api_key=4a0223110b505876ba0985949c17e865&language=en-US`)
    fetch(`https://api.themoviedb.org/3/movie/${this.props.currentMovie.id}?api_key=4a0223110b505876ba0985949c17e865&language=en-US&${this.props.currentMovie.id}`)
      .then(data => data.json())
      .then(data => {
        this.setState({ currentMovie: { ...data } })
        this.setState({ genres: data.genres })
      })
      .catch(error => {
        console.error(error)
      })
  }
  // https://api.themoviedb.org/3/movie/385128?api_key=4a0223110b505876ba0985949c17e865&language=en-US&movie_id=385128
  // https://api.themoviedb.org/3/movie/${this.state.currentMovie.id}?api_key=4a0223110b505876ba0985949c17e865&language=en-US
  getMovie = (event) => {
    fetch(`https://api.themoviedb.org/3/movie/${this.props.currentMovie.id}?api_key=4a0223110b505876ba0985949c17e865&language=en-US&${this.props.currentMovie.id}`)
      .then(data => data.json())
      .then(data => {
        this.setState({ currentMovie: { ...data } })
      })
      .catch(error => {
        console.error(error)
      })
  }

  render () {
    return (
      <div className="layout-style">
        <Tooltip title="back">
          <Button
            onClick={this.props.history.goBack}
            style={{ color: 'inherit', textDecoration: 'none' }}
            startIcon={<ArrowBack />}
          >
           Back
          </Button>
        </Tooltip>
        <div style={{ backgroundColor: 'LavenderBlush' }} className="movie-container mx-auto my-3 px-3 py-3 border">
          <Card>
            <CardContent>
              <div className="row">

                <div>
                  <div style={{ width: '100%' }}>
                    { this.state.currentMovie.poster_path == null ? <img src={'https://i.imgur.com/R7mqXKL.png'} alt="card image" style={{ width: '100', height: 450 }}/> : <img src={`https://image.tmdb.org/t/p/w185/${this.state.currentMovie.poster_path}`} alt="card image" style={{ width: '100', height: 500 }}/> }
                  </div>
                </div>

                <div className="col">
                  <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                    <div>
                      <CardHeader
                        action={
                          // <OptionMenu />
                          <Tooltip title="more">
                            <IconButton className="material-icons right" tooltip="settings">
                              <MoreVertIcon />
                            </IconButton>
                          </Tooltip>
                        }
                        title={
                          <Typography component="h4" variant="h4">{this.state.currentMovie.title}</Typography>
                        }
                        subheader={this.state.currentMovie.release_date.substring(5).split('-').concat(this.state.currentMovie.release_date.substring(0, 4)).join('/')}
                      />
                    </div>
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
                      <Typography variant="body1">
                        {this.props.currentMovie.overview}
                      </Typography>
                    </CardContent>
                    <CardActions className="row" style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-evenly' }}>
                      <Tooltip title="Favorite">
                        <Fab size="small" className='hidden-button floating waves-effect waves-light' color="primary" aria-label="favorite" >
                          <FavoriteIcon />
                        </Fab>
                      </Tooltip>
                      <AddMovieDialog style={addDialogStyle} id={this.props.currentMovie.id} title={this.props.currentMovie.title} released={this.props.currentMovie.release_date} revenue={this.state.currentMovie.revenue} homepage={this.state.currentMovie.homepage} budget={this.state.currentMovie.budget} description={this.props.currentMovie.overview} image={this.props.currentMovie.poster_path} user={this.props.user} tagline={this.state.currentMovie.tagline} runtime={this.state.currentMovie.runtime} categories={this.state.genres}/>
                    </CardActions>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }
}

export default withRouter(MovieInfoClass)
