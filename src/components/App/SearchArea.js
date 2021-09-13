import React, { Fragment } from 'react'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'

const SearchArea = (props) => {
  return (
    <div className="search-area">
      <Fragment>
        <Form action=" " onSubmit={props.handleSubmit}>
          <FormControl
            // onSubmit={props.handleSubmit}
            placeholder="search movie"
            type="text"
            onChange={props.handleChange}
          />
        </Form>
      </Fragment>
    </div>
  )
}
// <section className="col s4">
// what I had
// <form action=" " onSubmit={props.handleSubmit}>
//   <div className="inputField" input="white">
//     <input placeholder="search movie" type="text" onChange={props.handleChange}/>
//   </div>
// </form>
export default SearchArea
// what Im emulating
// <div className="search">
//   {
//     <Fragment>
//       <FormControl
//         placeholder="Search"
//         aria-label="Search"
//         onChange={this.handleChange}
//       />
//     </Fragment>
//   }
// </div>
