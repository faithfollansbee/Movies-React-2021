import React from 'react'
import Movie from './Movie'

const SearchResults = (props) => {
  return (
    <div className="results-container my-5">
      <div className="row mx-1">
        {
          props.movies.map((movie, i) => {
            return (
              <Movie key={i} user={props.user} currentMovie={props.currentMovie} viewMovie={props.viewMovie} released={movie.release_date} genreIds={movie.genre_ids} image={movie.poster_path} movieId={movie.id} title={movie.title} description={movie.overview}/>
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
