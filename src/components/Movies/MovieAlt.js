import React from 'react'
import Card from '@material-ui/core/Card'
import Fab from '@material-ui/core/Fab'
import { makeStyles } from '@material-ui/core/styles'
import { red } from '@material-ui/core/colors'
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight'
import CardMedia from '@material-ui/core/CardMedia'
import { Link } from 'react-router-dom'

const fabStyle3 = {
  bottom: 60,
  left: 105
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
// const StyledTooltip = withStyles({
//   tooltip: {
//     fontSize: '1.5em'
//   }
// })(Tooltip)

const fabRowStyle = {
  display: 'flex',
  justifyContent: 'space-evenly',
  position: 'absolute',
  alignItems: 'center'
}

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    // display: 'inline-block',
    zIndex: -1,
    transition: 'transform 0.2s ease-in-out',
    '& .hidden-button': {
      display: 'none'
    },
    '& .hidden-overlay': {
      display: 'none'
    },
    '&:hover': {
      position: 'relative',
      transform: 'scale(1.2)',
      zIndex: 10
    },
    '&:hover .hidden-button': {
      display: 'flex'
      // zIndex: '5'
    },
    '&:hover .hidden-overlay': {
      display: 'flex'
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
  },
  avatar: {
    backgroundColor: red[500]
  },
  styledTooltip: {
    fontSize: '1.5em !important'
  }
}))
const MovieAlt = (props) => {
  const classes = useStyles()

  // <StyledTooltip title={props.title} placement="top" TransitionComponent={Fade} TransitionProps={{ timeout: 500 }}>

  return (
    <div className="mx-auto py-3 px-1">
      <Card style={{ width: '18rem' }}
        className={classes.root}
        aria-label="show more"
      >
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
        <div style={fabRowStyle}>
          <Link to={`/movies/${props.id}`} href={`/movies/${props.id}`}>
            <Fab size="small" style={fabStyle3} className="hidden-button floating" color="primary" aria-label="more" >
              <KeyboardArrowRightIcon fontSize="small" />
            </Fab>
          </Link>
        </div>
      </Card>
    </div>
  )
}

// {props.image ? (
//   <CardMedia
//     component="img"
//     alt="movie-poster"
//     image={`https://image.tmdb.org/t/p/w185/${props.image}`}
//   />
// ) : (
//   <Skeleton animation="wave" variant="rect" style={mediaStyle} />
// )}

export default MovieAlt
