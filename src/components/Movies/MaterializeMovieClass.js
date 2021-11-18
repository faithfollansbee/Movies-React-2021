import React, { Component } from 'react'
import { withRouter, Redirect } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import Card from '@material-ui/core/Card'
// import Button from '@material-ui/core/Button'
// import CardMedia from '@material-ui/core/CardMedia'
// import FavoriteIcon from '@material-ui/icons/Favorite'
// import EditIcon from '@material-ui/icons/Edit'
// import MoreVertIcon from '@material-ui/icons/MoreVert'
// import EditMovie from './EditMovieDialog/EditMovie'
import EditMenu from './EditMenu'

class MaterializeMovieClass extends Component {
  state = {
    movie: null,
    deleted: false
  }

  // async componentDidMount (props) {
  //   try {
  //     const response = await axios({
  //       url: `${apiUrl}/movies/${this.props.match.params.id}`,
  //       method: 'GET',
  //       headers: {
  //         'Authorization': `Token token=${this.props.user.token}`
  //       }
  //     })
  //     this.setState({
  //       movie: response.data.movie, isLoading: false
  //     })
  //   } catch (error) {
  //   }
  // }

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
    // const { movie, deleted } = this.state
    const { deleted } = this.state
    if (deleted) {
      return <Redirect to={
        {
          pathname: '/movies'
        }
      }/>
    }
    return (
      <div className="mx-auto py-1 px-1">
        <Card className="card"
          style={{ width: '20rem' }}
        >
          <div className="card-image activator waves-effect waves-block waves-light">
            {
              this.props.image == null
                ? <img
                  className="activator"
                  component="img"
                  alt="Contemplative Reptile"
                  src={'https://i.imgur.com/R7mqXKL.png'}
                  title="card-image"
                />
                : <img
                  className="activator"
                  component="img"
                  alt="Contemplative Reptile"
                  src={`https://image.tmdb.org/t/p/w185/${this.props.image}`}
                  title="Contemplative Reptile"
                />
            }
          </div>
          <div className="card-content" style={{ textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden' }}>
            <EditMenu className="material-icons right" id={this.props.id} user={this.props.user} style={{ textDecoration: 'none' }} deleteMovie={this.deleteMovie} editMovie={this.editMovie}/>
            <span style={{ textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden' }} className="card-title activator grey-text text-darken-4">{this.props.title}
            </span>
          </div>
          <div className="card-reveal">
            <span className="card-title grey-text text-darken-4">{this.props.title}<i className="material-icons right">close</i></span>
            <p>{this.props.description}</p>
          </div>
        </Card>
      </div>
    )
  }
}

export default withRouter(MaterializeMovieClass)
