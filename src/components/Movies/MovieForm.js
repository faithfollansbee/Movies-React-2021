import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const MovieForm = ({ correctRoute, movie, handleOptionChange, handleChange, genresJsx, genres, handleMovieSubmit }) => (
  <Form onSubmit={handleMovieSubmit}>
    <Form.Group controlId="title">
      <Form.Label>Movie Title</Form.Label>
      <Form.Control
        type="text"
        placeholder="Enter a title"
        value={movie.title}
        onChange={handleChange}
        name="title"
        required
      />
    </Form.Group>
    <Form.Group controlId="released">
      <Form.Label>Released</Form.Label>
      <Form.Control
        type="text"
        placeholder="Enter released"
        value={movie.released}
        onChange={handleChange}
        name="released"
        required
      />
    </Form.Group>
    <Form.Group controlId="image">
      <Form.Label>Image</Form.Label>
      <Form.Control
        type="text"
        placeholder="Enter image"
        value={movie.image}
        onChange={handleChange}
        name="image"
        required
      />
    </Form.Group>
    <Form.Group controlId="description">
      <Form.Label>Description</Form.Label>
      <Form.Control
        type="text"
        placeholder="Enter description"
        value={movie.description}
        onChange={handleChange}
        name="description"
        required
      />
    </Form.Group>
    <Form.Group controlId="genre">
      <Form.Label>Genre</Form.Label>
      <Form.Control
        type="radio"
        placeholder="Enter genre"
        value={movie.genre}
        onChange={handleChange}
        name="genre"
        required
      />
      {
        genres.map(genre => (
          <div key={genre._id}>
            <ul>
              <li>
                <label>
                  <input
                    name="genre"
                    type="radio"
                    value={genre.name}
                    ref={this.input}
                    checked={this.value === genre.name}
                    // checked={this.state.genre === genre.name}
                    handleChange={handleOptionChange}
                  />{genre.name}</label>
              </li>
            </ul>
          </div>
        ))
      }
    </Form.Group>

    <Button variant="dark" type="submit">
      Submit
    </Button>
    <Button href={`#movies/${correctRoute}`}>
       Back
    </Button>
  </Form>
)

export default MovieForm
