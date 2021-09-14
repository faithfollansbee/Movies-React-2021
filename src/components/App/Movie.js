import React from 'react'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import { red } from '@material-ui/core/colors'
import IconButton from '@material-ui/core/IconButton'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import clsx from 'clsx'
import Collapse from '@material-ui/core/Collapse'
import CardMedia from '@material-ui/core/CardMedia'

import { Link } from 'react-router-dom'

const contentStyle = {
  height: 40,
  overflow: 'scroll',
  padding: 1,
  paddingtop: 2,
  justifyContent: 'space-evenly'
}
const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345
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
  const handleClick = () => {
    event.preventDefault()
    axios({
      method: 'POST',
      url: `${apiUrl}/movies`,
      headers: {
        Authorization: `Token token=${props.user.token}`
      },
      data: {
        movie: {
          title: props.title,
          description: props.description,
          released: props.released,
          image: props.image
        }
      }
    })
  //  <Redirect to="/movies"/>
  }
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

  return (
    <div className="container col-10 mx-auto col-md-6 col-lg-3 my-3">
      <Card style={{ width: '18rem' }} className={classes.root}>
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
          </div>
          <a className="btn-floating halfway-fab waves-effect waves-light red" onClick={handleClick}><i className="material-icons">add</i></a>
          <CardContent style={contentStyle}>
            <Typography variant="h6">
              <p> {props.title} </p>
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button>
            <Link style={{ color: 'inherit', textDecoration: 'none' }} to="/more-info" onClick={() => props.viewMovie(props.movieId)} user={props.user} id={props.movieId}>View Details</Link>
          </Button>
          <IconButton
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
            <Typography paragraph>
              {props.description}
            </Typography>
          </CardContent>
        </Collapse>
      </Card>
    </div>
  )
}
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
