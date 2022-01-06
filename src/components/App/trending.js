import React, { Component } from 'react'
import Movie from './Movie'

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
        this.setState({ movies: [...data.results] })
        // this.setState({ searchedMovies: [...data.results], totalResults: data.total_results })

        // console.log(this.state, 'got trending')
      })
      .catch(error => {
        console.error(error)
      })
    console.log('Rendered from trending')
  }

  render (props) {
    console.log(this.state.movies)
    return (
      <div className="results-container my-5">
        <h1><strong>Trending now</strong></h1>
        <div className="row">
          {
            this.state.movies.map((movie, i) => {
              return (
                <Movie
                  key={i} user={this.props.user}
                  currentMovie={this.props.currentMovie}
                  // viewTrendingMovie={this.props.viewTrendingMovie}
                  viewMovie={this.props.viewTrendingMovie}
                  released={movie.release_date}
                  backdrop={movie.backdrop_path}
                  genresIds={movie.genre_ids}
                  image={movie.poster_path}
                  movieId={movie.id}
                  title={movie.title}
                  description={movie.overview}
                />
              )
            })
          }
        </div>
      </div>
    )
  }
}
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
export default Trending
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
