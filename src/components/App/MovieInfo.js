import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
// import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import ArrowBack from '@material-ui/icons/ArrowBack'
import SaveMovie from './SaveMovie'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
// import Button from '@material-ui/core/Button'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import CardHeader from '@material-ui/core/CardHeader'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'

// <i className="fas fa-arrow left"></i>
const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1)
  }
}))
const MovieInfo = (props) => {
  const classes = useStyles()

  return (
    <div>
      <Button
        href="#/search"
        style={{ color: 'inherit', textDecoration: 'none' }}
        // variant="contained"
        className={classes.button}
        startIcon={<ArrowBack />}
      >
       Back
      </Button>
      <div style={{ backgroundColor: 'LavenderBlush' }} className="movie-container mx-auto my-3 px-3 py-3 border">
        <Card>
          <div className="row">
            <div>
              <div style={{ width: '100%' }}>
                { props.currentMovie.poster_path == null ? <img src={'https://i.imgur.com/R7mqXKL.png'} alt="card image" style={{ width: '100', height: 450 }}/> : <img src={`https://image.tmdb.org/t/p/w185/${props.currentMovie.poster_path}`} alt="card image" style={{ width: '100', height: 500 }}/> }
              </div>
            </div>
            <div className="col" style={{ backgroundColor: 'AliceBlue' }}>

              <div style={{ flexDirection: 'column' }}>
                <div>
                  <CardHeader
                    // variant="h5"
                    // component="h3"
                    action={
                      <IconButton aria-label="settings">
                        <MoreVertIcon />
                      </IconButton>
                    }
                    // title={movie.name}
                    title={props.currentMovie.title}
                    // subheader={movie.released}
                    subheader={props.currentMovie.release_date.substring(5).split('-').concat(props.currentMovie.release_date.substring(0, 4)).join('/')}
                  />
                </div>
                <CardContent>

                  <Typography variant="body2">
                    <p> {props.currentMovie.overview} </p>
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                    {props.currentMovie.overview}
                  </Typography>
                  <CardActions>
                    <Button href="#/movies" style={{ alignSelf: 'flex-end', color: 'inherit', textDecoration: 'none' }} className="waves-effect waves-teal btn-flat">back to all
                    </Button>
                    <Button onClick={this.deletemovie}>Delete this movie</Button>
                  </CardActions>
                  <div className="row" style={{ backgroundColor: 'MintCream', alignContent: 'center', alignSelf: 'flex-end' }}>
                    <CardActions>
                      <Button href="#/movies" style={{ alignSelf: 'flex-end', color: 'inherit', textDecoration: 'none' }} className="waves-effect waves-teal btn-flat">back to all
                      </Button>
                      <Button onClick={this.deletemovie}>Delete this movie</Button>
                    </CardActions>
                  </div>
                </CardContent>
              </div>
            </div>
          </div>

          <CardActions>
            <div className="row" style={{ backgroundColor: 'MintCream', alignContent: 'center', alignSelf: 'flex-end' }}>
              <CardActions>
                <Button href="#/movies" style={{ alignSelf: 'flex-end', color: 'inherit', textDecoration: 'none' }} className="waves-effect waves-teal btn-flat">back to all
                </Button>
                <Button onClick={this.deletemovie}>Delete this movie</Button>
              </CardActions>
            </div>
          </CardActions>
        </Card>
        <SaveMovie user={props.user} saved={props.saved} closeMovieInfo={props.closeMovieInfo} title={props.currentMovie.title} released={props.currentMovie.release_date} description={props.currentMovie.overview} image={props.currentMovie.poster_path}/>
        <div className="row" onClick={props.closeMovieInfo} style={{ cursor: 'pointer', paddingTop: 50 }}>
        </div>
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
