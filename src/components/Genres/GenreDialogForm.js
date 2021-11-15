import React, { Component } from 'react'
// import axios from 'axios'
// import apiUrl from '../../apiConfig'
import { withRouter, Redirect } from 'react-router-dom'
// import Radio from '@material-ui/core/Radio'
// import RadioGroup from '@material-ui/core/RadioGroup'
import Button from '@material-ui/core/Button'
// import FormControlLabel from '@material-ui/core/FormControlLabel'
import DialogActions from '@material-ui/core/DialogActions'
import Form from 'react-bootstrap/Form'

class CreateGenreForm extends Component {
  constructor (props) {
    super(props)
    // this.handleChange = this.handleChange.bind(this)
    // this.handleSubmit = this.handleSubmit.bind(this)
    this.state = {
      user: this.props.user,
      // genres: [],
      // userGenres: [],
      saved: this.props.saved,
      // saved: false,
      // isLoading: true,
      // filtered: false,
      genre: {
        name: ''
      },
      submitted: false
      // user: this.props.user
    }
  }
  closeMovieInfo = event => {
    this.setState({ currentGenre: null })
  }
  // handleChange = event => {
  //   this.setState({
  //     genre: {
  //       ...this.state.genre,
  //       [event.target.name]: event.target.value
  //     }
  //   })
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
  //     //   this.props.history.push(`/genres${response.data.genre._id}`)
  //     // })
  //     .then(response => {
  //       this.props.history.push('/genres')
  //     })
  //     // .then(() => this.props.history.push('/genres'))
  //     .catch(err => this.setState({ error: err.message }))
  //   this.props.handleSubmitClose()
  // }
  // handleOptionChange = changeEvent => {
  //   this.setState({
  //     genre: changeEvent.target.value
  //   })
  // }
  // async componentDidMount () {
  //   try {
  //     const response = await axios({
  //       url: `${apiUrl}/genres`,
  //       method: 'GET',
  //       headers: {
  //         Authorization: `Token token=${this.props.user.token}`
  //       }
  //     })
  //     this.setState({ genres: response.data.genres, isLoading: false })
  //     this.setState({ userGenres: response.data.genres })
  //   } catch (error) {
  //   }
  // }

  render (props) {
    console.log(this.state.user)
    console.log(this.props.user)
    console.log(this.user)
    // const { genresJsx } = this.state
    // console.log(this.state)
    const { saved } = this.state
    console.log(this.saved)
    console.log(this.state.user)
    if (saved) {
      return <Redirect to={
        {
          pathname: '/search'
        }
      }/>
    }

    // const genresJsx = this.state.genres.map(genre => (
    //   <div key={genre._id}>
    //     <RadioGroup name="genre" value={genre.id} >
    //       <FormControlLabel value={genre._id} control={<Radio />} checked={this.state.genre === genre._id} label={genre.name} onChange={this.handleOptionChange}/>
    //     </RadioGroup>
    //   </div>
    // ))
    return (
      <div>
        <Form onSubmit={this.props.handleSubmit} user={this.props.user}>
          <Form.Group controlId="name">
            <Form.Label>Genre title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter a name"
              // value={genre.name}
              onChange={this.props.handleChange}
              name="name"
              required
            />
          </Form.Group>
          <DialogActions>
            <Button onClick={this.props.handleSubmitClose} color="primary">Close</Button>
            <Button color="primary" type="submit">
                Submit
            </Button>
          </DialogActions>
        </Form>
      </div>
    )
  }
}
// <Form.Group controlId="genre">
//   <DialogActions>
//     <Button onClick={this.props.handleSubmitClose} color="primary">Close</Button>
//     <Button color="primary" type="submit">
//         Submit
//     </Button>
//   </DialogActions>
// </Form.Group>
export default withRouter(CreateGenreForm)
