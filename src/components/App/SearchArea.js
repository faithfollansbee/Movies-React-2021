import React, { Fragment } from 'react'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
// import SearchIcon from '@material-ui/icons/Search'
import InputGroup from 'react-bootstrap/InputGroup'

const SearchArea = (props) => {
  return (
    <div className="search-area my-5">
      <Fragment>
        <Form action=" " onSubmit={props.handleSubmit}>
          <InputGroup>
            <InputGroup.Prepend>
            </InputGroup.Prepend>
            <FormControl
              // onSubmit={props.handleSubmit}
              placeholder="search"
              type="text"
              onChange={props.handleChange}
            />
          </InputGroup>
        </Form>
      </Fragment>
    </div>
  )
}
// <IconButton size="large" aria-label="search" color="inherit">
//   <SearchIcon />
// </IconButton>
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
