import React from 'react'
import axios from 'axios'
import apiUrl from '../../apiConfig'
// import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import CardActionArea from '@material-ui/core/CardActionArea'
// import Row from 'react-bootstrap/Row'
// import CardHeader from '@material-ui/core/CardHeader'
import IconButton from '@material-ui/core/IconButton'
import FavoriteIcon from '@material-ui/icons/Favorite'
// import EditIcon from '@material-ui/icons/Edit'
import ShareIcon from '@material-ui/icons/Share'
// import MoreVertIcon from '@material-ui/icons/MoreVert'
// import SimpleDateTime from 'react-simple-timestamp-to-date'
// import Rating from '@material-ui/lab/Rating'
// <CardHeader
//   title={
//     <Typography variant="h6">
//       {movie.title}
//     </Typography>
//   }
// />
import CardMedia from '@material-ui/core/CardMedia'
const contentStyle = {
  height: 40,
  overflow: 'scroll',
  padding: 1,
  paddingtop: 2,
  // paddingBottom: 2,
  justifyContent: 'space-evenly'
}
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
      // console.log(this.state.movie)
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
      // <div className="col-12 mx-auto col-md-6 col-lg-3 py-3 px-3 border bg-light">
      return (
        <div className="mx-auto py-3 px-1">
          <Card key={movie._id} style={{ width: '18rem', maxWidth: '21rem' }}>
            <CardActionArea>
              <div className="card-image">
                {
                  movie.image == null
                    ? <CardMedia
                      component="img"
                      alt="alt card image"
                      // height="300"
                      // width="100%"
                      image={'https://i.imgur.com/R7mqXKL.png'}
                      title="card-image"
                    />
                    : <CardMedia
                      component="img"
                      alt="movie poster"
                      // height="300"
                      // width="100%"
                      image={`https://image.tmdb.org/t/p/w185/${movie.image}`}
                      title="Contemplative Reptile"
                    />
                }
              </div>
              <CardContent style={contentStyle}>
                <Typography style={contentStyle} variant="h6">
                  <p> {movie.title} </p>
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <IconButton aria-label="add to favorites">
                <FavoriteIcon />
              </IconButton>
              <IconButton aria-label="share">
                <ShareIcon />
              </IconButton>
              <Button href={`#/movies/${movie._id}`} style={{ color: 'inherit', textDecoration: 'none' }} className="waves-effect waves-teal btn-flat">View Details
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
// <CardContent>
//   <Typography variant="h5" component="h5">
//     {movie.title}
//   </Typography>
// </CardContent>
export default Movie2
// {(this.props.user && movie) && this.props.user._id === movie.owner
//   ? <IconButton aria-label="edit" href={`#movies/${movie._id}/edit`}>
//     <EditIcon />
//   </IconButton>
//   : ''
// }
