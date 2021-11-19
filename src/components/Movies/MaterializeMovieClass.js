import React, { Component } from 'react'
// import { withRouter, Redirect } from 'react-router-dom'
import { withRouter, Redirect } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import Card from '@material-ui/core/Card'
// import CardActionArea from '@material-ui/core/CardActionArea'
import Button from '@material-ui/core/Button'
// import CardMedia from '@material-ui/core/CardMedia'
// import FavoriteIcon from '@material-ui/icons/Favorite'
// import EditIcon from '@material-ui/icons/Edit'
// import MoreVertIcon from '@material-ui/icons/MoreVert'
// import EditMovie from './EditMovieDialog/EditMovie'
import EditMenu from './EditMenu'
// import EditMovieDialog from './EditMovieDialog/EditMovieDialog'
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
    console.log('this.props', this.props)
    // console.log('this.data.movie', this.response.data.movie)
    console.log('this.state', this.state)
    // console.log('this.state.movie.genre.name', this.state.movie.genre.name)
    // console.log('this.props.genre', this.props.genre)
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
      // .then(() => <Redirect to={{ pathname: '/movies' } }/>)
      // .then(() => this.props.history.push('/movies'))
    console.log('deleted')
  }
  editMovie = () => {
    console.log('edit eventually')
  }

  render () {
    console.log(this.state)
    // const { movie, deleted } = this.state
    const { movie, deleted } = this.state
    if (deleted) {
      return <Redirect to={
        {
          pathname: '/movies'
        }
      }/>
    }
    return (
      <div className="mx-auto py-3 px-1">
        { movie && (
          <Card className="card"
            style={{ width: '19rem' }}
          >
            <div className="card-image waves-effect waves-block waves-light">
              {
                this.props.image == null
                  ? <img
                    // className="activator"
                    component="img"
                    alt="Contemplative Reptile"
                    src={'https://i.imgur.com/R7mqXKL.png'}
                    title="card-image"
                  />
                  : <img
                    // className="activator"
                    component="img"
                    alt="Contemplative Reptile"
                    src={`https://image.tmdb.org/t/p/w185/${this.props.image}`}
                    title="Contemplative Reptile"
                  />
              }
            </div>
            <div className="card-content activator" style={{ textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden' }}>
              <EditMenu className="material-icons right" id={this.state.movie._id} movie={this.state.movie} title={this.state.movie.title} user={this.props.user} released={this.props.released} genre={this.props.genre} description={this.state.movie.description} image={this.state.movie.image} style={{ textDecoration: 'none' }} deleteMovie={this.deleteMovie} editMovie={this.editMovie}/>
              <span style={{ textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden' }} className="card-title activator grey-text text-darken-4">{this.props.title}
              </span>
            </div>
            <div className="card-reveal">
              <span className="card-title grey-text text-darken-4">{this.props.title}<i className="material-icons right">close</i></span>
              <p>{this.state.movie.genre.name}</p>
              <p>{this.props.description}</p>
              <Button href={`#/movies/${this.state.movie._id}`} style={{ color: 'inherit', textDecoration: 'none' }}>GO</Button>
            </div>
          </Card>
        )}
      </div>
    )
  }
}
// <p>{this.state.movie.genre.name}</p>

// <EditMenu className="material-icons right" id={this.props.id} movie={this.props.movie} title={this.props.title} user={this.props.user} released={this.props.released} genre={this.props.genre} description={this.props.description} image={this.props.image} style={{ textDecoration: 'none' }} deleteMovie={this.deleteMovie} editMovie={this.editMovie}/>
// <EditMenu className="material-icons right" id={this.state.movie._id} movie={this.state.movie} title={this.state.movie.title} user={this.props.user} released={this.props.released} genre={this.props.genre} description={this.state.movie.description} image={this.state.movie.image} style={{ textDecoration: 'none' }} deleteMovie={this.deleteMovie} editMovie={this.editMovie}/>

export default withRouter(MaterializeMovieClass)
