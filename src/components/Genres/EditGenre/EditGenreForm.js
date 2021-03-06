import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const GenreForm = ({ genre, handleChange, handleSubmit, handleSubmitClose }) => (
  <Form onSubmit={handleSubmit}>
    <Form.Group controlId="name">
      <Form.Label>Genre title</Form.Label>
      <Form.Control
        type="text"
        defaultValue={genre.name}
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
