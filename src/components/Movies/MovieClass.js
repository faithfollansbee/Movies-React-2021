import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import CardHeader from '@material-ui/core/CardHeader'
import ArrowBack from '@material-ui/icons/ArrowBack'
import EditMenu from './EditMenu'
import Button from '@material-ui/core/Button'
import PropTypes from 'prop-types'
import EditMovieFab from './EditMovieDialog/EditMovieFab'
import CardMedia from '@material-ui/core/CardMedia'
import DeleteMovieFab from './EditMovieDialog/DeleteMovieFab'
// import SavedTo from './SavedTo'

class MovieClass extends Component {
  state = {
    movie: null,
    deleted: false,
    genre: null
  }
  static propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  };

  async componentDidMount (props) {
    try {
      const response = await axios({
        url: `${apiUrl}/movies/${this.props.match.params.id}`,
        method: 'GET',
        headers: {
          'Authorization': `Token token=${this.props.user.token}`
        }
      })
      this.setState({
        movie: response.data.movie,
        isLoading: false,
        genre: response.data.movie.genre
      })
      // console.log(response.data)
    } catch (error) {
    }
  }

  deletemovie = () => {
    axios({
      url: `${apiUrl}/movies/${this.props.match.params.id}`,
      method: 'DELETE',
      headers: {
        'Authorization': `Token token=${this.props.user.token}`
      }
    })
      .then(() => this.setState({ deleted: true }))
      // .then(() => history.goBack())
  }
  editMovie = () => {
    console.log('edit eventually, called from MovieClass')
  }
  // backFunction = () => {
  //   console.log(this.props)
  //   this.props.history.goBack()
  // }
  onMenuClose = () => {
    // console.log('closed menu lol')
  }

  render () {
    const { movie, deleted } = this.state
    if (deleted) {
      this.props.history.goBack()
      // return <Redirect to={
      //   {
      //     pathname: '/movies'
      //   }
      // }/>
    }
    const bull = <span style={{ display: 'inline-block', margin: '0 2px', transform: 'scale(0.8)' }}>•</span>

    return (
      <div className="layout-style">
        <Button onClick={this.props.history.goBack} startIcon={<ArrowBack />}>BACK</Button>
        { movie && (
          <div className="movie-container mx-auto my-3 px-3 py-3 border">
            <Card>
              <CardContent>
                <div className="row">

                  <div>
                    <div style={{ width: '100%' }}>
                      { movie.image == null
                        ? <CardMedia component="img" alt="card image" height="500"
                          src={'https://i.imgur.com/R7mqXKL.png'} style={{ width: '100', height: 450 }}
                          image={'https://i.imgur.com/R7mqXKL.png'} title={movie.title}
                        />
                        : <CardMedia component="img" alt="card image" height="500"
                          src={`https://image.tmdb.org/t/p/w500/${movie.image}`}
                          image={`https://image.tmdb.org/t/p/w500/${movie.image}`} title={movie.title}
                          style={{ width: '100', height: 500 }}/>
                      }
                    </div>
                  </div>

                  <div className="col">
                    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                      <div>
                        <CardHeader
                          padding="5px"
                          action={
                            // <EditMenu deleteMovie={this.deletemovie} editMovie={this.editMovie} />
                            // currentGenreId={this.state.movie.genre._id}
                            <EditMenu className="material-icons right" id={this.state.movie._id} movie={this.state.movie} title={this.state.movie.title} user={this.props.user} currentGenre={this.state.movie.genre} released={this.props.released} genre={this.props.genre} description={this.state.movie.description} image={this.state.movie.image} style={{ textDecoration: 'none' }} deleteMovie={this.deletemovie} editMovie={this.editMovie}/>

                          }
                          // title={
                          //   <h4 style={{ alignSelf: 'flex-start' }}>{movie.title}</h4>
                          // }
                          title={
                            <Typography component="h4" variant="h4">{movie.title}</Typography>
                          }
                          subheader={movie.released.substring(5).split('-').concat(movie.released.substring(0, 4)).join('/')}
                        />
                      </div>
                      <CardContent>

                        { this.state.movie.tagline ? <Typography variant="subtitle1" gutterBottom>&quot;{this.state.movie.tagline}&quot;</Typography> : '' }

                        <Typography variant="subtitle1" gutterBottom>
                          {movie.description}
                        </Typography>
                        <br/>
                        <div style={{ display: 'flex' }}>
                          { movie.categories.map((genre, i, arr) => {
                            if (arr.length - 1 === i) {
                              return (<Typography variant="subtitle1" style={{ fontWeight: '450' }} gutterBottom key={i}>{genre.name}</Typography>)
                            } else {
                              return (<Typography variant="subtitle1" style={{ fontWeight: '450' }} gutterBottom key={i}>{genre.name}{bull}</Typography>)
                            }
                          })}
                        </div>
                        { movie.directors.length === 0 ? (
                          <div></div>)
                          : <div> { movie.directors.length > 1 ? (
                            <Typography color="textSecondary">Directors: {movie.directors.join(', ')}</Typography>)
                            : (<Typography color="textSecondary">Director: {movie.directors}</Typography>)}</div> }
                        { /* color: '#757575' */ }

                        <Typography color="textSecondary"><a href={this.state.movie.homepage}>{this.state.movie.homepage}</a></Typography>

                        { movie.runtime ? <Typography color="textSecondary">runtime: {movie.runtime} min</Typography> : '' }
                        { movie.revenue && Number(movie.revenue) > 0 ? <Typography color="textSecondary">revenue: ${movie.revenue}</Typography> : '' }
                        { movie.budget && Number(movie.budget) > 0 ? <Typography color="textSecondary">budget: ${movie.budget}</Typography> : '' }

                        <br/>

                        { movie.genre
                          ? <Typography color="textSecondary">Saved to: <a style={{ color: 'rgba(0, 0, 0, 0.87)' }} href={`#/genres/${this.state.movie.genre._id}`}>{this.state.movie.genre.name}</a></Typography>
                          : <Typography color="textSecondary">Uncategorized</Typography>
                        }

                      </CardContent>

                      <CardActions style={{ marginTop: 'auto', display: 'flex', alignItems: 'space-around', justifyContent: 'space-evenly' }}>
                        <DeleteMovieFab deleteMovie={this.deletemovie} onMenuClose={this.onMenuClose} id={movie._id} user={this.props.user} movie={movie}/>
                        <EditMovieFab
                          id={this.state.movie._id} user={this.props.user} movie={movie} title={movie.title} currentGenre={movie.currentGenre} genre={movie.genre} image={movie.image} released={movie.released} description={movie.description}/>
                        { /*  <Tooltip title="Edit">
                          <Fab onClick={this.editMovie} style={fabStyle1} className='hidden-button floating waves-effect waves-light' color="primary" aria-label="edit" currentGenre={this.state.movie.genre} currentGenreId={this.state.movie.genre._id}>
                            <EditIcon />
                          </Fab>
                        </Tooltip> */ }
                        {/*
                          <EditMovieDialog onMenuClose={this.onMenuClose} id={this.state.movie._id} user={this.props.user} movie={movie} title={movie.title} currentGenre={movie.currentGenre} genre={movie.genre} image={movie.image} released={movie.released} description={movie.description}/>
                          */}
                      </CardActions>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <CardActions>
            </CardActions>
          </div>
        )}
      </div>
    )
  }
}
export default withRouter(MovieClass)

// <div className="movie-container my-5 py-3 border bg-light">
//   <Card>
//     <CardContent>
//       <div className="row">
//         <div style={{ width: 151 }} className="col s12 m3">
//           { movie.image == null ? <img src={'https://i.imgur.com/R7mqXKL.png'} alt="card image" style={{ width: '100', height: 450 }}/> : <img src={`https://image.tmdb.org/t/p/w185/${movie.image}`} alt="card image" style={{ width: '10', height: 450 }}/> }
//         </div>
//         <div className="col s12 m8">
//           <div className="info-container">
//             <p> {movie.title} </p>
//             <p> {movie.description} </p>
//             <p>{movie.released.substring(5).split('-').concat(movie.released.substring(0, 4)).join('/')}</p>
//             <p>{movie.released.substring(5).split('-').concat(movie.released.substring(0, 4)).join('-')}</p>
//             <p> {movie.genre.name} </p>
//           </div>
//         </div>
//       </div>
//     </CardContent>
//     <CardActions>
//       <Button href="#/movies" style={{ color: 'inherit', textDecoration: 'none' }} className="waves-effect waves-teal btn-flat">back to all
//       </Button>
//       <div className="row" style={actionsStyle}>
//         <Button onClick={this.deletemovie}>Delete this movie</Button>
//       </div>
//     </CardActions>
//   </Card>
// </div>
// <div className="col s12 m3">
//   { movie.image == null ? <img src={'https://i.imgur.com/R7mqXKL.png'} alt="card image" style={{ width: '100', height: 360 }}/> : <img src={`https://image.tmdb.org/t/p/w185/${movie.image}`} alt="card image" style={{ width: '10', height: 360 }}/> }
// </div>
// <div style={{ width: 151 }}>
//   { movie.image == null ? <img src={'https://i.imgur.com/R7mqXKL.png'} alt="card image" style={{ width: '100', height: 450 }}/> : <img src={`https://image.tmdb.org/t/p/w185/${movie.image}`} alt="card image" style={{ width: '10', height: 450 }}/> }
// </div>
