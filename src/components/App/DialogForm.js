import React, { Component } from 'react'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import { withRouter, Redirect } from 'react-router-dom'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import Form from 'react-bootstrap/Form'
import Button from '@material-ui/core/Button'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import DialogActions from '@material-ui/core/DialogActions'

class SaveMovie extends Component {
  constructor (props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.state = {
      user: this.props.user,
      genres: [],
      userGenres: [],
      saved: this.props.saved,
      filtered: false,
      movie: {
        title: props.title,
        description: props.description,
        released: props.released,
        image: props.image,
        genre: '',
        categories: props.categories,
        runtime: props.runtime,
        tagline: props.tagline,
        revenue: props.revenue,
        budget: props.budget
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
      method: 'POST',
      url: `${apiUrl}/movies`,
      headers: {
        'Authorization': `Token token=${this.props.user.token}`
      },
      data: {
        movie: {
          title: this.props.title,
          description: this.props.description,
          released: this.props.released,
          image: this.props.image,
          genre: this.state.genre,
          categories: this.props.categories,
          runtime: this.props.runtime,
          tagline: this.props.tagline,
          revenue: this.props.revenue,
          budget: this.props.budget
        }
      }
    })
      .then(response => {
        this.props.history.push(`/movies/${response.data.movie._id}`)
      })
      .then(() => this.props.history.push('/movies'))
      .catch(err => this.setState({ error: err.message }))
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
    // <label>
    //   <input
    //     name="genre"
    //     type="radio"
    //     value={genre._id}
    //     ref={this.input}
    //     checked={this.state.genre === genre._id}
    //     onChange={this.handleOptionChange}
    //   />{genre.name}</label>
    // <RadioGroup aria-label="genre" name="genre" value={genre._id} >
    const genresJsx = this.state.genres.map(genre => (
      <div key={genre._id}>
        <RadioGroup name="genre" value={genre.id} >
          <FormControlLabel value={genre._id} control={<Radio />} checked={this.state.genre === genre._id} label={genre.name} onChange={this.handleOptionChange}/>
        </RadioGroup>
      </div>
      // <Form.Select aria-label="Default select example">
      //   <option>Open this select menu</option>
      //   <option value="1">One</option>
      //   <option value="2">Two</option>
      //   <option value="3">Three</option>
      // </Form.Select>
    ))
    // if (this.state.isLoading) {
    //   return (
    //     <div className="text-center">
    //       <Spinner animation="border" variant="primary" />
    //     </div>
    //   )
    // }
    // <FormLabel component="legend">Genre</FormLabel>
    // onSubmit={this.handleSubmit}
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

export default withRouter(SaveMovie)
