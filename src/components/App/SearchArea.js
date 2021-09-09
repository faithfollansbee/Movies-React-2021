import React from 'react'

const SearchArea = (props) => {
  return (
    <div className="search-area">
      <div className="row">
        <section className="col s4">
          <form action=" " onSubmit={props.handleSubmit}>
            <div className="inputField" input="white">
              <input placeholder="search movie" type="text" onChange={props.handleChange}/>
            </div>
          </form>
        </section>
      </div>
    </div>
  )
}

export default SearchArea
