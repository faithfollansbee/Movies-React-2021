// import React, { Component } from 'react'
// import axios from 'axios'
// import apiUrl from '../../apiConfig'
// import { withRouter, Redirect } from 'react-router-dom'
// import Radio from '@material-ui/core/Radio'
// import RadioGroup from '@material-ui/core/RadioGroup'
// import Form from 'react-bootstrap/Form'
// import Button from 'react-bootstrap/Button'
// import FormControlLabel from '@material-ui/core/FormControlLabel'

// class SaveMovie extends Component {
//   constructor (props) {
//     super(props)
//     this.handleChange = this.handleChange.bind(this)
//     this.handleSubmit = this.handleSubmit.bind(this)
//     this.state = {
//       user: this.props.user,
//       genres: [],
//       userGenres: [],
//       saved: this.props.saved,
//       filtered: false,
//       movie: {
//         title: props.title,
//         description: props.description,
//         released: props.released,
//         image: props.image,
//         genre: ''
//       }
//     }
//   }
//   closeMovieInfo = event => {
//     this.setState({ currentMovie: null })
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
//       method: 'POST',
//       url: `${apiUrl}/movies`,
//       headers: {
//         'Authorization': `Token token=${this.props.user.token}`
//       },
//       data: {
//         movie: {
//           title: this.props.title,
//           description: this.props.description,
//           released: this.props.released,
//           image: this.props.image,
//           genre: this.state.genre
//         }
//       }
//     })
//       .then(response => {
//         this.props.history.push(`/movies/${response.data.movie._id}`)
//       })
//       .then(() => this.props.history.push('/movies'))
//       .catch(err => this.setState({ error: err.message }))
//   }
//   handleOptionChange = changeEvent => {
//     this.setState({
//       genre: changeEvent.target.value
//     })
//   }
//   async componentDidMount () {
//     try {
//       const response = await axios({
//         url: `${apiUrl}/genres`,
//         method: 'GET',
//         headers: {
//           Authorization: `Token token=${this.props.user.token}`
//         }
//       })
//       this.setState({ genres: response.data.genres, isLoading: false })
//       this.setState({ userGenres: response.data.genres })
//     } catch (error) {
//     }
//   }

//   render (props) {
//     const { saved } = this.state
//     if (saved) {
//       return <Redirect to={
//         {
//           pathname: '/search'
//         }
//       }/>
//     }
    
//     const genresJsx = this.state.genres.map(genre => (
//       <div key={genre._id}>
//         <RadioGroup name="genre" value={genre.id}>
//           <FormControlLabel value={genre._id} control={<Radio />} checked={this.state.genre === genre._id} label={genre.name} onChange={this.handleOptionChange}/>
//         </RadioGroup>
//       </div>
//     ))

//     return (
//       <div>
//         <Form onSubmit={this.handleSubmit}>
//           <Form.Group controlId="genre">
//             { genresJsx }
//             <Button variant="dark" type="submit">
//                 Submit
//             </Button>
//           </Form.Group>
//         </Form>
//       </div>
//     )
//   }
// }
// export default withRouter(SaveMovie)

// <MovieForm
//   movie={this.state.movie}
//   genres={this.state.genres}
//   // genresJsx={this.genresJsx}
//   handleMovieSubmit={this.handleSubmit}
//   handleChange={this.handleChange}
//   handleOptionChange={this.handleOptionChange}
//   correctRoute={this.props.match.params.id}
// />
// <Form onSubmit={this.handleSubmit}>
//   <Form.Group controlId="formBasicCheckbox">
//     <ul>
//       { genresJsx }
//     </ul>
//     <Button variant="dark" type="submit">
//         Submit
//     </Button>
//   </Form.Group>
// </Form>
// <Form onSubmit={this.handleSubmit}>
//   <div className="col">
//     <Form.Group controlId="formBasicCheckbox">
//       <ul>
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
