import React, { Component } from 'react'
import { withRouter, Redirect } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import Card from '@material-ui/core/Card'
import Tooltip from '@material-ui/core/Tooltip'
// import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight'
// import IconButton from '@material-ui/core/IconButton'
// import Fab from '@material-ui/core/Fab'
import Fade from '@material-ui/core/Fade'
import { withStyles } from '@material-ui/core/styles'
import EditMenu from './EditMenu'
// const tooltipStyle = {
//   color: 'lightblue',
//   backgroundColor: 'green',
//   fontSize: '2em'
// }
const StyledTooltip = withStyles({
  tooltip: {
    fontSize: '1.5em'
  }
})(Tooltip)

class MaterializeMovieClass extends Component {
  state = {
    movie: '',
    deleted: false
  }

  async componentDidMount (props) {
    try {
      const response = await axios({
        url: `${apiUrl}/movies/${this.props.id}`,
        method: 'GET',
        headers: {
          'Authorization': `Token token=${this.props.user.token}`
        }
      })
      this.setState({
        movie: response.data.movie,
        isLoading: false
      })
    } catch (error) {
    }
    // console.log('this.props', this.props)
    // console.log('this.state', this.state)
  }

  deleteMovie = () => {
    axios({
      url: `${apiUrl}/movies/${this.props.id}`,
      method: 'DELETE',
      headers: {
        'Authorization': `Token token=${this.props.user.token}`
      }
    })
      .then(() => this.setState({ deleted: true }))
    // console.log('deleted')
  }
  editMovie = () => {
    // console.log('edit eventually')
  }

  render () {
    // console.log(this.state)
    const { movie, deleted } = this.state
    if (deleted) {
      return <Redirect to={
        {
          pathname: '/movies'
        }
      }/>
    }
    console.log(this.state)
    return (
      <div className="mx-auto py-3 px-1">
        { movie && (
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
                      className="activator"
                      component="img"
                      alt="no poster found"
                      src={'https://i.imgur.com/R7mqXKL.png'}
                      // title="card-image"
                    />
                    : <img
                      className="activator" // materialboxed ?
                      component="img"
                      alt="movie-poster"
                      src={`https://image.tmdb.org/t/p/w185/${this.props.image}`}
                      // title={this.props.title}
                    />
                }
              </div>
            </StyledTooltip>
            <div className="card-content grey lighten-4" style={{ textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden' }}>
              <Tooltip title="More" style={{ size: '1.5em', fontSize: '1.5em' }}>
                <a className="right" style={{ color: 'rgba(0, 0, 0, 0.87)' }} href={`#/movies/${this.state.movie._id}`}><i className="material-icons small right navigate_next">navigate_next</i></a>
              </Tooltip>
              <span style={{ textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden' }} className="card-title activator grey-text text-darken-4">{this.props.title}
              </span>
            </div>
            <div className="card-reveal">
              <span className="card-title grey-text text-darken-4">{this.props.title}<i className="material-icons right">close</i></span>
              <p>Saved to: <a style={{ color: 'rgba(0, 0, 0, 0.87)' }} href={`#/genres/${this.state.movie.genre._id}`}>{this.state.movie.genre.name}</a></p>
              <EditMenu className="material-icons right" id={this.state.movie._id} movie={this.state.movie} title={this.state.movie.title} user={this.props.user} released={this.props.released} genre={this.props.genre} description={this.state.movie.description} image={this.state.movie.image} style={{ textDecoration: 'none' }} deleteMovie={this.deleteMovie} editMovie={this.editMovie}/>

              <Tooltip title="More">
                <a className="btn-floating mb-3" href={`#/movies/${this.state.movie._id}`}><i className="material-icons navigate_next">navigate_next</i></a>
              </Tooltip>
              <p>{this.props.description}</p>
            </div>
          </Card>
        )}
      </div>
    )
  }
}
// <a style={{ textDecoration: 'none' }} className="right" href={`#/movies/${this.state.movie._id}`}><i className="material-icons right navigate_next">navigate_next</i></a>

// <p>{this.state.movie.genre.name}</p>
// <EditMenu className="material-icons right" id={this.props.id} movie={this.props.movie} title={this.props.title} user={this.props.user} released={this.props.released} genre={this.props.genre} description={this.props.description} image={this.props.image} style={{ textDecoration: 'none' }} deleteMovie={this.deleteMovie} editMovie={this.editMovie}/>
// <EditMenu className="material-icons right" id={this.state.movie._id} movie={this.state.movie} title={this.state.movie.title} user={this.props.user} released={this.props.released} genre={this.props.genre} description={this.state.movie.description} image={this.state.movie.image} style={{ textDecoration: 'none' }} deleteMovie={this.deleteMovie} editMovie={this.editMovie}/>

export default withRouter(MaterializeMovieClass)
