import React from 'react'
import Movie from './Movie'
// import SaveMovie from './SaveMovie'

const SearchResults = (props) => {
  return (
    <div className="results-container my-5">
      <div className="row">
        {
          props.movies.map((movie, i) => {
            return (
              <Movie key={i} user={props.user} viewMovie={props.viewMovie} released={movie.release_date} image={movie.poster_path} movieId={movie.id} title={movie.title} description={movie.overview}/>
            )
          })
        }
      </div>
    </div>
  )
}

export default SearchResults
