import React from 'react'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
// import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
// import CardMedia from '@material-ui/core/CardMedia'
// import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
// import MovieInfo from './MovieInfo'
import { Link } from 'react-router-dom'

const resultStyle = {
  // margin: '5px',
  paddingtop: 5
}
const descriptionStyle = {
  overflow: 'scroll'
}
const contentStyle = {
  height: 230,
  overflow: 'scroll',
  padding: 1,
  paddingtop: 2,
  justifyContent: 'space-evenly'
}
const Movie = (props) => {
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

  return (
    <div className="col-10 mx-auto col-md-6 col-lg-4 my-3">
      <Card className="card" style={resultStyle}>
        <CardActionArea>
          <div className="card-image">
            { props.image == null ? <img src={'https://i.imgur.com/R7mqXKL.png'} alt="card image" style={{ width: '180', height: 360 }}/> : <img src={`https://image.tmdb.org/t/p/w185/${props.image}`} alt="card image" style={{ width: '180', height: 360 }}/> }
            <a className="btn-floating halfway-fab waves-effect waves-light red" onClick={handleClick}><i className="material-icons">add</i></a>
          </div>
          <CardContent className="card-content" style={contentStyle}>
            <Typography paddingtop="5px" gutterBottom variant="h5" component="h2">
              <p> {props.title} </p>
            </Typography>
            <div style={descriptionStyle}>
              <p> {props.description} </p>
            </div>
          </CardContent>
        </CardActionArea>
        <div>
          <p><a href="#/more-info" onClick={() => props.viewMovie(props.movieId)}>View Details</a></p>
          <p><a href="#/more-info" onClick={() => props.viewMovie(props.movieId)}>view moar</a></p>
          <Link to="/more-info" onClick={() => props.viewMovie(props.movieId)} user={props.user} id={props.movieId} closeMovieInfo={this.closeMovieInfo} currentMovie={props.movieId}>MOAR</Link>
        </div>
      </Card>
    </div>
  )
}
// <Link href="#movie-info" user={props.user} id={props.movieId} closeMovieInfo={this.closeMovieInfo} currentMovie={props.currentMovie}> View details</Link>

// <MovieInfo user={props.user} currentMovie={props.currentMovie} closeMovieInfo={this.closeMovieInfo} />

// <Button size="small" color="primary" onClick={() => props.ViewMovie(props.movieId)}> see more </Button>
// <p><a href="#">This is a link</a></p>
// <Button size="small" color="primary" onClick={handleClick} type="click"> Save movie </Button>

export default Movie
