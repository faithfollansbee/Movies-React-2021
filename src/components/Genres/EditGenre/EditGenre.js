import React, { Component } from 'react'
import axios from 'axios'
import apiUrl from '../../../apiConfig'
import EditGenreForm from './EditGenreForm'
import { withRouter } from 'react-router-dom'

class EditGenre extends Component {
  state = {
    genre: null,
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
  //   } catch (error) {
  //   }
  // }

  // handleSubmit = event => {
  //   event.preventDefault()
  //   axios({
  //     method: 'POST',
  //     url: `${apiUrl}/genres`,
  //     headers: {
  //       'Authorization': `Token token=${this.props.user.token}`
  //     },
  //     data: {
  //       genre: {
  //         name: this.state.genre.name
  //       }
  //     }
  //   })
  //     // .then(response => {
  //     //   this.props.history.push('/genres')
  //     // })
  //     .then(response => {
  //       this.props.history.push(`/genres${response.data.genre._id}`)
  //     })
  //     .then(response => {
  //       this.props.history.push('/genres')
  //     })
  //     .catch(err => this.setState({ error: err.message }))
  //   this.props.handleSubmitClose()
  // }
  handleSubmit = event => {
    event.preventDefault()
    axios({
      method: 'PATCH',
      url: `${apiUrl}/genres/${this.props.genre._id}`,
      headers: {
        'Authorization': `Token token=${this.props.user.token}`
      },
      data: {
        genre: this.state.genre
      }
    })
      .then(response => {
        this.props.history.push(`/genres${this.props.genre._id}`)
      })
      .then(() => this.setState({ submitted: true }))
      // if editting from specific genre, should redirect to that same genre. if editting from
      // genre list, redirect to all genres
      .then(response => {
        this.props.history.goBack()
      })
    this.props.handleSubmitClose()
  }
  render () {
    // const { submitted } = this.state
    // if (submitted) {
    //   return <Redirect to={
    //     {
    //       pathname: '/genres'
    //     }
    //   }/>
    // }
    // return ( <Redirect to={{pathname: redirectTo}} push={true}/> )
    return (
      <EditGenreForm
        user={this.user}
        id={this.props.id}
        genre={this.props.genre}
        handleSubmitClose={this.props.handleSubmitClose}
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
      />
    )
  }
}

export default withRouter(EditGenre)
