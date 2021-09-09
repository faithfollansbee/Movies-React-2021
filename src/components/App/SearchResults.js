import React from 'react'
import Movie from './Movie'

const SearchResults = (props) => {
  return (
    <div className="results-container my-5">
      <div className="row">
        {
          props.movies.map((movie, i) => {
            return (
              <Movie key={i} user={props.user} ViewMovie={props.ViewMovie} released={movie.release_date} image={movie.poster_path} movieId={movie.id} title={movie.title} description={movie.overview}/>
            )
          })
        }
      </div>
    </div>
  )
}

export default SearchResults
