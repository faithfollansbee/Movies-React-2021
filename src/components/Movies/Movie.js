import React, { Component } from 'react'
import { withRouter, Redirect } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
// import CardMedia from '@material-ui/core/CardMedia'
// import CardHeader from '@material-ui/core/CardHeader'
// import IconButton from '@material-ui/core/IconButton'
// import FavoriteIcon from '@material-ui/icons/Favorite'
// import EditIcon from '@material-ui/icons/Edit'
// import MoreVertIcon from '@material-ui/icons/MoreVert'
// const movieStyle = {
// margin: '30px'
// alignItems: 'space-evenly'
// }
// const actionsStyle = {
// display: 'flex',
// justifyContent: 'space-evenly',
// alignItems: 'flex-end',
// padding: '5rem'
// }
class movie extends Component {
  state = {
    movie: null,
    deleted: false
  }

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
  }

  render () {
    const { movie, deleted } = this.state
    if (deleted) {
      return <Redirect to={
        {
          pathname: '/movies'
        }
      }/>
    }
    // <p> {movie.genre.name} </p>

    return (
      <div>
        { movie && (
          <div>
            <div className="mx-auto py-3 px-1 border bg-light">
              <Card key={movie._id}>
                <CardContent>
                  <div className="row">
                    <div style={{ width: 151 }} className="col s12 m3">
                      { movie.image == null ? <img src={'https://i.imgur.com/R7mqXKL.png'} alt="card image" style={{ width: '100', height: 450 }}/> : <img src={`https://image.tmdb.org/t/p/w185/${movie.image}`} alt="card image" style={{ width: '10', height: 450 }}/> }
                    </div>

                    <div className="col s12 m8">
                      <Typography component="h5" variant="h5">
                        {movie.title}
                      </Typography>
                      <Typography variant="subtitle1" color="textSecondary">
                        {movie.released}
                      </Typography>
                      <Typography variant="subtitle1">
                        <p> {movie.description} </p>
                      </Typography>
                    </div>

                  </div>
                </CardContent>
                <CardActions>
                  <Button href="#/movies" style={{ color: 'inherit', textDecoration: 'none' }} className="waves-effect waves-teal btn-flat">back to all
                  </Button>
                  <Button onClick={this.deletemovie}>Delete this movie</Button>
                </CardActions>
              </Card>
            </div>
            <div className="movie-container mx-3 my-3 px-3 py-3 border bg-light">
              <Card>
                <div className="row">
                  <div className="bg-dark">
                    <div style={{ width: '100%' }}>
                      { movie.image == null ? <img src={'https://i.imgur.com/R7mqXKL.png'} alt="card image" style={{ width: '100', height: 450 }}/> : <img src={`https://image.tmdb.org/t/p/w185/${movie.image}`} alt="card image" style={{ width: '100', height: 500 }}/> }
                    </div>
                  </div>
                  <div className="col">

                    <div style={{ flexDirection: 'column' }}>
                      <div>
                        <Typography component="h5" variant="h5">
                          {movie.title}
                        </Typography>
                        <Typography variant="subtitle1" color="textSecondary">
                          {movie.released}
                          {movie.released.substring(5).split('-').concat(movie.released.substring(0, 4)).join('/')}
                          {movie.released.substring(5).split('-').concat(movie.released.substring(0, 4)).join('-')}

                        </Typography>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', paddingLeft: 1, paddingBottom: 1 }}>
                        <Typography variant="subtitle1">
                          <p> {movie.description} </p>
                        </Typography>
                      </div>

                      <div style={{ display: 'flex', alignSelf: 'flex-end', alignItems: 'center', paddingBottom: 1 }}>
                        <CardActions>
                          <Button href="#/movies" style={{ color: 'inherit', textDecoration: 'none' }} className="waves-effect waves-teal btn-flat">back to all
                          </Button>
                          <Button onClick={this.deletemovie}>Delete this movie</Button>
                        </CardActions>
                      </div>
                    </div>

                  </div>
                  <div className="row">
                    <CardActions>
                      <Button href="#/movies" style={{ color: 'inherit', textDecoration: 'none' }} className="waves-effect waves-teal btn-flat">back to all
                      </Button>
                      <Button onClick={this.deletemovie}>Delete this movie</Button>
                    </CardActions>
                  </div>
                </div>
              </Card>
            </div>
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
export default withRouter(movie)
