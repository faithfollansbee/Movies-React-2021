import React, { Component } from 'react'
import { withRouter, Redirect, Link } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'

// const movieStyle = {
// margin: '30px'
// alignItems: 'space-evenly'
// }
const actionsStyle = {
  // display: 'flex',
  justifyContent: 'space-evenly',
  // alignItems: 'flex-end',
  padding: '5rem'
}
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
          <div className="movie-container">
            <Card>
              <CardContent>
                <div className="row">
                  <div className="col s12 m3">
                    { movie.image == null ? <img src={'https://i.imgur.com/R7mqXKL.png'} alt="card image" style={{ width: '100', height: 360 }}/> : <img src={`https://image.tmdb.org/t/p/w185/${movie.image}`} alt="card image" style={{ width: '10', height: 360 }}/> }
                  </div>
                  <div className="col s12 m8">
                    <div className="info-container">
                      <p> {movie.title} </p>
                      <p> {movie.description} </p>
                      <p> {movie.released} </p>
                      <p> {movie.genre.name} </p>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardActions>
                <div className="row" style={actionsStyle}>
                  <Link to="/movies">Back to all</Link>
                  <Link to="/search">Back to search</Link>
                  <button onClick={this.deletemovie}>Delete this movie</button>
                </div>
              </CardActions>
            </Card>
          </div>
        )}
      </div>
    )
  }
}

export default withRouter(movie)
