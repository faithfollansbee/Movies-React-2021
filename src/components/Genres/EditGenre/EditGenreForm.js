import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const GenreForm = ({ genre, handleChange, handleSubmit, handleSubmitClose }) => (
  <Form onSubmit={handleSubmit}>
    <Form.Group controlId="name">
      <Form.Label>Genre title</Form.Label>
      <Form.Control
        type="text"
        // placeholder={genre.name}
        defaultValue={genre.name}
        // value={genre.name}
        onChange={handleChange}
        name="name"
        required
      />
    </Form.Group>

    <Button variant="dark" type="submit">
      Submit
    </Button>
    <Button onClick={handleSubmitClose} color="primary">Close</Button>

  </Form>
)

export default GenreForm

// <Form.Group controlId="ingredients">
//   <Form.Label>Ingredients</Form.Label>
//   <Form.Control
//     type="text"
//     placeholder="Enter the ingredients"
//     value={recipe.ingredients}
//     onChange={handleChange}
//     name="ingredients"
//     required
//   />
// </Form.Group>
//
// <Form.Group controlId="time">
//   <Form.Label>Cooking Time</Form.Label>
//   <Form.Control
//     type="text"
//     placeholder="Enter the cooking_time"
//     value={recipe.time}
//     onChange={handleChange}
//     name="time"
//     required
//   />
// </Form.Group>
