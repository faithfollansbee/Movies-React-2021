import React, { Component, Fragment } from 'react'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardActionArea from '@material-ui/core/CardActionArea'
import Fab from '@material-ui/core/Fab'
import Tooltip from '@material-ui/core/Tooltip'

import FormControl from 'react-bootstrap/FormControl'
// import ListGroup from 'react-bootstrap/ListGroup'
// import Container from '@material-ui/core/container'
// import Row from 'react-bootstrap/Row'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import AddIcon from '@material-ui/icons/Add'

// import Row from 'react-bootstrap/Row'
import CardHeader from '@material-ui/core/CardHeader'
import IconButton from '@material-ui/core/IconButton'
import FavoriteIcon from '@material-ui/icons/Favorite'
import EditIcon from '@material-ui/icons/Edit'
import MoreVertIcon from '@material-ui/icons/MoreVert'
// import AddGenre from './AddGenre'

const fabStyle2 = {
  // position: 'relative',
  // bottom: 70,
  // left: 90
}
const fabStyle3 = {
  // position: 'relative',
  // bottom: 70,
  // left: 90
}
// const cardStyle = {
// margin: 1,
// padding: 10,
// textAlign: 'center',
// marginBottom: 12,
// hover: 'red',
// overflowWrap: 'break-word',
// wordWrap: 'break-word'
// }

class Genres extends Component {
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
    const { userGenres } = this.state
    console.log(this.state)
    const genresJSX = userGenres.map(genre => (
      <Card key={genre._id} className="card-style">
        <CardActionArea>
          <CardHeader
            action={
              <IconButton aria-label="settings">
                <MoreVertIcon />
              </IconButton>
            }
            title={genre.name}
          />
          <CardContent>
            <Typography></Typography>
          </CardContent>
          <br/>
          <CardActions>
            <IconButton aria-label="add to favorites">
              <FavoriteIcon />
            </IconButton>
            <IconButton aria-label="edit" href={`#genres/${genre._id}/edit`}>
              <EditIcon />
            </IconButton>
            <Button href={`#/genres/${genre._id}`} style={{ color: 'inherit', textDecoration: 'none' }} className="waves-effect waves-teal btn-flat">View Details
            </Button>
          </CardActions>
        </CardActionArea>
      </Card>
    ))

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
            <Fab style={fabStyle2} size="small" className='hidden-button floating waves-effect waves-light' color="grey" aria-label="add" >
              <Tooltip title="New Genre">
                <AddIcon />
              </Tooltip>
            </Fab>
            <Fab style={fabStyle3} size="small" className='hidden-button floating waves-effect waves-light' color="grey" aria-label="edit" >
              <Tooltip title="Edit">
                <EditIcon />
              </Tooltip>
            </Fab>
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
            {genresJSX}
          </div>
        </Fragment>
      </div>
    )
  }
}
export default Genres
