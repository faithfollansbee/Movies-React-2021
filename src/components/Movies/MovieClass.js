import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import CardHeader from '@material-ui/core/CardHeader'
import DeleteIcon from '@material-ui/icons/Delete'
import Fab from '@material-ui/core/Fab'
import Tooltip from '@material-ui/core/Tooltip'
import ArrowBack from '@material-ui/icons/ArrowBack'
import EditMenu from './EditMenu'
import Button from '@material-ui/core/Button'
import PropTypes from 'prop-types'
import IconButton from '@material-ui/core/IconButton'
import EditMovieFab from './EditMovieDialog/EditMovieFab'

const fabStyle1 = {
}
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
    console.log('edit eventually')
  }
  // backFunction = () => {
  //   console.log(this.props)
  //   this.props.history.goBack()
  // }
  onMenuClose = () => {
    // console.log('closed menu lol')
  }

  render () {
    // const { history } = this.props
    const { movie, deleted } = this.state
    if (deleted) {
      this.props.history.goBack()
      // return <Redirect to={
      //   {
      //     pathname: '/movies'
      //   }
      // }/>
    }
    // <p> {movie.genre.name} </p>
    return (
      <div className="layout-style">
        <Button onClick={this.props.history.goBack} startIcon={<ArrowBack />}>BACK</Button>
        { movie && (
          <div className="movie-container mx-auto my-3 px-3 py-3 border" style={{ backgroundColor: 'LavenderBlush' }}>
            <Card>
              <CardContent>
                <div className="row">

                  <div>
                    <div style={{ width: '100%' }}>
                      { movie.image == null ? <img src={'https://i.imgur.com/R7mqXKL.png'} alt="card image" style={{ width: '100', height: 450 }}/> : <img src={`https://image.tmdb.org/t/p/w185/${movie.image}`} alt="card image" style={{ width: '100', height: 500 }}/> }
                    </div>
                  </div>

                  <div className="col">

                    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                      <div>
                        <CardHeader
                          padding="5px"
                          action={
                            // <EditMenu deleteMovie={this.deletemovie} editMovie={this.editMovie} />
                            <EditMenu className="material-icons right" id={this.state.movie._id} movie={this.state.movie} title={this.state.movie.title} user={this.props.user} currentGenre={this.state.movie.genre} currentGenreId={this.state.movie.genre._id} released={this.props.released} genre={this.props.genre} description={this.state.movie.description} image={this.state.movie.image} style={{ textDecoration: 'none' }} deleteMovie={this.deletemovie} editMovie={this.editMovie}/>

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
                        <Typography variant="body1">
                          {movie.description}
                        </Typography>
                        { movie.genre
                          ? <Typography color="textSecondary" variant="subtitle1"><p>Saved to: <a style={{ color: 'rgba(0, 0, 0, 0.87)' }} href={`#/genres/${this.state.movie.genre._id}`}>{this.state.movie.genre.name}</a></p></Typography>
                          : <Typography color="textSecondary" variant="subtitle1"><p>Uncategorized</p></Typography>
                        }
                        { /* color: '#757575' */ }
                        { this.state.movie.tagline ? <Typography>&quot;{this.state.movie.tagline}&quot;</Typography> : '' }
                        <Typography><a href={this.state.movie.homepage}>{this.state.movie.homepage}</a></Typography>
                        <div style={{ display: 'flex' }}>
                          { this.state.movie.categories.map((genre, i) => {
                            return (
                              <Typography key={i}>{genre.name}&nbsp;</Typography>
                            )
                          })}
                        </div>
                        <Typography>runtime {this.state.movie.runtime}</Typography>
                        <Typography>budget {this.state.movie.budget}</Typography>
                        <Typography>revenue {this.state.movie.revenue}</Typography>
                      </CardContent>
                      <CardActions style={{ marginTop: 'auto', display: 'flex', alignItems: 'space-around', justifyContent: 'space-evenly' }}>
                        <Tooltip title="Delete">
                          <Fab onClick={this.deletemovie} style={fabStyle1} className='hidden-button floating waves-effect waves-light' color="primary" aria-label="delete" >
                            <DeleteIcon />
                          </Fab>
                        </Tooltip>
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
              <Tooltip title="back">
                <IconButton onClick={this.props.history.goBack} aria-label="back">
                  <ArrowBack />
                </IconButton>
              </Tooltip>
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
