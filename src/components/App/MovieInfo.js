import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import ArrowBack from '@material-ui/icons/ArrowBack'
// import SaveMovie from './SaveMovie'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import CardHeader from '@material-ui/core/CardHeader'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import Fab from '@material-ui/core/Fab'
import Tooltip from '@material-ui/core/Tooltip'
// import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight'
import FavoriteIcon from '@material-ui/icons/Favorite'
import AddMovieDialog from './AddMovieDialog'
// import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'
// import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft'
// import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos'
// import ArrowBackIosNewIcon from '@material-ui/icons/ArrowBackIosNew'

const fabStyle1 = {
}
const fabStyle2 = {
}
// const fabRowStyle = {
//   display: 'flex',
//   justifyContent: 'space-around'
// }
// <i className="fas fa-arrow left"></i>
const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(3)
    // marginTop: 3
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
                    // genre={props.currentMovie.genre.name}
                    // subheader={movie.released}
                    subheader={props.currentMovie.release_date.substring(5).split('-').concat(props.currentMovie.release_date.substring(0, 4)).join('/')}
                  />
                </div>
                <CardContent>
                  <Typography variant="body2">
                    {props.currentMovie.overview}
                  </Typography>
                </CardContent>
              </div>
            </div>
          </div>

          <CardActions>
            <div className="row" style={{ backgroundColor: 'MintCream', alignContent: 'center', alignSelf: 'flex-end' }}>
              <CardActions>
                <Tooltip title="Back">
                  <Fab href="#/search" aria-label="Back">
                    <ArrowBack />
                  </Fab>
                </Tooltip>
                <Tooltip title="Favorite">
                  <Fab style={fabStyle1} className='hidden-button floating waves-effect waves-light' color="primary" aria-label="favorite" >
                    <FavoriteIcon />
                  </Fab>
                </Tooltip>
                <Tooltip title="Save">
                  <Fab style={fabStyle2} className='hidden-button floating waves-effect waves-light' color="primary" aria-label="add" >
                    <AddMovieDialog id={props.currentMovie.id} title={props.currentMovie.title} released={props.currentMovie.release_date} description={props.currentMovie.overview} image={props.currentMovie.poster_path} user={props.user} />
                  </Fab>
                </Tooltip>
              </CardActions>
            </div>
          </CardActions>
        </Card>
      </div>
    </div>
  )
}
// col-10 mx-auto col-md-6 col-lg-4 my-3
// <div className="row">
//   <SaveMovie user={props.user} title={props.currentMovie.title} released={props.currentMovie.release_date} description={props.currentMovie.overview} image={props.currentMovie.poster_path}/>
// </div>
// <SaveMovie user={props.user} saved={props.saved} closeMovieInfo={props.closeMovieInfo} title={props.currentMovie.title} released={props.currentMovie.release_date} description={props.currentMovie.overview} image={props.currentMovie.poster_path}/>
// <div className="row" onClick={props.closeMovieInfo} style={{ cursor: 'pointer', paddingTop: 50 }}></div>
// <Tooltip title="More">
//   <Fab style={fabStyle3} to="/more-info" href={`#/movies/${props.id}`} className='hidden-button floating waves-effect waves-light' color="primary" aria-label="more" >
//     <KeyboardArrowRightIcon style={{ color: 'white', textDecoration: 'none' }}/>
//   </Fab>
// </Tooltip>
export default MovieInfo
// <Link
//   to="/search"
//   onClick={props.closeMovieInfo}
//   variant="outlined"
//   href={'#search/'}>link back</Link>
