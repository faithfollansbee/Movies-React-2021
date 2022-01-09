import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'

import MovieForm from './MovieForm'

class UpdateMovie extends Component {
  state = {
    movie: null
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
      this.setState({ movie: response.data.movie })
    } catch (error) {
    }
  }

  handleChange = event => {
    this.setState({
      movie: {
        ...this.state.movie,
        [event.target.name]: event.target.value
      }
    })
  }

  handleSubmit = event => {
    event.preventDefault()
    axios({
      method: 'PATCH',
      url: `${apiUrl}/movies/${this.state.movie._id}`,
      headers: {
        'Authorization': `Bearer ${this.props.user.token}`
      },
      data: {
        movie: {
          title: this.state.movie.title,
          description: this.state.movie.description,
          released: this.state.movie.released,
          image: this.state.movie.image,
          genre: this.state.movie.genre._id
        }
      }
    })
      .then(response => {
        this.props.history.push(`/genres/${this.state.movie.genre._id}`)
      })
      .catch(() => {
      })
  }

  render () {
    if (!this.state.movie) {
      return (
        <h1>Loading... </h1>
      )
    }
    const theRoute = this.state.movie.genre._id
    return (
      <MovieForm
        movie={this.state.movie}
        handleChange={this.handleChange}
        handleMovieSubmit={this.handleSubmit}
        correctRoute={theRoute}
      />
    )
  }
}

export default withRouter(UpdateMovie)
