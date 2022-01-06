import React from 'react'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import FavoriteIcon from '@material-ui/icons/Favorite'
import Fab from '@material-ui/core/Fab'
import Tooltip from '@material-ui/core/Tooltip'
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight'
import CardMedia from '@material-ui/core/CardMedia'
import Collapse from '@material-ui/core/Collapse'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

const fabStyle1 = {
  bottom: 55,
  left: 40
}
const fabStyle2 = {
  bottom: 55,
  left: 70
}
const fabStyle3 = {
  bottom: 55,
  left: 100
}
const fabRowStyle = {
  display: 'flex',
  justifyContent: 'space-evenly',
  position: 'absolute'
}

// const contentStyle = {
//   height: 40,
//   overflow: 'scroll',
//   padding: 1,
//   paddingtop: 2,
//   // paddingBottom: 2,
//   justifyContent: 'space-evenly'
// }
class Movie2 extends React.Component {
  state = {
    movie: null,
    isEditing: false,
    isHovered: false,
    // expand: false
    expanded: {}
  }
  handleExpandClick = () => {
    this.setState({ expand: !this.state.expand })
  }
  // handleExpandClick = (id) => {
  //   this.setState({ expanded: ...this.state.expanded, [id] : true })
  // }
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
  onMouseOver = () => {
    console.log('moused over')
    // this.setState({ cardHovered: true })
    this.setState({ isHovered: 'true' })
  }
  onMouseOut = () => {
    // console.log('moused out')
    this.setState({ isHovered: 'false' })
  }
  // cardHovered = {
  //   position: 'relative',
  //   transform: 'scale(1.2)',
  //   zIndex: 10
  // }
  render () {
    const { movie, expanded } = this.state
    // const styles = {
    //   isHovered: {
    //     position: 'relative',
    //     transform: 'scale(1.2)',
    //     zIndex: 10,
    //     '&:hover .hidden-button': {
    //       display: 'flex'
    //       // zIndex: '5'
    //     }
    //   },
    //   notHovered: {
    //     width: '18rem',
    //     maxWidth: '21rem',
    //     zIndex: -1,
    //     transition: 'transform 0.2s ease-in-out',
    //     '& .hidden-button': {
    //       display: 'none'
    //     }
    //     // '&:hover .hidden-button': {
    //     //   display: 'flex'
    //     //   // zIndex: '5'
    //     // }
    //   }
    // }
    // const deletebutton = (
    //   <React.Fragment>
    //     <Button className="recipeDeleteButton" onClick={this.handleRecipeDelete}>Delete<i className="fas fa-trash-alt"></i></Button>
    //   </React.Fragment>
    // )
    if (movie) {
      // <div className="col-12 mx-auto col-md-6 col-lg-3 py-3 px-3 border bg-light">
      // style={this.isHovered ? styles.isHovered : styles.notHovered }
      return (
        <div className="mx-auto py-3 px-1">
          <Card className="hoverCardStyle" key={movie._id} onMouseOver={this.onMouseOver} onMouseOut={this.onMouseOut}>
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
              <div style={fabRowStyle}>
                <Fab size="small" style={fabStyle1} className='hidden-button floating waves-effect waves-light' color="primary" aria-label="favorite" >
                  <Tooltip title="Favorite">
                    <FavoriteIcon />
                  </Tooltip>
                </Fab>
                <Fab size="small" style={fabStyle2} to="/more-info" href={`#/movies/${movie._id}`} className='hidden-button floating waves-effect waves-light' color="primary" aria-label="more" >
                  <Tooltip title="More">
                    <KeyboardArrowRightIcon />
                  </Tooltip>
                </Fab>
                <Fab
                  size="small"
                  // onClick={() => this.handleExpandClick(movie.id)}
                  aria-expanded={expanded}
                  onClick={this.handleExpandClick}
                  style={fabStyle3} className='hidden-button floating waves-effect waves-light' color="primary" aria-label="View Details" >
                  <Tooltip title="View Details">
                    <ExpandMoreIcon />
                  </Tooltip>
                </Fab>
              </div>
            </CardActionArea>
            <CardContent className="hidden-content">
              <Typography className="hidden-content">{movie.title}</Typography>
            </CardContent>
            <Collapse
              // in={expanded[movie._id]}
              in={this.state.expand}
              timeout="auto"
              unmountOnExit
              // unmountOnExit={true}
            >
              <CardContent className="hidden-content">
                <Typography className="hidden-content" paragraph>{movie.description}</Typography>
              </CardContent>
            </Collapse>
          </Card>
        </div>
      )
    }
    return (
      ''
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
