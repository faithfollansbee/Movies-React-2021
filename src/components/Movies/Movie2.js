import React from 'react'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
// import Row from 'react-bootstrap/Row'
import CardHeader from '@material-ui/core/CardHeader'
import IconButton from '@material-ui/core/IconButton'
import FavoriteIcon from '@material-ui/icons/Favorite'
import EditIcon from '@material-ui/icons/Edit'
import ShareIcon from '@material-ui/icons/Share'
import MoreVertIcon from '@material-ui/icons/MoreVert'
// import SimpleDateTime from 'react-simple-timestamp-to-date'
// import Rating from '@material-ui/lab/Rating'

class Movie2 extends React.Component {
  state = {
    movie: null,
    isEditing: false
  }

  async componentDidMount () {
    try {
      const response = await axios({
        url: `${apiUrl}/movies/${this.props.id}`,
        method: 'GET',
        headers: {
          'Authorization': `Token token=${this.props.user.token}`
        }
      })
      this.setState({ movie: response.data.movie })
      // this.setState({ userRecipes: response.data.cookbook.recipes })
      console.log(this.state.movie)
    } catch (error) {
    }
  }

  render () {
    const { movie } = this.state

    // const deletebutton = (
    //   <React.Fragment>
    //     <Button className="recipeDeleteButton" onClick={this.handleRecipeDelete}>Delete<i className="fas fa-trash-alt"></i></Button>
    //   </React.Fragment>
    // )
    if (movie) {
      return (
        <div>
          <Card key={movie._id} className="card-style">
            <CardHeader
              action={
                <IconButton aria-label="settings">
                  <MoreVertIcon />
                </IconButton>
              }
              // title={movie.name}
              title={movie.title}
              subheader={movie.released}
            />

            <CardContent className="content">
              <Typography>{movie.steps}</Typography>
            </CardContent>
            <br/>
            <CardActions>
              <IconButton aria-label="add to favorites">
                <FavoriteIcon />
              </IconButton>
              <IconButton aria-label="share">
                <ShareIcon />
              </IconButton>
              {(this.props.user && movie) && this.props.user._id === movie.owner
                ? <IconButton aria-label="edit" href={`#movies/${movie._id}/edit`}>
                  <EditIcon />
                </IconButton>
                : ''
              }
              <Button>
                <Link id={movie._id} className="link-style" to={`/movies/${movie._id}`}> View details</Link>
                <a href="" className="waves-effect waves-teal btn-flat"></a>
              </Button>
            </CardActions>
          </Card>
        </div>
      )
    }
    return (
      'no'
    )
  }
}

export default Movie2
