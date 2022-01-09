import React from 'react'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import { Redirect, withRouter } from 'react-router-dom'
import CardMedia from '@material-ui/core/CardMedia'
import CardActionArea from '@material-ui/core/CardActionArea'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import EditGenreMenu from './EditGenre/EditGenreMenu'
import CardHeader from '@material-ui/core/CardHeader'

class Genre3 extends React.Component {
  state = {
    genre: '',
    movies: [],
    isEditing: false,
    isHovered: false,
    deleted: false
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
      // console.log('Got to one genre')
      this.setState({ genre: response.data.genre })
      this.setState({ movies: response.data.genre.movies })
      // this.setState({ userRecipes: response.data.cookbook.recipes })
      // console.log(this.state.genre)
      // console.log(this.state.genre.movies)
      // console.log(this.state.movies)
    } catch (error) {
    }
    console.log('rendered from Genre3')
  }
  handleDelete = () => {
    // event.preventDefault()
    axios.delete(`${apiUrl}/genres/${this.state.genre._id}`,
      {
        headers: {
          'Authorization': `Bearer ${this.props.user.token}`
        },
        data: {
          genre: this.state.genre
        }
      })
      .then(() => this.setState({ deleted: true }))
      // .then(response => {
      //   this.props.history.push('/genres')
      // })
      // .then(() => this.props.history.replace('/genres'))
    // this.props.history.replace('/genres')
    console.log('deleted genre')
    // this.forceUpdate()
    // this.props.deleted.push('true')
    // .then(() => router.push('/some/route'))
    // router.push('/genres')
    // this.props.history.push('/genres')
    // .then(() => this.props.history.push('/genres'))
  }

  render () {
    const { deleted } = this.state
    if (deleted) {
      return <Redirect to={
        {
          pathname: '/genres/'
        }
      }/>
    }
    // console.log(this.state.genre)
    // console.log(this.state.genre._id)
    // console.log(this.state.genre)
    // console.log(this.state.movies)
    return (
      <div>
        <Card className="card-style my-3 mx-3">
          <CardContent style={{ display: 'flex', backgroundColor: 'AliceBlue' }}>
            <CardActionArea href={`#/genres/${this.state.genre._id}`} style={{ color: 'inherit', textDecoration: 'none' }} >
              <CardHeader
                // action={
                //   <EditGenreMenu id={this.state.genre._id} genre={this.state.genre} user={this.props.user} deleteGenre={this.handleDelete}/>
                // }
                title={this.state.genre.name}
                subheader={`${this.state.movies.length} movies`}
                // subheader=`"movies in this genre:" +${this.state.movies.length}`
                // subheader="movies"
              />
            </CardActionArea>
            <div style={{ float: 'right', marginTop: '20px' }}>
              <EditGenreMenu id={this.state.genre._id} genre={this.state.genre} user={this.props.user} deleteGenre={this.handleDelete}/>
            </div>
          </CardContent>
          <div style={{ display: 'flex', overflow: 'scroll', margin: '0px 10px 15px', padding: '5px' }}>
            {this.state.movies.map(movie => (
              movie.image == null
                ? <CardMedia
                  key={movie._id}
                  component="img"
                  alt="Contemplative Reptile"
                  className="genrePosterPreview"
                  // height="300"
                  // width="100%"
                  image={'https://i.imgur.com/R7mqXKL.png'}
                  // style={PosterPreviewStyle}
                  // width="278px !important"
                  // style={{ width: '278px !important' }}
                  // style={{ MuiCardMediaMedia: { width: 'auto !important' } }}
                  // title="card-image"
                />
                : <CardMedia
                  key={movie._id}
                  component="img"
                  alt="Contemplative Reptile"
                  className="genrePosterPreview"
                  // height="300"
                  // width="100%"
                  image={`https://image.tmdb.org/t/p/w185/${movie.image}`}
                  // width="auto !important"
                  // style={PosterPreviewStyle}
                  // style={{ MuiCardMediaMedia: { width: 'auto !important' } }}
                  // title="Contemplative Reptile"
                />
            ))}
          </div>
        </Card>
      </div>
    )
  }
  // <CardActions>
  //   <Tooltip title="New Genre">
  //     <EditGenreDialog id={this.state.genre._id} genre={this.state.genre} user={this.props.user} />
  //   </Tooltip>
  //   <Button href={`#/genres/${this.state.genre._id}`} style={{ color: 'inherit', textDecoration: 'none' }} className="waves-effect waves-teal btn-flat">View Details
  //   </Button>
  //   <IconButton aria-label="more">
  //     <MoreVertIcon/>
  //   </IconButton>
  //   <StarIcon/>
  //   <IconButton aria-label="add to favorites">
  //     <FavoriteIcon />
  //   </IconButton>
  // </CardActions>
  // <IconButton aria-label="edit" href={`#genres/${this.state.genre._id}/edit`}>
  //   <EditIcon />
  // </IconButton>
  // <Button
  //   variant="outlined" id={this.state.genre._id} onClick={this.handleDelete}>Delete The Genre</Button>
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
export default withRouter(Genre3)
