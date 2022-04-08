import React, { Component } from 'react'
import Movie from './Movie'

import Skeleton from '@material-ui/lab/Skeleton'
const skeletonPlaceStyle = {
  marginLeft: 'auto',
  marginRight: 'auto',
  padding: '3px 1px',
  height: '392px',
  width: '18rem'
}
class Trending extends Component {
  state = {
    movies: [],
    genres: [],
    isLoading: true
  }

  componentDidMount (event) {
    this.props.getTrending()
    fetch('https://api.themoviedb.org/3/trending/movie/week?api_key=4a0223110b505876ba0985949c17e865&language=en-US')
      .then(data => data.json())
      .then(data => {
        this.setState({ movies: [...data.results], isLoading: false })
        // this.setState({ searchedMovies: [...data.results], totalResults: data.total_results })
      })
      .catch(error => {
        console.error(error)
      })
  }

  render (props) {
    // console.log('this.props', this.props)
    // console.log('this.state', this.state)
    const { movies } = this.state
    const moviesJsx = movies.map((movie, i) => (
      <Movie key={i} user={this.props.user} currentMovie={this.props.currentMovie} getMovie={this.props.getMovie} getMovieDetails={this.props.getMovieDetails}
        viewMovie={this.props.viewMovie} released={movie.release_date} backdrop={movie.backdrop_path}
        genresIds={movie.genre_ids} image={movie.poster_path} movieId={movie.id} id={movie.id} title={movie.title}
        description={movie.overview} />
    ))
    return (
      <div className="results-container my-5">
        <h1 className="title-style">Trending Now</h1>
        <div className="row">
          { this.state.isLoading ? (<div style={{ display: 'flex', flexWrap: 'wrap' }}>
            <div className="mx-auto py-3 px-1"><Skeleton style={skeletonPlaceStyle} variant="rect" /></div>
            <div className="mx-auto py-3 px-1"><Skeleton style={skeletonPlaceStyle} variant="rect" /></div>
            <div className="mx-auto py-3 px-1"><Skeleton style={skeletonPlaceStyle} variant="rect" /></div>
            <div className="mx-auto py-3 px-1"><Skeleton style={skeletonPlaceStyle} variant="rect" /></div>
            <div className="mx-auto py-3 px-1"><Skeleton style={skeletonPlaceStyle} variant="rect" /></div>
            <div className="mx-auto py-3 px-1"><Skeleton style={skeletonPlaceStyle} variant="rect" /></div>
            <div className="mx-auto py-3 px-1"><Skeleton style={skeletonPlaceStyle} variant="rect" /></div>
            <div className="mx-auto py-3 px-1"><Skeleton style={skeletonPlaceStyle} variant="rect" /></div>
            <div className="mx-auto py-3 px-1"><Skeleton style={skeletonPlaceStyle} variant="rect" /></div>
            <div className="mx-auto py-3 px-1"><Skeleton style={skeletonPlaceStyle} variant="rect" /></div>
          </div>)
            : (moviesJsx)
          }
        </div>
      </div>
    )
  }
}
export default Trending
// {
//     this.state.movies.map((movie, i) => {
//       return (
//         <Movie
//           key={i} user={this.props.user}
//           currentMovie={this.props.currentMovie}
//           // viewTrendingMovie={this.props.viewTrendingMovie}
//           viewMovie={this.props.viewTrendingMovie}
//           released={movie.release_date}
//           backdrop={movie.backdrop_path}
//           genresIds={movie.genre_ids}
//           image={movie.poster_path}
//           movieId={movie.id}
//           title={movie.title}
//           description={movie.overview}
//         />
//       )
//     })
//   }
// <Movie key={i} user={this.props.user} currentMovie={this.props.currentMovie} viewMovie={this.props.viewMovie} released={movie.release_date} backdrop={movie.backdrop_path} genresIds={movie.genre_ids} image={movie.poster_path} movieId={movie.id} title={movie.title} description={movie.overview}/>
// <Movie key={i} user={this.props.user}
//   currentMovie={this.props.currentMovie}
//   viewMovie={this.props.viewMovie}
//   released={movie.release_date}
//   backdrop={movie.backdrop_path}
//   genresIds={movie.genre_ids}
//   image={movie.poster_path}
//   movieId={movie.id}
//   title={movie.title}
//   description={movie.overview}
// />
// <MaterializeTrendingMovie key={i} user={this.props.user}
//   currentMovie={this.props.currentMovie}
//   viewMovie={this.props.viewMovie}
//   released={movie.release_date}
//   backdrop={movie.backdrop_path}
//   genresIds={movie.genre_ids}
//   image={movie.poster_path}
//   movieId={movie.id}
//   title={movie.title}
//   description={movie.overview}
//   movies={this.props.movies}
// />
// <MaterializeMovieClass
//   key={i}
//   user={this.props.user}
//   id={movie.id}
//   title={movie.title}
//   description={movie.overview}
//   released={movie.release_date}
//   image={movie.poster_path}
//   genre={movie.genre}
//   backdrop={movie.backdrop_path}
//   genresIds={movie.genre_ids}
// />
// const Trending = (props) => {
//   return (
//     <div className="results-container my-5">
//       <div className="row mx-1">
//         {
//           props.movies.map((movie, i) => {
//             return (
//               <Movie key={i} user={props.user} currentMovie={props.currentMovie} viewMovie={props.viewMovie} released={movie.release_date} image={movie.poster_path} movieId={movie.id} title={movie.title} description={movie.overview}/>
//             )
//           })
//         }
//       </div>
//     </div>
//   )
// }
//
// export default Trending
