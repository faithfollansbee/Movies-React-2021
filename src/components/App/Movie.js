import React from 'react'
// import axios from 'axios'
// import apiUrl from '../../apiConfig'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Fab from '@material-ui/core/Fab'

// import Tooltip from '@material-ui/core/Tooltip'
import { makeStyles } from '@material-ui/core/styles'
import { red } from '@material-ui/core/colors'
import IconButton from '@material-ui/core/IconButton'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import clsx from 'clsx'
import Collapse from '@material-ui/core/Collapse'
import CardMedia from '@material-ui/core/CardMedia'
import { Link } from 'react-router-dom'
import AddMovieDialog from './AddMovieDialog'

// const contentStyle = {
//   height: 40,
//   overflow: 'scroll',
//   padding: 1,
//   paddingtop: 2,
//   justifyContent: 'space-evenly'
// }

const fabStyle = {
  position: 'absolute',
  bottom: 16,
  right: 16
}
const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    transition: 'transform 0.15s ease-in-out',
    '& .hidden-button': {
      display: 'none'
    },
    '&:hover .hidden-button': {
      display: 'flex',
      zIndex: '5'
    }
  },
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
    transform: 'scale3d(1.05, 1.05, 1)'
  },
  avatar: {
    backgroundColor: red[500]
  }
}))
const Movie = (props) => {
  const classes = useStyles()
  const [expanded, setExpanded] = React.useState(false)
  const handleExpandClick = () => {
    setExpanded(!expanded)
  }
  const [state, setState] = React.useState({
    hovered: false,
    shadow: 1
  })
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
            <Fab style={fabStyle} className='hidden-button floating waves-effect waves-light red' color="primary" aria-label="save" >
              <ExpandMoreIcon />
            </Fab>
            <Fab style={fabStyle} className='hidden-button floating waves-effect waves-light' color="secondary" aria-label="add" >
              <AddMovieDialog id={props.movieId} title={props.title} released={props.released} description={props.description} image={props.image} user={props.user} />
            </Fab>
            <Fab style={fabStyle} className='hidden-button floating waves-effect waves-light red' color="primary" aria-label="add" >
              <Button>
                <Link className="btn-floating halfway-fab waves-effect waves-light red" style={{ color: 'inherit', textDecoration: 'none' }} to="/more-info" onClick={() => props.viewMovie(props.movieId)} user={props.user} id={props.movieId}>View Details</Link>
              </Button>
            </Fab>
          </div>
          { /*
              <Button
                startIcon={<AddIcon />}
                className="btn-floating halfway-fab waves-effect waves-light red"
              >
                <Link style={{ color: 'inherit', textDecoration: 'none' }} to="/more-info" onClick={() => props.viewMovie(props.movieId)} user={props.user} id={props.movieId}>Add</Link>
              </Button>
              */ }
        </CardActionArea>
        <CardActions className="hidden-button">
          <AddMovieDialog id={props.movieId} title={props.title} released={props.released} description={props.description} image={props.image} user={props.user} />
          <Button>
            <Link className="btn-floating halfway-fab waves-effect waves-light red" style={{ color: 'inherit', textDecoration: 'none' }} to="/more-info" onClick={() => props.viewMovie(props.movieId)} user={props.user} id={props.movieId}>View Details</Link>
          </Button>
          <IconButton
            display='none'
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>Overview:</Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {props.description}
            </Typography>
          </CardContent>
        </Collapse>
      </Card>
    </div>
  )
}
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
