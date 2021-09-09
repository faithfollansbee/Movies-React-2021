import React, { Component, Fragment } from 'react'
import { Route } from 'react-router-dom'
import AuthenticatedRoute from '../AuthenticatedRoute/AuthenticatedRoute'
import AutoDismissAlert from '../AutoDismissAlert/AutoDismissAlert'
import Header from '../Header/Header'
import SignUp from '../SignUp/SignUp'
import SignIn from '../SignIn/SignIn'
import SignOut from '../SignOut/SignOut'
import ChangePassword from '../ChangePassword/ChangePassword'
import Movie from '../Movies/Movie'
import UpdateMovie from '../Movies/UpdateMovie'
import Movies from '../Movies/Movies'
import Genre from '../Genres/Genre'
import Genres from '../Genres/Genres'
import AddGenre from '../Genres/AddGenre'
import UpdateGenre from '../Genres/UpdateGenre'
import SearchArea from './SearchArea'
import SearchResults from './SearchResults'
import Trending from './trending'
import MovieInfo from './MovieInfo'
import SaveMovie from './SaveMovie'
// import Landing from '../landing/landing'

class App extends Component {
  constructor () {
    super()
    this.state = {
      user: null,
      movies: [],
      searchTerm: '',
      currentMovie: null,
      alerts: []
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
    const selectedMovie = this.state.movies.filter(movie => movie.id === id)
    const newCurrentMovie = selectedMovie.length > 0 ? selectedMovie[0] : null
    // const currentMovieObj = selectedMovie[0]
    // this.setState({ currentMovie: currentMovieObj })
    this.setState({ currentMovie: newCurrentMovie })
    // console.log(currentMovieObj)
  }
  closeMovieInfo = () => {
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
        this.setState({ movies: [...data.results] })
        console.log(data)
      })
      .catch(error => {
        console.error(error)
      })
  }

  getTrending = (event) => {
    console.log('got trending')
    // event.preventDefault()
    //  this.apiKey = process.env.API_KEY
    fetch('https://api.themoviedb.org/3/trending/movie/week?api_key=4a0223110b505876ba0985949c17e865&language=en-US')
      .then(data => data.json())
      .then(data => {
        this.setState({ movies: [...data.results] })
        console.log(this.state.movies, 'got trending')
      })
      .catch(error => {
        console.error(error)
      })
  }

   handleChange = (event) => {
     this.setState({ searchTerm: event.target.value })
   }

   render () {
     const { user, alerts } = this.state
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
         <main className="container">
           { this.state.currentMovie == null
             ? <AuthenticatedRoute user={user} exact path='/search' component={App} render={() => (<div><SearchArea user={user} handleSubmit={this.handleSubmit} handleChange={this.handleChange} handleClick={this.handleClick}/> <SearchResults user={user} viewMovie={this.viewMovie} movies={this.state.movies} handleSubmit={this.handleSubmit} handleChange={this.handleChange} handleClick={this.handleClick}/></div>)} />
             : <div> <MovieInfo user={user} currentMovie={this.state.currentMovie} closeMovieInfo={this.closeMovieInfo}/> <SaveMovie user={user}/></div>
           }
           { /* <AuthenticatedRoute user={user} exact path='/search' component={App} render={() => (<SearchResults user={user} movies={this.state.movies} ViewMovie={this.ViewMovie} handleSubmit={this.handleSubmit} handleChange={this.handleChange} handleClick={this.handleClick}/>)}/>
*/ }

           { /*  <AuthenticatedRoute user={user} exact path='/search' component={App}
              render={() => (<SearchArea user={user} handleSubmit={this.handleSubmit} ViewMovie={this.ViewMovie} handleChange={this.handleChange} handleClick={this.handleClick}/>)}/>

            <AuthenticatedRoute user={user} exact path='/search' component={App}
              render={() => (<SearchResults user={user} movies={this.state.movies} ViewMovie={this.ViewMovie} handleSubmit={this.handleSubmit} handleChange={this.handleChange} handleClick={this.handleClick}/>)}/>
*/}
           <AuthenticatedRoute user={user} exact path='/movies'
             render={() => (<Movies user={user}/>)}/>

           <AuthenticatedRoute user={user} exact path='/movies/:id'
             render={() => (<Movie user={user}/>)}/>

           <AuthenticatedRoute user={user} exact path="/movies/:id/edit"
             render={() => (
               <UpdateMovie user={user} alert={this.alert}/>)}/>

           <AuthenticatedRoute user={user} exact path='/genres/'
             render={() => (<Genres user={user}/>)}
           />
           <AuthenticatedRoute user={user} exact path='/genres/:id'
             render={() => (<Genre user={user}/>)}/>

           <AuthenticatedRoute user={user} path="/creategenre"
             render={() => (<AddGenre user={user}/>)}/>

           <AuthenticatedRoute user={user} exact path="/genres/:id/edit"
             render={() => (
               <UpdateGenre user={user} />)}/>

           <AuthenticatedRoute user={user} exact path='/trending'
             render={() => (<Trending user={user} setUser={this.setUser} movies={this.state.movies} ViewMovie={this.ViewMovie} handleClick={this.handleClick} getTrending={this.getTrending}/>)}/>

           <Route path='/sign-up' render={() => (
             <SignUp alert={this.alert} setUser={this.setUser}/>)}/>

           <Route path='/sign-in' render={() => (
             <SignIn alert={this.alert} setUser={this.setUser}/>
           )}/>

           <AuthenticatedRoute user={user} path='/sign-out' render={() => (
             <SignOut alert={this.alert} clearUser={this.clearUser} user={user}/>)}/>

           <AuthenticatedRoute user={user} path='/change-password' render={() => (
             <ChangePassword alert={this.alert} user={user} />)}/>

         </main>
       </Fragment>
     )
   }
}

export default App
