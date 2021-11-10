import React, { Component, Fragment } from 'react'
import axios from 'axios'
import apiUrl from '../../apiConfig'
// import Fab from '@material-ui/core/Fab'
import Tooltip from '@material-ui/core/Tooltip'
import FormControl from 'react-bootstrap/FormControl'
import Spinner from 'react-bootstrap/Spinner'

import AddIcon from '@material-ui/icons/Add'
import EditIcon from '@material-ui/icons/Edit'
import Genre3 from './Genre3'
// import Genre3 from './Genre3'
// import AddGenre from './AddGenre'
// import AddGenre from './AddGenre'

// const fabStyle2 = {
// }
// const fabStyle3 = {
// }
// const cardStyle = {
// margin: 1,
// padding: 10,
// textAlign: 'center',
// marginBottom: 12,
// hover: 'red',
// overflowWrap: 'break-word',
// wordWrap: 'break-word'
// }

class GenresLoop extends Component {
  constructor (props) {
    super(props)

    this.state = {
      genres: [],
      userGenres: [],
      isLoading: true,
      filtered: false
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
  }

  handleFilter = event => {
    event.preventDefault()
    this.setState({ filtered: !this.state.filtered })
  }
  handleChange = event => {
    const searchString = event.target.value.toLowerCase()
    const queryLength = searchString.length
    const prevQueryLength = this.state.queryLength || 0
    const genres = queryLength > prevQueryLength ? this.state.userGenres : this.state.genres

    const searchResults = genres.filter(genre => genre.name.toLowerCase().includes(searchString))

    this.setState({ userGenres: searchResults, queryLength: queryLength })
  }

  render (props) {
    // const { genres } = this.state
    console.log(this.state.genres)
    if (this.state.isLoading) {
      return (
        <div className="text-center">
          <Spinner animation="border" variant="primary" />
        </div>
      )
    }
    // console.log(this.state)
    // console.log('genres detail', this.state.genres)
    // console.log('number of genres', this.state.genres.length)
    // console.log('my first genre', this.state.genres[1])
    // console.log('each genre movies count', this.state.genres.movie)
    // console.log('genre id', this.state.userGenres[1])
    // console.log('genre id', this.state.genres[1])

    return (
      <div className="layout-style">
        <Fragment>
          <h2 className="title-style">Your genres</h2>
          <div>
            <Tooltip title="New Genre">
              <AddIcon />
            </Tooltip>
            <Tooltip title="Edit">
              <EditIcon />
            </Tooltip>
          </div>
          <div className="search">
            {
              <Fragment>
                <FormControl
                  placeholder="Search"
                  aria-label="Search"
                  onChange={this.handleChange}
                />
              </Fragment>
            }
          </div>
          <div>
            {this.state.genres.map(genre => (
              <Genre3
                key={genre.name + genre._id}
                user={this.props.user}
                id={genre._id}
                name={genre.name}
                // handleRefresh={this.handleRefresh}
                // description={movie.description}
                // released={movie.released}
                // image={movie.image}
                // thisstate={this.state}
                // alert={this.props.alert}
                // genre={this.genre}
              />
            ))}
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
