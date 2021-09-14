import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
// import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import ArrowBack from '@material-ui/icons/ArrowBack'
import SaveMovie from './SaveMovie'

// <i className="fas fa-arrow left"></i>
const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1)
  }
}))
const MovieInfo = (props) => {
  const classes = useStyles()

  return (
    <div className="container">
      <Button
        href="#/search"
        style={{ color: 'inherit', textDecoration: 'none' }}
        // variant="contained"
        className={classes.button}
        startIcon={<ArrowBack />}
      >
       Back
      </Button>
      <div className="row">
        <div className="col s12 m3">
          { props.currentMovie.poster_path == null ? <img src={'https://i.imgur.com/R7mqXKL.png'} alt="card-image" style={{ width: '100%', height: '360' }}/> : <img src={`https://image.tmdb.org/t/p/w185/${props.currentMovie.poster_path}`} alt="card-image" style={{ width: '100%', height: '360' }} /> }
        </div>

        <div className="col s12 m9">
          <div className="info-container">
            <p>{props.currentMovie.title}</p>
            <p>{props.currentMovie.release_date.substring(5).split('-').concat(props.currentMovie.release_date.substring(0, 4)).join('/')}</p>
            <p>{props.currentMovie.overview}</p>
          </div>
        </div>

      </div>
      <div className="row">
        <SaveMovie user={props.user} closeMovieInfo={props.closeMovieInfo} title={props.currentMovie.title} released={props.currentMovie.release_date} description={props.currentMovie.overview} image={props.currentMovie.poster_path}/>
      </div>
      <div className="row" onClick={props.closeMovieInfo} style={{ cursor: 'pointer', paddingTop: 50 }}>
      </div>
    </div>
  )
}
// col-10 mx-auto col-md-6 col-lg-4 my-3
// <div className="row">
//   <SaveMovie user={props.user} title={props.currentMovie.title} released={props.currentMovie.release_date} description={props.currentMovie.overview} image={props.currentMovie.poster_path}/>
// </div>

export default MovieInfo
// <Link
//   to="/search"
//   onClick={props.closeMovieInfo}
//   variant="outlined"
//   href={'#search/'}>link back</Link>
