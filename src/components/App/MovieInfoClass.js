import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import Card from '@material-ui/core/Card'
import Tooltip from '@material-ui/core/Tooltip'
import Button from '@material-ui/core/Button'
import ArrowBack from '@material-ui/icons/ArrowBack'
// import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
// import MoreVertIcon from '@material-ui/icons/MoreVert'
import CardHeader from '@material-ui/core/CardHeader'
// import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
// import Fab from '@material-ui/core/Fab'
// import FavoriteIcon from '@material-ui/icons/Favorite'
import CardMedia from '@material-ui/core/CardMedia'
// import AddMovieDialog from './AddMovieDialog'
import SaveMovieFunction from './SaveMovieFunction'
// import EditMovieListing from './EditMovieListing'
// import AutoDismissAlert from '../AutoDismissAlert/AutoDismissAlert'
// import messages from '../AutoDismissAlert/messages'

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
    console.log(`${process.env.REACT_APP_MY_API_KEY}`)

    // fetch(`https://api.themoviedb.org/3/movie/${this.props.id}?api_key=${process.env.REACT_APP_MY_API_KEY}&language=en-US`)
    fetch(`https://api.themoviedb.org/3/movie/${this.props.currentMovie.id}?api_key=${process.env.REACT_APP_MY_API_KEY}&language=en-US&append_to_response=credits`)
      .then(data => data.json())
      .then(data => {
        this.setState({ currentMovie: { ...data } })
        this.setState({ genres: data.genres })
        console.log(data)
        // console.log('MOVIEINFOCLASS', data)
        // console.log('MovieInfoClass mounted + fetched more info from api')
        const directors = []
        data.credits.crew.forEach(function (entry) {
          if (entry.job === 'Director') {
            directors.push(entry.name)
          }
        })
        console.log('called componentDidMount in MovieInfoClass')
        // console.log('Director: ' + directors.join(', '))
        this.setState({ directors: directors })
      })
      .catch(error => {
        console.error(error)
      })
  }
  // https://api.themoviedb.org/3/movie/385128?api_key=${process.env.REACT_APP_MY_API_KEY}&language=en-US&movie_id=385128
  // https://api.themoviedb.org/3/movie/${this.state.currentMovie.id}?api_key=${process.env.REACT_APP_MY_API_KEY}&language=en-US
  getMovie = (event) => {
    fetch(`https://api.themoviedb.org/3/movie/${this.props.currentMovie.id}?api_key=${process.env.REACT_APP_MY_API_KEY}&language=en-US&${this.props.currentMovie.id}`)
      .then(data => data.json())
      .then(data => {
        this.setState({ currentMovie: { ...data } })
        // console.log('called get')
      })
      .catch(error => {
        console.error(error)
      })
  }
  doMessage = (event) => {
    const { alert } = this.props

    alert({
      heading: 'Movie Saved Successfully',
      // message: messages.changePasswordSuccess,
      variant: 'success'
    })
  }

  render () {
    const { currentMovie, directors } = this.state
    // console.log(alert)
    // console.log(this.state)
    // console.log(this.props)
    const bull = <span style={{ display: 'inline-block', margin: '0 2px', transform: 'scale(0.8)' }}>•</span>

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
        <div style={{ backgroundColor: '#f1f1f1' }} className="movie-container mx-auto my-3 px-3 py-3 border">
          <Card>
            <CardContent>
              <div className="row">
                <div>
                  <div style={{ width: '100%' }}>

                    { currentMovie.poster_path == null
                      ? <CardMedia component="img" alt="card image" height="500" style={{ width: '100', height: 500 }} src={'https://i.imgur.com/R7mqXKL.png'} image={'https://i.imgur.com/R7mqXKL.png'} title={currentMovie.title} />
                      : <CardMedia component="img" alt="card image" height="500" style={{ width: '100', height: 500 }} src={`https://image.tmdb.org/t/p/w185/${currentMovie.poster_path}`}
                        image={`https://image.tmdb.org/t/p/w500/${currentMovie.poster_path}`} title={currentMovie.title} />
                    }
                  </div>
                </div>

                {/* image={`https://image.tmdb.org/t/p/w185/${currentMovie.poster_path}`} */}
                {/* <img src={`https://image.tmdb.org/t/p/w185/${this.state.currentMovie.poster_path}`} alt="card image" style={{ width: '100', height: 500 }}/> */}
                <div className="col">
                  <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                    <div>
                      <CardHeader
                        padding="5px"
                        action={
                          <SaveMovieFunction doMessage={this.doMessage} alert={this.props} style={addDialogStyle} id={this.props.currentMovie.id} title={this.props.currentMovie.title} released={this.props.currentMovie.release_date} revenue={this.state.currentMovie.revenue} homepage={this.state.currentMovie.homepage} budget={this.state.currentMovie.budget} description={this.props.currentMovie.overview} image={this.props.currentMovie.poster_path} user={this.props.user} tagline={this.state.currentMovie.tagline} runtime={this.state.currentMovie.runtime} directors={this.state.directors} categories={this.state.genres}/>
                        }
                        title={
                          <Typography component="h4" variant="h4">{this.state.currentMovie.title}</Typography>
                        }
                        // <Typography><a href={this.state.currentMovie.homepage}>{this.state.currentMovie.homepage}</a></Typography>
                        // subheader={<a href={this.state.currentMovie.homepage}>{this.state.currentMovie.homepage}</a>}
                        subheader={this.state.currentMovie.release_date.substring(5).split('-').concat(this.state.currentMovie.release_date.substring(0, 4)).join('/')}
                      />
                    </div>

                    <CardContent>
                      { currentMovie.tagline ? <Typography variant="subtitle1" gutterBottom>&quot;{this.state.currentMovie.tagline}&quot;<br/></Typography> : '' }
                      <Typography variant="subtitle1" gutterBottom>
                        {this.props.currentMovie.overview}
                      </Typography>
                      <br/>
                      <div style={{ display: 'flex' }}>
                        { this.state.genres.map((genre, i, arr) => {
                          if (arr.length - 1 === i) {
                            return (<Typography variant="subtitle1" style={{ fontWeight: '450' }} gutterBottom key={i}>{genre.name}</Typography>)
                          } else {
                            return (<Typography variant="subtitle1" style={{ fontWeight: '450' }} gutterBottom key={i}>{genre.name}{bull}</Typography>)
                          }
                        })}
                        <br/>
                      </div>
                      { !directors ? (
                        <div></div>)
                        : <div> { directors.length > 1 ? (
                          <Typography color="textSecondary">Directors: {this.state.directors.join(', ')}</Typography>)
                          : (<Typography color="textSecondary" >Director: {this.state.directors}<br/></Typography>)}</div> }
                      {/*  { currentMovie.release_date ? <Typography color="textSecondary">released: {currentMovie.release_date.substring(5).split('-').concat(currentMovie.release_date.substring(0, 4)).join('/')}</Typography> : '' } */}
                      { currentMovie.runtime ? <Typography color="textSecondary">runtime: {this.state.currentMovie.runtime} min</Typography> : '' }
                      { currentMovie.revenue && Number(currentMovie.revenue) > 0 ? <Typography color="textSecondary">revenue: ${currentMovie.revenue}</Typography> : '' }
                      { currentMovie.budget && Number(currentMovie.budget) > 0 ? <Typography color="textSecondary">budget: ${currentMovie.budget}</Typography> : '' }
                      <br/>
                      <Typography><a href={this.state.currentMovie.homepage}>{this.state.currentMovie.homepage}</a></Typography>
                      <br/>
                    </CardContent>
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
