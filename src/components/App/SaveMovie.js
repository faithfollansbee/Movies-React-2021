import React, { Component } from 'react'
import axios from 'axios'
import apiUrl from '../../apiConfig'
// import Form from 'react-bootstrap/Form'
// import Button from 'react-bootstrap/Button'
import { withRouter } from 'react-router-dom'
import Spinner from 'react-bootstrap/Spinner'

// import Card from '@material-ui/core/Card'
// import CardContent from '@material-ui/core/CardContent'
// const listStyle = {
//   listStyleType: 'none'
// }
class SaveMovie extends Component {
  constructor (props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.state = {
      user: props.user,
      genres: [],
      userGenres: [],
      // isLoading: true,
      filtered: false,
      movie: {
        title: props.title,
        released: props.released,
        image: props.image,
        type: ''
      }
    }
    // console.log(this.props.user)
  }

  handleChange = event => {
    this.setState({
      movie: {
        ...this.state.movie,
        [event.target.name]: event.target.value
      }
    })
    console.log(this.state)
  }
  handleSubmit = event => {
    event.preventDefault()
    axios({
      method: 'POST',
      url: `${apiUrl}/movies`,
      headers: {
        'Authorization': `Token token=${this.props.user.token}`
      },
      data: {
        movie: {
          title: this.props.title,
          released: this.props.released,
          description: this.props.description,
          image: this.props.image,
          type: this.state.type
        }
      }
    })
      .then(response => {
        this.props.history.push(`/movies/${response.data.movie._id}`)
      })
      .catch(err => this.setState({ error: err.message }))
  }
  handleOptionChange = changeEvent => {
    this.setState({
      type: changeEvent.target.value
    })
  }
  async componentDidMount () {
    try {
      const response = await axios({
        url: `${apiUrl}/genres`,
        method: 'GET',
        headers: {
          Authorization: `Token token=${this.props.user.token}`
        }
      })
      this.setState({ genres: response.data.genres, isLoading: false })
      this.setState({ userGenres: response.data.genres })
    } catch (error) {
    }
  }

  render (props) {
    // const { userGenres } = this.state
    console.log(this.state)
    // const genresJsx = userGenres.map(genre => (
    //   <div key={genre._id}>
    //     { genre.name }
    //   </div>
    // ))
    const genresJsx = this.state.genres.map(genre => (
      <div className="collection-item" key={genre._id}>
        { genre.name }
      </div>
    ))
    if (this.state.isLoading) {
      return (
        <div className="text-center">
          <Spinner animation="border" variant="primary" />
        </div>
      )
    }
    // console.log(this.state.place)
    return (
      <ul>
        {this.state.genres.length
          ? genresJsx
          : <ul>No genres found</ul>
        }
      </ul>
    )
  }
}

export default withRouter(SaveMovie)
// <Form onSubmit={this.handleSubmit}>
//   <div className="col">
//     <Form.Group controlId="formBasicCheckbox">
//       {this.state.genres.length
//         ? genresJsx
//         : <ul>No genres found</ul>
//       }
//       <ul style={listStyle}>
//         <li>
//           <label>
//             <input
//               name="type"
//               type="radio"
//               value="restaurant"
//               ref={this.input}
//               checked={this.state.type === 'restaurant'}
//               onChange={this.handleOptionChange}
//             /> Restaurant</label>
//           <img src='https://img.icons8.com/color/48/000000/pizza.png'/>
//         </li>
//         <li>
//           <label>
//             <input
//               name="type"
//               type="radio"
//               value="bar"
//               ref={this.input}
//               checked={this.state.type === 'bar'}
//               onChange={this.handleOptionChange}
//             /> Bar</label>
//           <img src='https://img.icons8.com/plasticine/50/000000/wine-glass.png'/>
//         </li>
//       </ul>
//     </Form.Group>
//   </div>
//   <Button variant="dark" type="submit">
//     Submit
//   </Button>
// </Form>
// <div className="col">
//   <Form.Group controlId="name">
//     <Form.Label></Form.Label>
//     <Form.Control
//       plaintext readOnly
//       type="text"
//       placeholder=""
//       value={this.props.name}
//       onChange={this.handleChange}
//       name="name"
//       required
//     />
//   </Form.Group>
// </div>
// <Form.Group controlId="latitude">
//   <Form.Label></Form.Label>
//   <Form.Control
//     plaintext readOnly
//     type="text"
//     placeholder=""
//     value={this.props.latitude}
//     onChange={this.handleChange}
//     name="latitude"
//     required
//   />
// </Form.Group>
// <Form.Group controlId="longitude">
//   <Form.Label></Form.Label>
//   <Form.Control
//     plaintext readOnly
//     placeholder=""
//     value={this.props.longitude}
//     onChange={this.handleChange}
//     name="longitude"
//     required
//   />
// </Form.Group>
