import React from 'react'
import Card from '@material-ui/core/Card'
import Fab from '@material-ui/core/Fab'
import Tooltip from '@material-ui/core/Tooltip'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import { red } from '@material-ui/core/colors'
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight'
import CardMedia from '@material-ui/core/CardMedia'
import { Link } from 'react-router-dom'
import Fade from '@material-ui/core/Fade'

const fabStyle3 = {
  bottom: 60,
  left: 105
}
const StyledTooltip = withStyles({
  tooltip: {
    fontSize: '1.5em'
  }
})(Tooltip)

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
    '&:hover': {
      position: 'relative',
      transform: 'scale(1.2)',
      zIndex: 10
    },
    '&:hover .hidden-button': {
      display: 'flex'
      // zIndex: '5'
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
  // console.log(props)
  // console.log(props)
  // <Tooltip className='styledTooltip' style={{ color: 'red' }} title={props.title} placement="top">

  return (
    <div className="mx-auto py-3 px-1">
      <Card style={{ width: '18rem' }}
        className={classes.root}
        aria-label="show more"
      >
        <StyledTooltip title={props.title} placement="top" TransitionComponent={Fade} TransitionProps={{ timeout: 500 }}>

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
                  image={`https://image.tmdb.org/t/p/w185/${props.image}`}
                />
            }
          </div>
        </StyledTooltip>

        <div style={fabRowStyle}>
          <Link to={`/movies/${props.id}`} href={`/movies/${props.id}`}>
            <Tooltip title="More">
              <Fab size="small" style={fabStyle3} className="hidden-button floating" color="primary" aria-label="more" >
                <KeyboardArrowRightIcon fontSize="small" />
              </Fab>
            </Tooltip>
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
