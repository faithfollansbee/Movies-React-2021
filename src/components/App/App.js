import React, { Component, Fragment } from 'react'
import { Route } from 'react-router-dom'
import AuthenticatedRoute from '../AuthenticatedRoute/AuthenticatedRoute'
import AutoDismissAlert from '../AutoDismissAlert/AutoDismissAlert'
import Header from '../Header/Header'
import SignUp from '../SignUp/SignUp'
import SignIn from '../SignIn/SignIn'
import SignOut from '../SignOut/SignOut'
import ChangePassword from '../ChangePassword/ChangePassword'
import MovieClass from '../Movies/MovieClass'
// import UpdateMovie from '../Movies/UpdateMovie'
import Movies from '../Movies/Movies'
import Genre from '../Genres/Genre'
import GenresLoop from '../Genres/GenresLoop'
import AddGenre from '../Genres/AddGenre/AddGenre'
// import UpdateGenre from '../Genres/UpdateGenre'
import SearchArea from './SearchArea'
import SearchResults from './SearchResults'
import Trending from './trending'
import MovieInfoClass from './MovieInfoClass'
import Container from '@material-ui/core/container'
import Pagination from './Pagination'
// import SearchAppBar from './SearchAppBar'
// import MovieInfo from './TestMovieInfo'
// import SaveMovie from './SaveMovie'
// import Landing from '../landing/landing'
// import TrendingFunction from './trendingFunction'
// import MovieInfo from './MovieInfo'
// import TestMovieInfo from './TestMovieInfo'
// import Genre3 from '../Genres/Genre3'
// import Genres from '../Genres/Genres'
class App extends Component {
  constructor () {
    super()
    this.state = {
      user: null,
      movies: [],
      searchedMovies: [],
      trendingMovies: [],
      searchTerm: '',
      currentMovie: null,
      alerts: [],
      saved: false,
      totalResults: 0,
      currentPage: 1,
      genres: null,
      movie: null
    }
    this.apiKey = process.env.apiKey
  }

  setUser = user => this.setState({ user })
  clearUser = () => this.setState({ user: null })
  alert = ({ heading, message, variant }) => {
    this.setState({ alerts: [...this.state.alerts, { heading, message, variant }] })
  }
  deleteAlert = (id) => {
    this.setState((state) => {
      return { alerts: state.alerts.filter(msg => msg.id !== id) }
    })
  }
  viewMovie = (id) => {
    event.preventDefault()
    // const selectedMovie = this.state.movies.filter(movie => movie.id === id)
    // const newCurrentMovie = selectedMovie.length > 0 ? selectedMovie[0] : null
    const selectedMovie = this.state.searchedMovies.filter(movie => movie.id === id)
    const newCurrentMovie = selectedMovie.length > 0 ? selectedMovie[0] : null
    // const currentMovieObj = selectedMovie[0]
    // this.setState({ currentMovie: currentMovieObj })
    this.setState({ currentMovie: newCurrentMovie })
  }
  viewTrendingMovie = (id) => {
    event.preventDefault()
    const selectedMovie = this.state.movies.filter(movie => movie.id === id)
    const newCurrentMovie = selectedMovie.length > 0 ? selectedMovie[0] : null

    // const newTrendingMovie = selectedMovie.length > 0 ? selectedMovie[0] : null
    // const currentMovieObj = selectedMovie[0]
    // this.setState({ currentMovie: currentMovieObj })
    // this.setState({ trendingMovie: newTrendingMovie })
    this.setState({ currentMovie: newCurrentMovie })

    console.log('view movie')
    console.log(id)
  }

  closeMovieInfo = () => {
    event.preventDefault()
    this.setState({ currentMovie: null })
  }

  BackToResults = () => {
    this.setState({ currentMovie: null })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    //  this.apiKey = process.env.API_KEY
    fetch(`https://api.themoviedb.org/3/search/movie?api_key=4a0223110b505876ba0985949c17e865&language=en-US&query=${this.state.searchTerm}`)
      .then(data => data.json())
      .then(data => {
        // this.setState({ movies: [...data.results], totalResults: data.total_results })
        this.setState({ searchedMovies: [...data.results], totalResults: data.total_results })
        // console.log(data)
      })
      .catch(error => {
        console.error(error)
      })
  }
  nextPage = (pageNumber) => {
    event.preventDefault()
    fetch(`https://api.themoviedb.org/3/search/movie?api_key=4a0223110b505876ba0985949c17e865&language=en-US&query=${this.state.searchTerm}&page=${pageNumber}`)
      .then(data => data.json())
      .then(data => {
        this.setState({ movies: [...data.results], currentPage: pageNumber })
        this.setState({ searchedMovies: [...data.results], currentPage: pageNumber })
        // console.log(data)
      })
      .catch(error => {
        console.error(error)
      })
  }

  getTrending = (event) => {
    // console.log('got trending')
    // event.preventDefault()
    //  this.apiKey = process.env.API_KEY
    fetch('https://api.themoviedb.org/3/trending/movie/week?api_key=4a0223110b505876ba0985949c17e865&language=en-US')
      .then(data => data.json())
      .then(data => {
        this.setState({ movies: [...data.results] })
        // this.setState({ searchedMovies: [...data.results], totalResults: data.total_results })

        // console.log(this.state.movies, 'got trending')
      })
      .catch(error => {
        console.error(error)
      })
  }
  getGenres = (event) => {
    // console.log('got genres')
    fetch('https://api.themoviedb.org/3/genre/movie/list?api_key=4a0223110b505876ba0985949c17e865&language=en-US')
    // console.log()
      .then(data => data.json())
      .then(data => {
        this.setState({ genres: [...data.genres] })
        // console.log(this.state.genres, 'got genres')
      })
      .catch(error => {
        console.error(error)
      })
  }
  getMovie = (event) => {
    // event.preventDefault()
    fetch(`https://api.themoviedb.org/3/movie/${this.id}?api_key=4a0223110b505876ba0985949c17e865&language=en-US`)
      .then(data => data.json())
    // console.log(this.data.movie)
      .then(data => {
        this.setState({ currentMovie: [...data] })
        // console.log(this.state.currentMovie, 'got movie')
      })
      .catch(error => {
        console.error(error)
      })
  }

   handleChange = (event) => {
     this.setState({ searchTerm: event.target.value })
   }
   // <SaveMovie user={user}/>
   // <AuthenticatedRoute user={user} exact path='/search' component={App} render={() => (<div><SearchArea user={user} handleSubmit={this.handleSubmit} handleChange={this.handleChange} handleClick={this.handleClick}/> <SearchResults user={user} viewMovie={this.viewMovie} movies={this.state.movies} handleSubmit={this.handleSubmit} handleChange={this.handleChange} handleClick={this.handleClick}/></div>)} />
   // <AuthenticatedRoute user={user} exact path='/more-info' render={() => (<MovieInfo user={user} currentMovie={this.state.currentMovie} closeMovieInfo={this.closeMovieInfo}/>)} />
   // currentMovie={this.state.currentMovie}
   render () {
     const { user, alerts } = this.state
     const numberPages = Math.floor(this.state.totalResults / 20)
     return (
       <Fragment>
         <Header user={user} />
         { /* <Landing /> */ }
         {alerts.map((alert, index) => (
           <AutoDismissAlert
             key={index}
             heading={alert.heading}
             variant={alert.variant}
             message={alert.message}
             deleteAlert={this.deleteAlert}
           />
         ))}
         <Container>
           { /* { this.state.currentMovie == null
             ? <AuthenticatedRoute user={user} exact path='/search' component={App} render={() => (<div><SearchArea user={user} handleSubmit={this.handleSubmit} handleChange={this.handleChange} handleClick={this.handleClick}/> <SearchResults user={user} viewMovie={this.viewMovie} movies={this.state.movies} handleSubmit={this.handleSubmit} handleChange={this.handleChange} handleClick={this.handleClick}/></div>)} />
             : <AuthenticatedRoute user={user} path="/more-info" render={() => <MovieInfo user={user} currentMovie={this.state.currentMovie} closeMovieInfo={this.closeMovieInfo}/>} />
           } */ }
           { /* <div> <MovieInfo user={user} currentMovie={this.state.currentMovie} closeMovieInfo={this.closeMovieInfo}/> </div> */ }
           { /* <AuthenticatedRoute user={user} exact path='/search' component={App} render={() => (<SearchResults user={user} movies={this.state.movies} ViewMovie={this.ViewMovie} handleSubmit={this.handleSubmit} handleChange={this.handleChange} handleClick={this.handleClick}/>)}/>
*/ }

           { /*  <AuthenticatedRoute user={user} exact path='/search' component={App}
              render={() => (<SearchArea user={user} handleSubmit={this.handleSubmit} ViewMovie={this.ViewMovie} handleChange={this.handleChange} handleClick={this.handleClick}/>)}/>

            <AuthenticatedRoute user={user} exact path='/search' component={App}
              render={() => (<SearchResults user={user} movies={this.state.movies} ViewMovie={this.ViewMovie} handleSubmit={this.handleSubmit} handleChange={this.handleChange} handleClick={this.handleClick}/>)}/>
*/}
           { /*            <AuthenticatedRoute user={user} path="/trending-info" render={() => (<MovieInfoClass user={user} saved={this.saved} currentMovie={this.state.currentMovie} getMovie={this.getMovie} movie={this.state.movie} closeMovieInfo={this.closeMovieInfo}/>)}/> */ }
           <AuthenticatedRoute user={user} path="/search" component={App} render={() => (
             <div><SearchArea user={user} handleSubmit={this.handleSubmit} handleChange={this.handleChange} handleClick={this.handleClick}/>
               <SearchResults user={user} viewMovie={this.viewMovie} searchedMovies={this.state.searchedMovies} movies={this.state.movies} handleSubmit={this.handleSubmit} handleChange={this.handleChange} handleClick={this.handleClick}/>
               { this.state.totalResults > 20 ? <Pagination user={user} pages={numberPages} nextPage={this.nextPage} currentPage={this.state.currentPage}/> : '' }
             </div>)}
           />

           <AuthenticatedRoute user={user} path="/more-info" render={() => (
             <MovieInfoClass user={user} saved={this.saved} currentMovie={this.state.currentMovie} closeMovieInfo={this.closeMovieInfo}/>
           )}/>
           <AuthenticatedRoute user={user} exact path='/movies'
             render={() => (<Movies user={user} viewMovie={this.viewMovie} handleClick={this.handleClick} movie={this.state.movie} getMovie={this.getMovie}/>)}/>

           <AuthenticatedRoute user={user} exact path='/movies/:id'
             render={() => (<MovieClass user={user}/>)}/>

           <AuthenticatedRoute user={user} exact path='/genres/'
             render={() => (
               <div>
                 <GenresLoop user={user}/>
               </div>
             )}
           />

           <AuthenticatedRoute user={user} exact path='/genres/:id'
             render={() => (<Genre user={user}/>)}/>

           <AuthenticatedRoute user={user} path="/creategenre"
             render={() => (<AddGenre user={user}/>)}/>

           <AuthenticatedRoute user={user} path='/trending'
             render={() => (
               <div>
                 <Trending user={user} getTrending={this.getTrending} movies={this.state.movies} handleClick={this.handleClick} movie={this.state.movie} getMovie={this.getMovie} viewTrendingMovie={this.viewTrendingMovie} viewMovie={this.viewMovie} setUser={this.setUser} getGenres={this.getGenres}/>
               </div>
             )}/>

           <Route path='/sign-up' render={() => (
             <SignUp alert={this.alert} setUser={this.setUser}/>)}/>

           <Route path='/sign-in' render={() => (
             <SignIn alert={this.alert} setUser={this.setUser}/>
           )}/>

           <AuthenticatedRoute user={user} path='/sign-out' render={() => (
             <SignOut alert={this.alert} clearUser={this.clearUser} user={user}/>)}/>

           <AuthenticatedRoute user={user} path='/change-password' render={() => (
             <ChangePassword alert={this.alert} user={user} />)}/>
         </Container>
       </Fragment>
     )
   }
}
// <AuthenticatedRoute user={user} exact path="/movies/:id/edit" render={() => ( <UpdateMovie user={user} alert={this.alert}/>)}/>
// <AuthenticatedRoute user={user} exact path="/genres/:id/edit" render={() => (<UpdateGenre user={user} />)}/>
// <AuthenticatedRoute user={user} path="/trending-info" render={() => (<MovieInfoClass user={user} currentMovie={this.state.currentMovie} saved={this.saved} closeMovieInfo={this.closeMovieInfo}/>)}/>

export default App
