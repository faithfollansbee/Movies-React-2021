import React, { Component, Fragment } from 'react'
// import { Link } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'
// import Card from '@material-ui/core/Card'
// import CardActions from '@material-ui/core/CardActions'
// import CardContent from '@material-ui/core/CardContent'
import FormControl from 'react-bootstrap/FormControl'
// import Button from '@material-ui/core/Button'
// import CardHeader from '@material-ui/core/CardHeader'
// import IconButton from '@material-ui/core/IconButton'
// import FavoriteIcon from '@material-ui/icons/Favorite'
// import EditIcon from '@material-ui/icons/Edit'
// import MoreVertIcon from '@material-ui/icons/MoreVert'
import Spinner from 'react-bootstrap/Spinner'
// import Typography from '@material-ui/core/Typography'
import Movie2 from './Movie2'

// const linkStyle = {
//   color: 'black',
//   paddingLeft: '15px',
//   right: '5px'
// }

class movies extends Component {
  constructor () {
    super()

    this.state = {
      movies: [],
      userMovies: [],
      isLoading: true,
      filtered: false
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
      this.setState({ userMovies: response.data.movies })
    } catch (error) {
    }
    console.log(this.state.movies)
  }

  handleFilter = event => {
    event.preventDefault()
    this.setState({ filtered: !this.state.filtered })
  }

  handleChange = event => {
    const searchString = event.target.value.toLowerCase()
    const queryLength = searchString.length
    const prevQueryLength = this.state.queryLength || 0
    const movies = queryLength > prevQueryLength ? this.state.userMovies : this.state.movies

    const searchResults = movies.filter(movie => movie.title.toLowerCase().includes(searchString))

    this.setState({ userMovies: searchResults, queryLength: queryLength })
  }
  // const moviesJsx = this.state.movies.map(movie => (

  render () {
    // const { userMovies } = this.state
    // const moviesJsx = userMovies.map(movie => (
    //   <Card className="card-style" key={movie._id}>
    //     { movie.image == null ? <img src={'https://i.imgur.com/R7mqXKL.png'} alt="card image" style={{ width: '10', height: 100, padding: '1' }}/> : <img src={`https://image.tmdb.org/t/p/w185/${movie.image}`} alt="card image" style={{ width: '10', height: 100, padding: '1' }}/> }
    //     <CardHeader
    //       action={
    //         <IconButton aria-label="settings">
    //           <MoreVertIcon />
    //         </IconButton>
    //       }
    //       // title={movie.name}
    //       title={movie.title}
    //       subheader={movie.released}
    //     />
    //     <CardContent className="content">
    //       <Typography>{movie.steps}</Typography>
    //     </CardContent>
    //     <br/>
    //     <CardActions>
    //       <IconButton aria-label="add to favorites">
    //         <FavoriteIcon />
    //       </IconButton>
    //       {(this.props.user && movie) && this.props.user._id === movie.owner
    //         ? <IconButton aria-label="edit" href={`#movies/${movie._id}/edit`}>
    //           <EditIcon />
    //         </IconButton>
    //         : ''
    //       }
    //       <Button>
    //         <Link id={movie._id} className="link-style" to={`/movies/${movie._id}`}> View details</Link>
    //         <a href="" className="waves-effect waves-teal btn-flat"></a>
    //       </Button>
    //     </CardActions>
    //     <Link to={`/movies/${movie._id}`} className="title" style={linkStyle}>{movie.title}</Link>
    //     { /* <Link to={`/movies/${movie._id}`} className="secondary-content"><i className="material-icons">search</i></Link> */ }
    //   </Card>
    // ))

    if (this.state.isLoading) {
      return (
        <div className="text-center">
          <Spinner animation="border" variant="primary" />
        </div>
      )
    }
    return (
      <div className="layout-style">
        <Fragment>
          <h1 className="title-style">Your movies</h1>
          <div className="search">
            {
              <Fragment>
                <FormControl
                  placeholder="Search"
                  aria-label="Search"
                  onChange={this.handleChange}
                />
              </Fragment>
            }
          </div>
          <div>
            {this.state.movies.map(movie => (
              <Movie2
                key={movie.name + movie._id}
                handleRefresh={this.handleRefresh}
                user={this.props.user}
                id={movie._id}
                description={movie.description}
                released={movie.released}
                image={movie.image}
                thisstate={this.state}
                alert={this.props.alert}
                genre={this.genre}
              />
            ))}
          </div>
        </Fragment>
      </div>
    )
  }
}
// {this.state.movies.length
//   ? moviesJsx
//   : <ul>No movies found</ul>
// }
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
