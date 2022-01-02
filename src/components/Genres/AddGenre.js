import React, { Component } from 'react'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import GenreForm from './GenreForm'
// import GenreDialogForm from './GenreDialogForm'
import { withRouter } from 'react-router-dom'

class AddGenre extends Component {
  state = {
    genre: {
      name: ''
    },
    submitted: false
  }

  handleChange = event => {
    this.setState({
      genre: {
        ...this.state.genre,
        [event.target.name]: event.target.value
      }
    })
  }
  //
  // async componentDidMount () {
  //   try {
  //     const response = await axios({
  //       url: `${apiUrl}/recipes`,
  //       method: 'GET',
  //       headers: {
  //         Authorization: `Token token=${this.props.user.token}`
  //       }
  //     })
  //     this.setState({ recipes: response.data.recipes, isLoading: false })
  //     this.setState({ userRecipes: response.data.recipes })
  //   } catch (error) {
  //   }
  // }

  handleSubmit = event => {
    event.preventDefault()
    axios({
      method: 'POST',
      url: `${apiUrl}/genres`,
      headers: {
        'Authorization': `Token token=${this.props.user.token}`
      },
      data: {
        genre: {
          name: this.state.genre.name
        }
      }
    })
    // .then(response => {
    //   this.props.history.push('/genres')
    // })
      .then(response => {
        this.props.history.push(`/genres${response.data.Genre._id}`)
      })
      .then(response => {
        this.props.history.push('/genres')
      })
    this.props.handleSubmitClose()
    // .catch(err => this.setState({ error: err.message }))
  }
  render () {
    return (
      <GenreForm
        user={this.user}
        // genre={this.state.genre}
        handleSubmitClose={this.props.handleSubmitClose}
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
      />
    )
  }
}

export default withRouter(AddGenre)
