import React from 'react'
// import Card from '@material-ui/core/Card'
// import CardActionArea from '@material-ui/core/CardActionArea'
// import Movie2 from '../Movies/Movie2'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardActionArea from '@material-ui/core/CardActionArea'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import FavoriteIcon from '@material-ui/icons/Favorite'
import EditIcon from '@material-ui/icons/Edit'
import MoreVertIcon from '@material-ui/icons/MoreVert'
// import Tooltip from '@material-ui/core/Tooltip'
// import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight'
// import CardMedia from '@material-ui/core/CardMedia'
// import { Link } from 'react-router-dom'
// import AddMovieDialog from './AddMovieDialog'

class Genre3 extends React.Component {
  state = {
    genre: '',
    movies: [],
    isEditing: false,
    isHovered: false
  }

  async componentDidMount () {
    try {
      const response = await axios({
        url: `${apiUrl}/genres/${this.props.id}`,
        method: 'GET',
        headers: {
          'Authorization': `Token token=${this.props.user.token}`
        }
      })
      console.log('Got to one genre')
      this.setState({ genre: response.data.genre })
      this.setState({ movies: response.data.genre.movies })
      // this.setState({ userRecipes: response.data.cookbook.recipes })
      // console.log(this.state.genre)
      // console.log(this.state.genre.movies)
      // console.log(this.state.movies)
    } catch (error) {
    }
    console.log(this.state.genre)
  }

  render () {
    // const { genre } = this.state
    // const { genre } = this.state
    // console.log(this.state.genre.movies)
    console.log(this.state.genre)
    console.log(this.state.movies)
    // if (genre) {
    return (
      <div className="layout-style">
        <Card className="card-style">
          <CardActionArea href={`#/genres/${this.state.genre._id}`} style={{ color: 'inherit', textDecoration: 'none' }} >
            <CardContent>
              <div>
                <h3>{this.state.genre.name}</h3>
                <i>{this.state.genre.name}</i>
                <i>Movies in this genre: {this.state.movies.length}</i>
              </div>
            </CardContent>
            <br/>
            <CardActions>
            </CardActions>
            <IconButton aria-label="add to favorites">
              <FavoriteIcon />
            </IconButton>
            <IconButton aria-label="edit" href={`#genres/${this.state.genre._id}/edit`}>
              <EditIcon />
            </IconButton>
            <Button href={`#/genres/${this.state.genre._id}`} style={{ color: 'inherit', textDecoration: 'none' }} className="waves-effect waves-teal btn-flat">View Details
            </Button>
            <IconButton aria-label="more">
              <MoreVertIcon/>
            </IconButton>
          </CardActionArea>
        </Card>
      </div>
    )
  }
  // <div className="row mx-lg-n5">
  //   {this.state.movies.map(movie => (
  //     <Movie2
  //       key={movie.name + movie._id}
  //       handleRefresh={this.handleRefresh}
  //       user={this.props.user}
  //       id={movie._id}
  //       description={movie.description}
  //       released={movie.released}
  //       image={movie.image}
  //       thisstate={this.state}
  //       alert={this.props.alert}
  //       genre={this.genre}
  //     />
  //   ))}
  // </div>
  // return (
  //   'none'
  // )
  // }
}
// return (
//   <div className="mx-auto py-3 px-1">
//     <Card key={genre._id}>
//       <CardActionArea>
//         <div className="card-image">
//           {genre.name}
//         </div>
//       </CardActionArea>
//     </Card>
//   </div>
// )
export default Genre3
