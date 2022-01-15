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
import EditIcon from '@material-ui/icons/Edit'
import ArrowBack from '@material-ui/icons/ArrowBack'
import EditMenu from './EditMenu'
import Button from '@material-ui/core/Button'
import PropTypes from 'prop-types'

const fabStyle1 = {
}
class MovieClass extends Component {
  state = {
    movie: null,
    deleted: false
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
        movie: response.data.movie, isLoading: false
      })
    } catch (error) {
    }
    console.log('rendered from Movie')
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
  backFunction = () => {
    // this.history.goBack()
    // this.setState({ deleted: true })
    console.log(this.props)
    this.props.history.goBack()
  }

  render () {
    // const { history } = this.props
    // console.log(this.state.movie)
    // console.log(history)
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
        <Button
          onClick={this.backFunction}
          style={{ color: 'inherit', textDecoration: 'none' }}
          startIcon={<ArrowBack />}
        >
         Back
        </Button>
        { movie && (
          <div className="movie-container mx-auto my-3 px-3 py-3 border">
            <Card>
              <CardContent>
                <div className="row">
                  <div>
                    <div style={{ width: '100%' }}>
                      { movie.image == null ? <img src={'https://i.imgur.com/R7mqXKL.png'} alt="card image" style={{ width: '100', height: 450 }}/> : <img src={`https://image.tmdb.org/t/p/w185/${movie.image}`} alt="card image" style={{ width: '100', height: 500 }}/> }
                    </div>
                  </div>
                  <div className="col" style={{ display: 'flex' }}>

                    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                      <div>
                        <CardHeader
                          padding="5px"
                          // variant="h5"
                          // component="h3"
                          action={
                            // <EditMenu deleteMovie={this.deletemovie} editMovie={this.editMovie} />
                            <EditMenu className="material-icons right" id={this.state.movie._id} movie={this.state.movie} title={this.state.movie.title} user={this.props.user} released={this.props.released} genre={this.props.genre} description={this.state.movie.description} image={this.state.movie.image} style={{ textDecoration: 'none' }} deleteMovie={this.deletemovie} editMovie={this.editMovie}/>

                          }
                          // title={movie.name}
                          // title={
                          //   <h4 style={{ alignSelf: 'flex-start' }}>{movie.title}</h4>
                          // }
                          title={
                            <Typography component="h4" variant="h4">{movie.title}</Typography>
                          }
                          // subheader={movie.released}
                          subheader={movie.released.substring(5).split('-').concat(movie.released.substring(0, 4)).join('/')}
                        />
                      </div>

                      <CardContent>
                        <Typography variant="subtitle1">
                          <p> {movie.description} </p>
                        </Typography>
                        {/* <Typography color="textSecondary" variant="subtitle1">
                          <p> Saved to: {movie.genre.name}</p>
                        </Typography> */}
                      </CardContent>
                      <CardActions style={{ marginTop: 'auto', display: 'flex', alignItems: 'space-around', justifyContent: 'space-evenly' }}>
                        <Tooltip title="Back">
                          <Fab onClick={this.backFunction} aria-label="Back">
                            <ArrowBack />
                          </Fab>
                        </Tooltip>
                        <Tooltip title="Delete">
                          <Fab onClick={this.deletemovie} style={fabStyle1} className='hidden-button floating waves-effect waves-light' color="primary" aria-label="delete" >
                            <DeleteIcon />
                          </Fab>
                        </Tooltip>
                        <Tooltip title="Edit">
                          <Fab onClick={this.editMovie} style={fabStyle1} className='hidden-button floating waves-effect waves-light' color="primary" aria-label="edit" >
                            <EditIcon />
                          </Fab>
                        </Tooltip>
                      </CardActions>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            { /* this "back" button needs to use history to go back, bc this single movie component is used from Movies and Genre  */ }
          </div>
        )}
      </div>
    )
  }
}
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
export default withRouter(MovieClass)
