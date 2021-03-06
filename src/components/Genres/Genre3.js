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
      this.setState({ genre: response.data.genre })
      this.setState({ movies: response.data.genre.movies })
    } catch (error) {
    }
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
    // console.log('location', this.props.location)
    // console.log('history', this.props.history)
    // console.log(this.props)
    // console.log(this.props.match.url)
    // this.props.location.pathname
    // this.props.history.go(this.props.location.pathname)
    // this.props.history.go()
    // .then(response => {
    //   this.props.history.push('/genres')
    // })
    // .then(() => this.props.history.replace('/genres'))
    // this.props.history.replace('/genres')
    // .then(() => this.forceUpdate())
    // .then(response => {
    //   this.props.history.goBack()
    // })
    // this.props.deleted.push('true')
    // .then(() => router.push('/some/route'))
    // router.push(this.props.location.pathname)
    // .then(() => this.props.history.push('/genres'))
  }

  render () {
    const { deleted, movies, genre } = this.state
    if (deleted) {
      return <Redirect to={
        {
          // pathname: '/genres/'
          pathname: this.props.location.pathname
        }
      }/>
    }
    return (
      <div>
        <Card className="card-style my-3">
          <CardContent style={{ display: 'flex', backgroundColor: 'AliceBlue', padding: '6px 4px 0px 0px' }}>
            <CardActionArea href={`#/genres/${this.state.genre._id}`} style={{ color: 'inherit', textDecoration: 'none' }} >
              <CardHeader
                // action={
                //   <EditGenreMenu id={this.state.genre._id} genre={this.state.genre} user={this.props.user} deleteGenre={this.handleDelete}/>
                // }
                title={genre.name}
                // subheader={`${this.state.movies.length} movies`}
                subheader={ movies.length === 1 ? (<div>{movies.length} movie</div>) : (<div>{movies.length} movies</div>) }
              />
            </CardActionArea>
            <div style={{ float: 'right', marginTop: '15px' }}>
              <EditGenreMenu id={genre._id} genre={genre} user={this.props.user} deleteGenre={this.handleDelete}/>
            </div>
          </CardContent>
          <div style={{ display: 'flex', overflow: 'scroll', paddingBottom: '5px', margin: '0px 5px' }}>
            {movies.map(movie => (
              movie.image == null
                ? <CardMedia
                  key={movie._id}
                  component="img"
                  alt={movie.title}
                  className="genrePosterPreview"
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
                  alt={movie.title}
                  className="genrePosterPreview"
                  height="250"
                  // image={'https://i.imgur.com/R7mqXKL.png'}
                  image={`https://image.tmdb.org/t/p/w500/${movie.image}`}
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
