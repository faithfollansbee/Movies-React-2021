import React, { Component, Fragment } from 'react'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import { Link } from 'react-router-dom'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'

import FormControl from 'react-bootstrap/FormControl'
// import ListGroup from 'react-bootstrap/ListGroup'
import Container from '@material-ui/core/container'
import Row from 'react-bootstrap/Row'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

// import Row from 'react-bootstrap/Row'
import CardHeader from '@material-ui/core/CardHeader'
import IconButton from '@material-ui/core/IconButton'
import FavoriteIcon from '@material-ui/icons/Favorite'
import EditIcon from '@material-ui/icons/Edit'
import MoreVertIcon from '@material-ui/icons/MoreVert'
// import AddGenre from './AddGenre'

const cardStyle = {
  // width: 285,
  margin: 1,
  padding: 10,
  textAlign: 'center',
  marginBottom: 12,
  hover: 'red',
  overflowWrap: 'break-word',
  wordWrap: 'break-word'
  // alignItems: 'flex-start'
}

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
      <Card key={genre._id} style={cardStyle} className="card-style">
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
          <Link id={genre._id} to={`/genres/${genre._id}`}> View details</Link>
          <Button variant="outlined">
            <Link id={genre._id} to={`/genres/${genre._id}`}> View details</Link>
          </Button>
        </CardActions>
      </Card>
    ))

    return (
      <Container>
        <div>
          <h3 className="title-style">Your genres</h3>
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
        </div>
        <div>
          <div>
            <Row className="row-style">
              {genresJSX}
            </Row>
          </div>
        </div>
      </Container>
    )
  }
}
export default Genres
