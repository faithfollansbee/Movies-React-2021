import React, { Fragment } from 'react'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'

const authenticatedOptions = (
  <Fragment>
    <Nav.Link href="#change-password">Change Password</Nav.Link>
    <Nav.Link href="#sign-out">Sign Out</Nav.Link>
    <Nav.Link href="#movies">Movies</Nav.Link>
    <Nav.Link href="#genres">Genres</Nav.Link>
    <Nav.Link href="#creategenre">Add Genre</Nav.Link>
    <Nav.Link href="#search">Search</Nav.Link>
  </Fragment>
)

const unauthenticatedOptions = (
  <Fragment>
    <Nav.Link href="#sign-up">Sign Up</Nav.Link>
    <Nav.Link href="#sign-in">Sign In</Nav.Link>
  </Fragment>
)

const alwaysOptions = (
  <Fragment>
  </Fragment>
)

const logoStyle = {
  margin: '0px',
  padding: '0px'
  // position: 'relative'
}

const NavBarStyle = {
  margin: '0px',
  padding: '0px',
  position: 'relative',
  backgroundColor: 'black'
}

const Header = ({ user }) => (
  <Navbar variant="dark" expand="md" style={NavBarStyle}>
    <Navbar.Brand href="#">
    </Navbar.Brand>
    <div className="logoContainer" style={logoStyle}>
      <img src={require('./logo.png')} style={logoStyle} alt="ChitChat-logo"/>
    </div>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="ml-auto">
        { user && <span className="navbar-text mr-2">Welcome, {user.email}</span>}
        { alwaysOptions }
        { user ? authenticatedOptions : unauthenticatedOptions }
      </Nav>
    </Navbar.Collapse>
  </Navbar>
)

export default Header