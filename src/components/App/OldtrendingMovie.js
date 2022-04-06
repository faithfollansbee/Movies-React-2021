import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import Card from '@material-ui/core/Card'
import Tooltip from '@material-ui/core/Tooltip'
import Fade from '@material-ui/core/Fade'
import { withStyles } from '@material-ui/core/styles'
import EditMenu from '../Movies/EditMenu'
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight'
import Fab from '@material-ui/core/Fab'
import AddMovieDialog from './AddMovieDialog'

const StyledTooltip = withStyles({
  tooltip: {
    fontSize: '1.5em'
  }
})(Tooltip)
const fabStyle2 = {
  bottom: 60,
  left: 70
}
const fabStyle3 = {
  bottom: 60,
  left: 100
}
const fabRowStyle = {
  display: 'flex',
  justifyContent: 'space-evenly',
  position: 'absolute'
}

class MaterializeTrendingMovie extends Component {
  state = {
    movie: '',
    deleted: false
  }

  // async componentDidMount (props) {
  //   try {
  //     const response = await axios({
  //       url: `${apiUrl}/movies/${this.props.id}`,
  //       method: 'GET',
  //       headers: {
  //         'Authorization': `Token token=${this.props.user.token}`
  //       }
  //     })
  //     this.setState({
  //       movie: response.data.movie,
  //       isLoading: false
  //     })
  //   } catch (error) {
  //   }
  // }

  // deleteMovie = () => {
  //   axios({
  //     url: `${apiUrl}/movies/${this.props.id}`,
  //     method: 'DELETE',
  //     headers: {
  //       'Authorization': `Token token=${this.props.user.token}`
  //     }
  //   })
  //     .then(() => this.setState({ deleted: true }))
  // }
  // editMovie = () => {
  // }

  render () {
    return (
      <div className="mx-auto py-3 px-1">
        <Card className="card sticky-action"
          style={{ width: '19rem' }}
        >
          { /* <Button onMouseOver={handleShow('top')}>top</Button>
          <Tooltip style={tooltipStyle} title={this.props.title} placement="top" TransitionComponent={Fade} TransitionProps={{ timeout: 600 }}>
          <StyledTooltip title={this.props.title} placement="top">
          */ }
          <StyledTooltip title={this.props.title} placement="top" TransitionComponent={Fade} TransitionProps={{ timeout: 500 }}>
            <div className="card-image waves-effect waves-block waves-light">
              {
                this.props.image == null
                  ? <img
                    // className="activator"
                    component="img"
                    alt="no poster found"
                    src={'https://i.imgur.com/R7mqXKL.png'}
                    // title="card-image"
                  />
                  : <img
                    component="img"
                    alt="movie-poster"
                    src={`https://image.tmdb.org/t/p/w185/${this.props.image}`}
                  />
              }
            </div>
          </StyledTooltip>
          <div style={fabRowStyle}>
            <Fab size="small" style={fabStyle2} className='hidden-button floating waves-effect waves-light' color="primary" aria-label="add" >
              <AddMovieDialog id={this.props.movieId} title={this.props.title} categories={this.props.genreIds} released={this.props.released} description={this.props.description} image={this.props.image} user={this.props.user} />
            </Fab>
            <Link to="/more-info" href={'/more-info'} onClick={() => this.props.viewMovie(this.props.movieId)} user={this.props.user} id={this.props.movieId} currentMovie={this.props.currentMovie}>
              <Tooltip title="More">
                <Fab size="small" style={fabStyle3} className="hidden-button floating" color="primary" aria-label="more" >
                  <KeyboardArrowRightIcon />
                </Fab>
              </Tooltip>
            </Link>
            <Link to="/trending-info" onClick={() => this.props.viewMovie(this.props.movieId)} user={this.props.user} id={this.props.movieId} title={this.props.title} currentMovie={this.props.currentMovie}>
              <Tooltip title={this.props.movieId}>
                <Fab size="small" style={fabStyle3} className="hidden-button floating" color="secondary" aria-label="more" >
                  <KeyboardArrowRightIcon />
                </Fab>
              </Tooltip>
            </Link>
          </div>
          <div className="card-content grey lighten-4" style={{ textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden' }}>
            <Link to="/trending-info" onClick={() => this.props.viewMovie(this.props.movieId)} user={this.props.user} id={this.props.movieId} title={this.props.title} currentMovie={this.props.currentMovie} className="right" style={{ color: 'rgba(0, 0, 0, 0.87)' }}>
              <Fab size="small" className="hidden-button floating" aria-label="more" >
                <KeyboardArrowRightIcon />
              </Fab>
            </Link>
            <span style={{ textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden' }} className="card-title activator grey-text text-darken-4">{this.props.title}
            </span>
          </div>
          <div className="card-reveal">
            <span className="card-title grey-text text-darken-4">{this.props.title}<i className="material-icons right">close</i></span>
            <EditMenu className="material-icons right" id={this.state.movie.id} movie={this.state.movie} title={this.state.movie.title} user={this.props.user} released={this.props.released} genre={this.props.genre} description={this.state.movie.description} image={this.state.movie.image} style={{ textDecoration: 'none' }} deleteMovie={this.deleteMovie} editMovie={this.editMovie}/>

            <Link to="/trending-info" onClick={() => this.props.viewMovie(this.props.movieId)} user={this.props.user} id={this.props.movieId} title={this.props.title} currentMovie={this.props.currentMovie}>
              <Tooltip title={this.props.movieId}>
                <Fab size="small" style={fabStyle3} className="hidden-button floating" color="primary" aria-label="more" >
                  <KeyboardArrowRightIcon />
                </Fab>
              </Tooltip>
            </Link>
            <p>{this.props.description}</p>
          </div>
        </Card>
      </div>
    )
  }
}

export default withRouter(MaterializeTrendingMovie)
