import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'

import Spinner from 'react-bootstrap/Spinner'

// const titleStyle = {
//   float: 'right',
//   fontSize: '14px',
//   textColor: 'black',
//   font: 'helvetica',
//   marginTop: '2px',
//   verticleAlign: 'middle',
//   link: 'black'
// }
const itemStyle = {
  // marginTop: '1px',
  // marginBottom: '1px',
  // paddingLeft: '1px',
  justifyContent: 'space-evenly'
  // padding: '1px 1px 1px 1px'
  // backgroundColor: 'blue',
  // padding: '0rem, 0rem'
}
// const rowStyle = {
//   marginBottom: '0px'
// }
const linkStyle = {
  color: 'black',
  paddingLeft: '15px',
  // float: 'right',
  right: '5px'
}

class movies extends Component {
  constructor () {
    super()

    this.state = {
      movies: [],
      isLoading: true
    }
  }

  async componentDidMount () {
    try {
      const response = await axios({
        url: `${apiUrl}/movies`,
        method: 'GET',
        headers: {
          Authorization: `Token token=${this.props.user.token}`
        }
      })
      this.setState({ movies: response.data.movies, isLoading: false })
    } catch (error) {
    }
  }

  render () {
    const moviesJsx = this.state.movies.map(movie => (
      <div className="collection-item" style={itemStyle} key={movie._id}>
        { movie.image == null ? <img src={'https://i.imgur.com/R7mqXKL.png'} alt="card image" style={{ width: '10', height: 100, padding: '1' }}/> : <img src={`https://image.tmdb.org/t/p/w185/${movie.image}`} alt="card image" style={{ width: '10', height: 100, padding: '1' }}/> }
        <Link to={`/movies/${movie._id}`} className="title" style={linkStyle}>{movie.title}</Link>
        { /* <Link to={`/movies/${movie._id}`} className="secondary-content"><i className="material-icons">search</i></Link> */ }
      </div>
    ))

    if (this.state.isLoading) {
      return (
        <div className="text-center">
          <Spinner animation="border" variant="primary" />
        </div>
      )
    }
    return (
      <ul className="movie-list collection">
        {this.state.movies.length
          ? moviesJsx
          : <ul>No movies found</ul>
        }
      </ul>
    )
  }
}
// <ListGroup.Item key={movie._id} style={itemStyle}>
//   <div className="row" style={rowStyle}>
//     <div className="col-10 col-md-6 col-lg-4 my-3" style={{ flexRow: 'flexRight' }}>
//       { movie.image == null ? <img src={'https://i.imgur.com/R7mqXKL.png'} alt="card image" style={{ width: '10', height: 100, padding: '1' }}/> : <img src={`https://image.tmdb.org/t/p/w185/${movie.image}`} alt="card image" style={{ width: '10', height: 100, padding: '1' }}/> }
//       <div style={titleStyle} className="info-container">
//         <Link style={linkStyle} to={`/movies/${movie._id}`}>{movie.title}</Link>
//       </div>
//     </div>
//   </div>
// </ListGroup.Item>

export default movies
