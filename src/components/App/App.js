import React, { Component, Fragment } from 'react'
import { Route } from 'react-router-dom'
import AuthenticatedRoute from '../AuthenticatedRoute/AuthenticatedRoute'
import AutoDismissAlert from '../AutoDismissAlert/AutoDismissAlert'
import Header from '../Header/HeaderClass'
import SignUp from '../SignUp/SignUp'
import SignIn from '../SignIn/SignIn'
import SignOut from '../SignOut/SignOut'
import ChangePassword from '../ChangePassword/ChangePassword'
import MovieClass from '../Movies/MovieClass'
import Movies from '../Movies/Movies'
import Genre from '../Genres/Genre'
import Lists from '../Genres/Lists'
import AddGenre from '../Genres/AddGenre/AddGenre'
import SearchArea from './SearchArea'
import SearchResults from './SearchResults'
import Trending from './trending'
import MovieInfoClass from './MovieInfoClass'
import Container from '@material-ui/core/Container'
import Pagination from './Pagination'
import ScrollToTop from './ScrollToTop'
import axios from 'axios'
import apiUrl from '../../apiConfig'

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
    // this.apiKey = process.env.REACT_APP_MY_API_KEY
  }
  apiKey = `${process.env.REACT_APP_MY_API_KEY}`

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
    const selectedMovie = this.state.searchedMovies.filter(movie => movie.id === id)
    // const selectedMovie = this.state.movies.filter(movie => movie.id === id)
    const newCurrentMovie = selectedMovie.length > 0 ? selectedMovie[0] : null
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
    // fetch(`https://api.themoviedb.org/3/search/movie?api_key= &original_language=en-US&include_adult=false&query=${this.state.searchTerm}`)
    // fetch(`https://api.themoviedb.org/3/search/movie?api_key= &with_origin_country=US&include_adult=false&query=${this.state.searchTerm}`)
    fetch(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_MY_API_KEY}&include_adult=false&with_credits&query=${this.state.searchTerm}`)
    // fetch(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_MY_API_KEY}&original_language=en&include_adult=false&query=${this.state.searchTerm}`)
    // fetch(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_MY_API_KEY}&language=en-US&include_adult=false&query=${this.state.searchTerm}`)
      .then(data => data.json())
      .then(data => {
        // this.setState({ movies: [...data.results], totalResults: data.total_results })
        const englishMovies = []
        data.results.forEach(function (entry) {
          if (entry.original_language === 'en') {
            englishMovies.push(entry)
          }
        })
        // for each result, check production country, if US add to array
        // .then(data => {
        //   const engProduction = []
        //   data.results.forEach(function (entry) {
        //     fetch(`https://api.themoviedb.org/3/movie/${id}?api_key= &language=en-US`)
        //   })
        // })
        this.setState({ searchedMovies: [...englishMovies], totalResults: data.total_results, movies: [...englishMovies] })
        this.setState({ currentPage: 1 })
      })
      .catch(error => {
        console.error(error)
      })
  }
  nextPage = (pageNumber) => {
    event.preventDefault()

    fetch(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_MY_API_KEY}&language=en-US&query=${this.state.searchTerm}&page=${pageNumber}`)
      .then(data => data.json())
      .then(data => {
        const englishMovies = []
        data.results.forEach(function (entry) {
          if (entry.original_language === 'en') {
            englishMovies.push(entry)
          }
        })
        this.setState({ searchedMovies: [...englishMovies], totalResults: data.total_results, movies: [...englishMovies], currentPage: pageNumber })
      })
      // .then(data => {
      //   this.setState({ movies: [...data.results], currentPage: pageNumber })
      //   this.setState({ searchedMovies: [...data.results], currentPage: pageNumber })
      // })
      .catch(error => {
        console.error(error)
      })
  }

  // getTrending = async (token) => {
  //   try {
  //     const response = await fetch('/trending', {
  //       method: 'GET',
  //       headers: {
  //         Authorization: `Token token=${token}`
  //       }
  //     })
  //     if (response.ok) {
  //       const data = await response.json()
  //       console.log(data)
  //     } else {
  //       throw new Error('Error fetching data')
  //     }
  //   } catch (error) {
  //     console.error(error)
  //   }
  // };

  // this one works
  getTrending = async (token) => {
    try {
      const response = await axios({
        url: `${apiUrl}/trending`,
        method: 'GET',
        headers: {
          Authorization: `Token token=${token}`
        }
      })
      const results = response.data.results
      this.setState({ movies: [...results] })
      console.log(response.data, this.state.movies)
    } catch (error) {
      console.error(error)
    }
  }
  // getTrending = async (user) => {
  //   try {
  //     const response = await axios({
  //       url: `${apiUrl}/trending`,
  //       method: 'GET',
  //       headers: {
  //         Authorization: `Token token=${this.props.user.token}`
  //       }
  //     })
  //     console.log(response.data)
  //   } catch (error) {
  //     console.error(error)
  //   }
  // }
  // getTrending = (event) => {
  //   try {
  //     const response = axios({
  //       url: `${apiUrl}/trending`,
  //       method: 'GET',
  //       headers: {
  //         Authorization: `Token token=${this.props.user.token}`
  //       }
  //     })
  //       .then(response => response.json())
  //       .then(data => data.json())
  //       .then(data => {
  //         this.setState({ movies: [...data.results] })
  //       })
  //     this.setState({ movies: response.data.results })
  //     console.log('response', response.data)
  //     console.log('response.data.results', response.data.results)
  //       .then(response => response.json())
  //       .then(response => {
  //         this.setState({ movies: [...response.data.results], isLoading: false })
  //       })
  //   } catch (error) {
  //     console.error(error)
  //   }
  // fetch(`https://api.themoviedb.org/3/trending/movie/week?api_key=${this.apiKey}&language=en-US`)
  //   .then(data => data.json())
  //   .then(data => {
  //     this.setState({ movies: [...data.results] })
  //     // this.setState({ searchedMovies: [...data.results], totalResults: data.total_results })
  //   })
  //   .catch(error => {
  //     console.error(error)
  //   })
  //   console.log('hi')
  // }
  getGenres = (event) => {
    fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${this.apiKey}&language=en-US`)
      .then(data => data.json())
      .then(data => {
        this.setState({ genres: [...data.genres] })
      })
      .catch(error => {
        console.error(error)
      })
  }
  getMovie = (event) => {
    fetch(`https://api.themoviedb.org/3/movie/${this.id}?api_key=${process.env.REACT_APP_MY_API_KEY}&language=en-US`)
      // &append_to_response=credits
      .then(data => data.json())
      .then(data => {
        this.setState({ currentMovie: [...data] })
      })
      .catch(error => {
        console.error(error)
      })
  }
  getMovieDetails = (id) => {
    fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_MY_API_KEY}&language=en-US&${id}`)
      .then(data => data.json())
      .then(data => {
        this.setState({ currentMovie: [...data] })
      })
      .catch(error => {
        console.error(error)
      })
  }
   handleChange = (event) => {
     this.setState({ searchTerm: event.target.value })
   }
   // <AuthenticatedRoute user={user} exact path='/search' component={App} render={() => (<div><SearchArea user={user} handleSubmit={this.handleSubmit} handleChange={this.handleChange} handleClick={this.handleClick}/> <SearchResults user={user} viewMovie={this.viewMovie} movies={this.state.movies} handleSubmit={this.handleSubmit} handleChange={this.handleChange} handleClick={this.handleClick}/></div>)} />
   // <AuthenticatedRoute user={user} exact path='/more-info' render={() => (<MovieInfo user={user} currentMovie={this.state.currentMovie} closeMovieInfo={this.closeMovieInfo}/>)} />
   // currentMovie={this.state.currentMovie}
   render () {
     const { user, alerts } = this.state
     const numberPages = Math.floor(this.state.totalResults / 20)
     return (
       <Fragment>
         <Header user={user} setUser={this.setUser} history={history} location={location} alert={this.alert} />
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
           <ScrollToTop />

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
             <div>
               <SearchArea user={user} handleSubmit={this.handleSubmit} handleChange={this.handleChange} handleClick={this.handleClick}/>
               <SearchResults user={user} viewMovie={this.viewMovie} getMovieDetails={this.getMovieDetails} searchedMovies={this.state.searchedMovies} movies={this.state.movies} handleSubmit={this.handleSubmit} handleChange={this.handleChange} handleClick={this.handleClick}/>
               { this.state.totalResults > 20 ? <Pagination user={user} pages={numberPages} nextPage={this.nextPage} currentPage={this.state.currentPage}/> : '' }
             </div>)}
           />

           <AuthenticatedRoute user={user} exact path='/genres/'
             render={() => (
               <div>
                 <Lists alert={this.alert} user={user}/>
               </div>
             )}
           />

           <AuthenticatedRoute user={user} exact path='/movies'
             render={() => (<Movies user={user} viewMovie={this.viewMovie} handleClick={this.handleClick} movie={this.state.movie} getMovie={this.getMovie}/>)}/>

           <AuthenticatedRoute user={user} path='/trending'
             render={() => (
               <div>
                 <Trending alert={this.alert} user={user} getTrending={this.getTrending} getMovieDetails={this.getMovieDetails} movies={this.state.movies} handleClick={this.handleClick} movie={this.state.movie} getMovie={this.getMovie} viewMovie={this.viewTrendingMovie} setUser={this.setUser} getGenres={this.getGenres} currentMovie={this.state.currentMovie} />
               </div>
             )}/>

           <AuthenticatedRoute user={user} path="/more-info" render={() => (
             <MovieInfoClass alert={this.alert} user={user} saved={this.saved} currentMovie={this.state.currentMovie} closeMovieInfo={this.closeMovieInfo}/>
           )}/>

           <AuthenticatedRoute user={user} exact path='/movies/:id'
             render={() => (<MovieClass user={user}/>)}/>

           <AuthenticatedRoute user={user} exact path='/genres/:id'
             render={() => (<Genre user={user}/>)}/>

           <AuthenticatedRoute user={user} path="/creategenre"
             render={() => (<AddGenre user={user}/>)}/>

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
