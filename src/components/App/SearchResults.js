import React from 'react'
import Movie from './Movie'

const SearchResults = (props) => {
  console.log('props', props)
  console.log('props.searchedMovies', props.searchedMovies)
  return (
    <div className="results-container my-5">
      <div className="row mx-1">
        {
          props.searchedMovies.map((movie, i) => {
            return (
              <Movie key={i} user={props.user} currentMovie={props.currentMovie} viewMovie={props.viewMovie} released={movie.release_date} genreIds={movie.genre_ids} tagline={movie.tagline} runtime={movie.runtime} image={movie.poster_path} movieId={movie.id} title={movie.title} description={movie.overview}/>
            )
          })
        }
      </div>
    </div>
  )
}

// <div className="results-container my-5">
//   <div className="row">
export default SearchResults
