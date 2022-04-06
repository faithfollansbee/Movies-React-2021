import React from 'react'
import SaveMovie from './SaveMovie'

const MoreDetails = (props) => {
  return (
    <div className="card">
      <div>
        { props.currentMovie.poster_path == null ? <img src={'https://i.imgur.com/R7mqXKL.png'} alt="card image" style={{ width: '50', height: 360 }}/> : <img src={`https://image.tmdb.org/t/p/original/${props.currentMovie.poster_path}`} alt="card image" style={{ width: '50', height: 360 }}/> }
      </div>
      <div className="detailContainer">
        <h1>{props.currentMovie.title}</h1>
        <p>{props.currentMovie.overview}</p>
        <p>{props.currentMovie.release_date}</p>
      </div>
      <SaveMovie user={props.user}/>
    </div>
  )
}

export default MoreDetails
