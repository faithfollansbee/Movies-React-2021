import React from 'react'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import Fab from '@material-ui/core/Fab'
import FavoriteIcon from '@material-ui/icons/Favorite'
import Tooltip from '@material-ui/core/Tooltip'
import { makeStyles } from '@material-ui/core/styles'
import { red } from '@material-ui/core/colors'
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
// import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

// import { Link } from 'react-router-dom'
// import AddMovieDialog from './AddMovieDialog'

const fabStyle1 = {
  bottom: 60,
  left: 150
}
const fabStyle2 = {
  bottom: 60,
  left: 170
}
// const hiddenStyle = {
//   bottom: 160,
//   left: 10
// }
// const fabStyle3 = {
//   bottom: 60,
//   left: 90
// }
const fabRowStyle = {
  display: 'flex',
  justifyContent: 'space-evenly',
  position: 'absolute'
}
const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    // display: 'inline-block',
    zIndex: 5,
    transition: 'transform 0.22s ease-in-out',
    '& .hidden-button': {
      display: 'none'
    },
    '& .hidden-content': {
      display: 'none'
    }
    // '&:hover': {
    // position: 'relative',
    // transform: 'scale(1.2)',
    // zIndex: '15 !important'
    // '&:hover .hidden-button': {
    //   display: 'flex'
    // },
    // '&:hover .hidden-content': {
    //   display: 'flex'
    // }
    // },
    // '&:hover .hidden-button': {
    //   display: 'flex'
    // },
  },
  // detailsButton: {
  //   '& .hidden-content': {
  //     display: 'none'
  //   },
  //   '&:hover .hidden-content': {
  //     display: 'flex'
  //   }
  // },
  media: {
    height: 0,
    paddingTop: '56.25%' // 16:9
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
    // transform: 'scale3d(1.05, 1.05, 1)',
    // position: 'absolute',
    position: 'relative',
    transform: 'scale(1.2)',
    zIndex: '15 !important',
    '&:hover .hidden-button': {
      display: 'flex'
    },
    '&:hover .hidden-content': {
      display: 'flex'
    }
  },
  avatar: {
    backgroundColor: red[500]
  }
}))
const Movie = (props) => {
  const classes = useStyles()
  // const [expanded, setExpanded] = React.useState(false)
  // const handleExpandClick = () => {
  //   setExpanded(!expanded)
  // }
  const [state, setState] = React.useState({
    hovered: false,
    shadow: 1
  })
  // props passed into Movie from SearchResults
  // user={props.user}
  // currentMovie={props.currentMovie}
  // viewMovie={props.viewMovie}
  // released={movie.release_date}
  // image={movie.poster_path}
  // movieId={movie.id}
  // title={movie.title}
  // description={movie.overview}

  // props passed into Movie2 / Movie3 from Movies
  // key={movie.name + movie._id}
  // handleRefresh={this.handleRefresh}
  // user={this.props.user}
  // id={movie._id}
  // description={movie.description}
  // released={movie.released}
  // image={movie.image}
  // thisstate={this.state}
  // alert={this.props.alert}
  // genre={this.genre}
  return (
    <div className="mx-auto py-3 px-1">
      <Card style={{ width: '18rem' }} className={classes.root}
        classes={{ root: state.hovered ? classes.cardHovered : '' } }
        onMouseOver={() => setState({ hovered: true, shadow: 3 })}
        onMouseOut={() => setState({ hovered: false, shadow: 1 })}
        hovered={state.hovered} zdepth={state.shadow}
        // className={clsx(classes.hovered, {
        //   [classes.hoveredOpen]: hovered
        // })}
        // onHover={handleHover}
        // aria-expanded={hovered}
        aria-label="show more"
      >
        <CardActionArea>
          <div className="card-image">
            {
              props.image == null
                ? <CardMedia
                  component="img"
                  alt="Contemplative Reptile"
                  // height="300"
                  // width="100%"
                  image={'https://i.imgur.com/R7mqXKL.png'}
                  title="card-image"
                />
                : <CardMedia
                  component="img"
                  alt="Contemplative Reptile"
                  // height="300"
                  // width="100%"
                  image={`https://image.tmdb.org/t/p/w185/${props.image}`}
                  title="Contemplative Reptile"
                />
            }
            { /* <div className="hidden-button row" style={{ position: 'absolute', backgroundColor: 'black', color: 'white', bottom: 10, left: '50%', transform: 'translateX(-50%)' }}>{props.title}</div> */ }
            { /* // <Typography style={hiddenStyle} className="hidden-button floating waves-effect waves-light">{props.title}</Typography> */}
            <div style={fabRowStyle}>
              <Tooltip title="Favorite">
                <Fab size="medium" style={fabStyle1} className='hidden-button floating waves-effect waves-light' color="primary" aria-label="favorite" >
                  <FavoriteIcon />
                </Fab>
              </Tooltip>
              <Tooltip title="More">
                <Fab size="medium" style={fabStyle2} to="/more-info" href={`#/movies/${props.id}`} className='hidden-button floating waves-effect waves-light' color="primary" aria-label="more" >
                  <KeyboardArrowRightIcon style={{ color: 'white', textDecoration: 'none' }}/>
                </Fab>
              </Tooltip>
            </div>
          </div>
          { /* <Tooltip title="Expand More">
            <Fab style={fabStyle3} className='hidden-button detailsButton floating waves-effect waves-light' color="primary" aria-label="expand more" >
              <ExpandMoreIcon />
            </Fab>
          </Tooltip> */ }
          {/* <Fab style={fabStyle2} className='hidden-button floating waves-effect waves-light' color="primary" aria-label="add" >
            <AddMovieDialog id={props.movieId} title={props.title} released={props.released} description={props.description} image={props.image} user={props.user} />
          </Fab> */}
          { /* onClick={() => props.viewMovie(props.movieId)} */ }
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
          <CardContent className="hidden-content">
            <Typography className="hidden-content">{props.title}</Typography>
            <Typography className="hidden-content">{props.genre}</Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </div>
  )
}
// <CardContent className="hidden-content">
//   <Typography className="hidden-content">{props.title}</Typography>
// </CardContent>
// <CardContent style={{ backgroundColor: 'black', color: 'white' }} className="hidden-content">

// <CardContent>
//   <Typography className="hovered hidden">{props.title}</Typography>
//   <Typography className="hovered hidden">{props.description}</Typography>
// </CardContent>
export default Movie
