import { withRouter } from 'react-router-dom'
import React, { Component } from 'react'
import axios from 'axios'
import apiUrl from '../../apiConfig'

import GenreForm from './GenreForm'

class UpdateGenre extends Component {
  state = {
    genre: null
  }

  async componentDidMount (props) {
    try {
      const response = await axios({
        url: `${apiUrl}/genres/${this.props.match.params.id}`,
        method: 'GET',
        headers: {
          'Authorization': `Token token=${this.props.user.token}`
        }
      })
      this.setState({
        genre: response.data.genre
      })
    } catch (error) {
    }
  }

  handleChange = event => {
    this.setState({
      genre: {
        ...this.state.genre,
        [event.target.name]: event.target.value
      }
    })
  }

  handleSubmit = event => {
    event.preventDefault()
    axios({
      method: 'PATCH',
      url: `${apiUrl}/genres/${this.state.genre._id}`,
      headers: {
        'Authorization': `Token token=${this.props.user.token}`
      },
      data: {
        genre: this.state.genre
      }
    })
      // .then(response => {
      //   this.props.history.push(`/genres/${this.state.genre._id}`)
      // })
      .then(response => {
        this.props.history.goBack(`/genres/${this.state.genre._id}`)
      })
  }

  render () {
    if (!this.state.genre) {
      return (
        <h1>Loading... </h1>
      )
    }
    return (
      <GenreForm
        genre={this.state.genre}
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
      />
    )
  }
}

export default withRouter(UpdateGenre)
