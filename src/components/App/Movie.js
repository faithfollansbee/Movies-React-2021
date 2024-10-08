import React from 'react'
import Card from '@material-ui/core/Card'
import { makeStyles } from '@material-ui/core/styles'
import { red } from '@material-ui/core/colors'
import CardMedia from '@material-ui/core/CardMedia'
import { Link } from 'react-router-dom'
import AddMovieDialog from './AddMovieDialog'

const fabStyle2 = {
  bottom: 60,
  left: 70
}
// const fabStyle3 = {
//   bottom: 60,
//   left: 100
// }

const fabRowStyle = {
  display: 'flex',
  justifyContent: 'space-evenly',
  position: 'absolute',
  alignItems: 'center'
}
// const titleOverlay = {
//   justifyContent: 'space-evenly',
//   position: 'absolute',
//   opacity: 1,
//   top: 0,
//   backgroundColor: 'rgba(0, 0, 0, 0.7)',
//   width: '100%',
//   transition: '.5s ease',
//   color: 'white',
//   fontSize: '20px',
//   padding: '20px',
//   alignItems: 'center',
//   textAlign: 'center'
// }
// const buttonsOverlay = {
//   position: 'absolute',
//   justifyContent: 'space-evenly',
//   opacity: 1,
//   bottom: 0,
//   backgroundColor: 'rgba(0, 0, 0, 0.7)',
//   width: '100%',
//   transition: '.5s ease',
//   color: 'white',
//   fontSize: '15px',
//   padding: '20px',
//   textAlign: 'center'
// }

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    zIndex: -1,
    transition: 'transform 0.2s ease-in-out',
    '& .hidden-button': {
      display: 'none'
    },
    '& .hidden-overlay': {
      // opacity: 0
      display: 'none'
    },
    '&:hover': {
      position: 'relative',
      transform: 'scale(1.2)',
      zIndex: 10
    },
    '&:hover .hidden-button': {
      display: 'flex'
    },
    '&:hover .hidden-overlay': {
      // opacity: 1
      display: 'flex'
      // position: 'absolute'
    }
  },
  media: {
    height: 0,
    paddingTop: '56.25%'
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: 'rotate(180deg)'
  },
  cardHovered: {
  },
  avatar: {
    backgroundColor: red[500]
  },
  styledTooltip: {
    fontSize: '1.5em !important'
  }
}))
const Movie = (props) => {
  const classes = useStyles()
  return (
    <div className="mx-auto py-3 px-1" >
      <Card style={{ width: '18rem' }}
        className={classes.root}
        aria-label="show more"
      >
        <Link to="/more-info" href={'/more-info'} onClick={() => props.viewMovie(props.movieId)} user={props.user} id={props.movieId}>
          <div className="card-image">
            {
              props.image == null
                ? <CardMedia
                  component="img"
                  alt="no poster found"
                  image={'https://i.imgur.com/R7mqXKL.png'}
                />
                : <CardMedia
                  component="img"
                  alt="movie-poster"
                  image={`https://image.tmdb.org/t/p/w500/${props.image}`}
                />
            }
          </div>
        </Link>
        <div style={fabRowStyle}>
          <div style={fabStyle2} className='hidden-button floating waves-effect waves-light'>
            <AddMovieDialog onClick={() => props.viewMovie(props.movieId)} movie={props.movie} doMessage={props.doMessage} alert={props.alert} currentMovie={props.currentMovie} viewMovie={props.viewMovie} getMovieDetails={props.getMovieDetails} id={props.movieId} title={props.title} categories={props.genreIds} tagline={props.tagline} runtime={props.runtime} released={props.released} description={props.description} image={props.image} user={props.user} revenue={props.revenue} budget={props.budget}/>
          </div>
        </div>
        { /*   <Link to="/trending-info" onClick={() => props.ie(props.movieId)} user={props.user} id={props.movieId} title={props.title} currentMovie={props.currentMovie}>
            <Tooltip title={props.movieId}>
              <Fab size="small" style={fabStyle3} className="hidden-button floating" color="secondary" aria-label="more" >
                <KeyboardArrowRightIcon />
              </Fab>
            </Tooltip>
          </Link>  */ }
        { /* onClick={() => props.viewMovie(props.movieId)} */ }
        { /* href={`#/movies/${props.id}`}
        href={`#/movies/${props.movieId}`} */ }
        { /* <Fab style={fabStyle3} onClick={() => props.viewMovie(props.movieId)} user={props.user} id={props.movieId} className='hidden-button floating waves-effect waves-light' color="primary" aria-label="more" >
          <Tooltip title="More">
            <Link className="btn-floating fab waves-effect waves-light red" style={{ color: 'white', textDecoration: 'none' }} to="/more-info" onClick={() => props.viewMovie(props.movieId)} user={props.user} id={props.movieId}>
              <KeyboardArrowRightIcon />
            </Link>
          </Tooltip>
        </Fab>* / }
        { /*
          <Fab style={fabStyle2} className='hidden-button floating waves-effect waves-light' color="primary" aria-label="save" >
            <KeyboardArrowRightIcon to="/more-info" onClick={() => props.viewMovie(props.movieId)} user={props.user} id={props.movieId}/>
          </Fab>
            <Button
              startIcon={<AddIcon />}
              className="btn-floating halfway-fab waves-effect waves-light red"
            >
              <Link style={{ color: 'inherit', textDecoration: 'none' }} to="/more-info" onClick={() => props.viewMovie(props.movieId)} user={props.user} id={props.movieId}>Add</Link>
            </Button>
            */ }
      </Card>
    </div>
  )
}
// <CardActions className="hidden-button">
//     <AddMovieDialog id={props.movieId} title={props.title} released={props.released} description={props.description} image={props.image} user={props.user} />
//     <Button>
//       <Link className="btn-floating halfway-fab waves-effect waves-light red" style={{ color: 'inherit', textDecoration: 'none' }} to="/more-info" onClick={() => props.viewMovie(props.movieId)} user={props.user} id={props.movieId}>View Details</Link>
//     </Button>
//     <IconButton
//       display='none'
//       className={clsx(classes.expand, {
//         [classes.expandOpen]: expanded
//       })}
//       onClick={handleExpandClick}
//       aria-expanded={expanded}
//       aria-label="show more"
//     >
//       <ExpandMoreIcon />
//     </IconButton>
//   </CardActions>
//   <Collapse in={expanded} timeout="auto" unmountOnExit>
//     <CardContent>
//       <Typography paragraph>Overview:</Typography>
//       <Typography variant="body2" color="textSecondary" component="p">
//         {props.description}
//       </Typography>
//     </CardContent>
//   </Collapse>
// <a className="btn-floating halfway-fab waves-effect waves-light red" onClick={handleClick}><i className="material-icons">add</i></a>

// <Link to="/more-info" onClick={() => props.viewMovie(props.movieId)} user={props.user} id={props.movieId}>View Details</Link>

// <div style={descriptionStyle}>
//   <p> {props.description} </p>
// </div>
// <p><a href="#/more-info" onClick={() => props.viewMovie(props.movieId)}>View Details</a></p>
// <p><a href="#/more-info" onClick={() => props.viewMovie(props.movieId)}>view moar</a></p>
// <Link href="#movie-info" user={props.user} id={props.movieId} closeMovieInfo={this.closeMovieInfo} currentMovie={props.currentMovie}> View details</Link>

// <MovieInfo user={props.user} currentMovie={props.currentMovie} closeMovieInfo={this.closeMovieInfo} />

// <Button size="small" color="primary" onClick={() => props.ViewMovie(props.movieId)}> see more </Button>
// <p><a href="#">This is a link</a></p>
// <Button size="small" color="primary" onClick={handleClick} type="click"> Save movie </Button>

export default Movie
// const [display, setDisplay] = useState('notdisplayed')
// const showButton = e => {
//   e.preventDefault()
//   setDisplay('displayed')
// }
// const hideButton = e => {
//   e.preventDefault()
//   setDisplay('notdisplayed')
// }
// const handleHover = () => {
//   setHover(!hovered)
// }
// const handleClick = () => {
//   event.preventDefault()
//   axios({
//     method: 'POST',
//     url: `${apiUrl}/movies`,
//     headers: {
//       Authorization: `Token token=${props.user.token}`
//     },
//     data: {
//       movie: {
//         title: props.title,
//         description: props.description,
//         released: props.released,
//         image: props.image
//       }
//     }
//   })
//  <Redirect to="/movies"/>
// }
// const handleCardClick = () => {
//   event.preventDefault()
//   axios({
//     method: 'POST',
//     url: `${apiUrl}/movies/`,
//     headers: {
//       Authorization: `Token token=${props.user.token}`
//     },
//     data: {
//       movie: {
//         title: props.title,
//         description: props.description,
//         released: props.released,
//         image: props.image
//       }
//     }
//   })
// }
// <div className="col-10 mx-auto col-md-6 col-lg-4 my-3">
// <div className="card-image">
//   { props.image == null ? <img src={'https://i.imgur.com/R7mqXKL.png'} alt="card image" style={{ width: '100%', height: 360 }}/> : <img src={`https://image.tmdb.org/t/p/w185/${props.image}`} alt="card image" style={{ width: '100%', height: 360 }}/> }
// </div>
// let imageStatus
// <div className="col-10 mx-auto py-3 px-1 col-md-6 col-lg-3 my-3">
