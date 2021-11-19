// import React, { Component } from 'react'
// import axios from 'axios'
// import apiUrl from '../../../apiConfig'
// import { withRouter } from 'react-router-dom'
// import EditMovieForm from './EditMovieForm'
// class EditMovie extends Component {
//   state = {
//     movie: null,
//     submitted: false
//   }
//   handleChange = event => {
//     this.setState({
//       movie: {
//         ...this.state.movie,
//         [event.target.name]: event.target.value
//       }
//     })
//   }
//   handleSubmit = event => {
//     event.preventDefault()
//     axios({
//       method: 'PATCH',
//       url: `${apiUrl}/movies/${this.props.id}`,
//       headers: {
//         'Authorization': `Token token=${this.props.user.token}`
//       },
//       data: {
//         movie: this.state.movie
//       }
//     })
//       .then(response => {
//         this.props.history.push(`/movies${this.props.movie._id}`)
//       })
//     console.log('using handleSubmit from EditMovie')
//       .then(response => {
//         this.props.history.push('/movies')
//       })
//     this.props.handleSubmitClose()
//   }
//   render () {
//     console.log(this.props.user)
//     return (
//       <EditMovieForm
//         user={this.props.user}
//         description={this.props.description}
//         id={this.props.id}
//         movie={this.props.movie}
//         title={this.props.title}
//         genre={this.props.genre}
//         handleSubmitClose={this.props.handleSubmitClose}
//         handleChange={this.handleChange}
//         handleSubmit={this.handleSubmit}
//       />
//     )
//   }
// }
// export default withRouter(EditMovie)
