import React, { Component, Fragment } from 'react'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import Tooltip from '@material-ui/core/Tooltip'
import FormControl from 'react-bootstrap/FormControl'
import Spinner from 'react-bootstrap/Spinner'
import Genre3 from './Genre3'
import AddGenreDialog from './AddGenre/AddGenreDialog'

class GenresLoop extends Component {
  constructor (props) {
    super(props)

    this.state = {
      genres: [],
      userGenres: [],
      isLoading: true,
      filtered: false,
      deleted: false
    }
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
    console.log('rendered from GenresLoop')
  }

  handleFilter = event => {
    event.preventDefault()
    this.setState({ filtered: !this.state.filtered })
  }
  handleGenreSearchChange = event => {
    const searchString = event.target.value.toLowerCase()
    const queryLength = searchString.length
    const prevQueryLength = this.state.queryLength || 0
    const genres = queryLength > prevQueryLength ? this.state.userGenres : this.state.genres

    const searchResults = genres.filter(genre => genre.name.toLowerCase().includes(searchString))

    this.setState({ userGenres: searchResults, queryLength: queryLength })
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
      method: 'POST',
      url: `${apiUrl}/genres`,
      headers: {
        'Authorization': `Token token=${this.props.user.token}`
      },
      data: {
        genre: {
          name: this.props.name
        }
      }
    })
      .then(response => {
        this.props.history.push('/genres')
      })
      .then(() => this.props.history.push('/genres'))

      .catch(err => this.setState({ error: err.message }))
    // this.props.handleSubmitClose()
  }
  // originally from Genre3 component, need GenresLoop to rerender after delete
  // handleDelete = () => {
  //   axios.delete(`${apiUrl}/genres/${this.props.id}`,
  //     {
  //       headers: {
  //         'Authorization': `Bearer ${this.props.user.token}`
  //       },
  //       data: {
  //         genre: this.state.genre
  //       }
  //     })
  //     .then(() => this.setState({ deleted: true }))
  //     // .then(response => {
  //     //   this.props.history.push('/genres')
  //     // })
  //     // .then(() => this.props.history.replace('/genres'))
  //   // this.props.history.replace('/genres')
  //   console.log('deleted genre')
  //   // .then(() => router.push('/some/route'))
  //   // router.push('/genres')
  //   // this.props.history.push('/genres')
  //   // .then(() => this.props.history.push('/genres'))
  // }

  render (props) {
    console.log('genres', this.state.genres)
    // const { userGenres } = this.state
    // console.log('genres', this.state.genres)
    // const { genres } = this.state
    // console.log('this.props.user', this.props.user)
    if (this.state.isLoading) {
      return (
        <div className="text-center">
          <Spinner animation="border" variant="primary" />
        </div>
      )
    }
    // else if (this.state.genres.length === 0) {
    //   return (
    //     <div>no genres to see here</div>
    //   )
    // }
    let genreStatus

    if (!this.state.genres.length) {
      genreStatus = (
        <div className="noGenres">No genres added yet. get started! </div>
      )
    }
    // { this.state.genres ? return() <div></div> : }
    // console.log(this.state)
    // console.log('genres detail', this.state.genres)
    // console.log('number of genres', this.state.genres.length)
    // console.log('my first genre', this.state.genres[1])
    // console.log('each genre movies count', this.state.genres.movie)
    // console.log('genre id', this.state.userGenres[1])
    // console.log('genre id', this.state.genres[1])
    // <Tooltip title="New Genre">
    //   <Fab style={fabStyle} className='hidden-button floating waves-effect waves-light' color="grey" aria-label="more" >
    //     <AddGenreDialog user={this.props.user} style={{ color: 'white', textDecoration: 'none' }}/>
    //   </Fab>
    // </Tooltip>
    return (
      <div className="layout-style">
        <Fragment>
          <h2 className="title-style">Your genres</h2>
          <div>
            <Tooltip title="New Genre">
              <span>
                <AddGenreDialog user={this.props.user} />
              </span>
            </Tooltip>
          </div>
          <div className="search">
            {
              <Fragment>
                <FormControl
                  placeholder="Search"
                  aria-label="Search"
                  onChange={this.handleGenreSearchChange}
                />
              </Fragment>
            }
          </div>
          <div>
            {this.state.userGenres.map(genre => (
              <Genre3
                key={genre._id}
                // key={genre.name + genre._id}
                user={this.props.user}
                id={genre._id}
                name={genre.name}
                // handleDelete={this.handleDelete}
                // handleRefresh={this.handleRefresh}
                // description={movie.description}
                // released={movie.released}
                // image={movie.image}
                // thisstate={this.state}
                // alert={this.props.alert}
                genre={this.genre}
              />
            ))}
            {genreStatus}
          </div>
        </Fragment>
      </div>
    )
  }
}
export default GenresLoop
// <Fab href="#creategenre" to="/creategenre" style={fabStyle2} size="small" className='hidden-button floating waves-effect waves-light' color="grey" aria-label="add" >
//   <Tooltip title="New Genre">
//     <AddIcon />
//   </Tooltip>
// </Fab>
// <Fab style={fabStyle3} size="small" className='hidden-button floating waves-effect waves-light' color="grey" aria-label="edit" >
//   <Tooltip title="Edit">
//     <EditIcon />
//   </Tooltip>
// </Fab>
