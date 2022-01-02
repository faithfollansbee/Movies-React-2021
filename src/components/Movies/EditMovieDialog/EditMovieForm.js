import React, { Component } from 'react'
import axios from 'axios'
import apiUrl from '../../../apiConfig'
import { withRouter, Redirect } from 'react-router-dom'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import Form from 'react-bootstrap/Form'
import Button from '@material-ui/core/Button'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import DialogActions from '@material-ui/core/DialogActions'
class EditMovieForm extends Component {
  constructor (props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.state = {
      user: props.user,
      genres: [],
      userGenres: [],
      saved: this.props.saved,
      filtered: false,
      movie: {
        title: props.title,
        description: props.description,
        released: props.released,
        image: props.image,
        genre: props.genre
      }
    }
  }
  closeMovieInfo = event => {
    this.setState({ currentMovie: null })
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
      url: `${apiUrl}/movies/${this.props.id}`,
      headers: {
        'Authorization': `Token token=${this.props.user.token}`
      },
      data: {
        movie: { // movie: this.state.movie
          title: this.props.title,
          description: this.props.description,
          released: this.props.released,
          image: this.props.image,
          genre: this.state.genre
        }
      }
    })
      .then(response => {
        this.props.history.push(`/movies${this.props.id}`)
      })
      // if editting from specific genre, should redirect to that same genre. if editting from
      // genre list, redirect to all genres
      .then(response => {
        this.props.history.push('/movies')
      })
    this.props.handleSubmitClose()
  }

  handleOptionChange = changeEvent => {
    this.setState({
      genre: changeEvent.target.value
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
    const { saved } = this.state
    if (saved) {
      return <Redirect to={
        {
          pathname: '/search'
        }
      }/>
    }
    const genresJsx = this.state.genres.map(genre => (
      <div key={genre._id}>
        <RadioGroup name="genre" value={genre.id} >
          <FormControlLabel value={genre._id} control={<Radio />} checked={this.state.genre === genre._id} label={genre.name} onChange={this.handleOptionChange}/>
        </RadioGroup>
      </div>
    ))
    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group controlId="genre">
            { genresJsx }
            <DialogActions>
              <Button onClick={this.props.handleSubmitClose} color="primary">Close</Button>
              <Button color="primary" type="submit">
                  Submit
              </Button>
            </DialogActions>
          </Form.Group>
        </Form>
      </div>
    )
  }
}
export default withRouter(EditMovieForm)

// import React from 'react'
// import Form from 'react-bootstrap/Form'
// import Button from '@material-ui/core/Button'
// const MovieForm = ({ movie, title, genre, handleChange, handleSubmit, handleSubmitClose }) => (
//   <Form onSubmit={handleSubmit}>
//     <Form.Group controlId="name">
//       <Form.Label>Movie title</Form.Label>
//       <Form.Control
//         type="text"
//         // placeholder={genre.name}
//         defaultValue={title}
//         // value={genre.name}
//         onChange={handleChange}
//         name="name"
//         required
//       />
//     </Form.Group>
//     <Form.Group controlId="genre">
//       <Form.Label>genre</Form.Label>
//       <Form.Control
//         type="text"
//         // placeholder={genre.name}
//         defaultValue={genre}
//         // value={genre.name}
//         onChange={handleChange}
//         name="genre"
//         required
//       />
//     </Form.Group>
//     <Button variant="dark" type="submit">
//       Submit
//     </Button>
//     <Button onClick={handleSubmitClose} color="primary">Close</Button>
//   </Form>
// )
// export default MovieForm
