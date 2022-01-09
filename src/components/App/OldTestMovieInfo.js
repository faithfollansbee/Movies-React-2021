import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import ArrowBack from '@material-ui/icons/ArrowBack'
import SaveMovie from './SaveMovie'
import { Link } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1)
  }
}))
const MovieInfo = (props) => {
  const classes = useStyles()
  console.log('Rendered from TestMovieInfo')
  return (
    <div className="container">
      <div className="row">
        <div className="col s12 m3">
          { props.poster_path == null ? <img src={'https://i.imgur.com/R7mqXKL.png'} alt="card-image" style={{ width: '100%', height: '360' }}/> : <img src={`https://image.tmdb.org/t/p/w185/${props.currentMovie.poster_path}`} alt="card-image" style={{ width: '100%', height: '360' }} /> }
        </div>

        <div className="col s12 m9">
          <div className="info-container">
            <p>{props.title}</p>
            <p>{props.overview}</p>
          </div>
        </div>

      </div>
      <div className="row">
        <SaveMovie user={props.user} title={props.title} released={props.released} description={props.description} image={props.image}/>
      </div>
      <div className="row" onClick={props.closeMovieInfo} style={{ cursor: 'pointer', paddingTop: 50 }}>
        <Button
          // variant="contained"
          // color="secondary"
          className={classes.button}
          startIcon={<ArrowBack />}
        >
         Go Back
        </Button>
        <Button
          variant="outlined"
          href={'#search/'}>Back to search</Button>
        <Link
          to="/search"
          variant="outlined"
          href={'#search/'}>link back</Link>
      </div>
    </div>
  )
}
// col-10 mx-auto col-md-6 col-lg-4 my-3
// <div className="row">
//   <SaveMovie user={props.user} title={props.currentMovie.title} released={props.currentMovie.release_date} description={props.currentMovie.overview} image={props.currentMovie.poster_path}/>
// </div>
export default MovieInfo