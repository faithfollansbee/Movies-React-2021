import React, { Fragment } from 'react'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import AccountMenu from './UserMenu'

const authenticatedOptions = (
  <Fragment>
    <Nav.Link href="#movies">Movies</Nav.Link>
    <Nav.Link href="#genres">Genres</Nav.Link>
    <Nav.Link href="#search">Search</Nav.Link>
    <Nav.Link href="#lists">My Lists</Nav.Link>
    <Nav.Link href="#favorites">Favorites</Nav.Link>
    <Nav.Link href="#trending">Trending</Nav.Link>
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

const NavBarStyle = {
  backgroundColor: '#212529'
}

const Header = ({ user }) => (
  <Navbar variant="dark" expand="sm" style={NavBarStyle}>
    <Navbar.Brand href="#">Movie Collector</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="me-auto">
        { alwaysOptions }
        { user ? authenticatedOptions : unauthenticatedOptions }
        { /* {...(user && { authenticatedOptions: user })} */}

        { /*  <Nav.Link href="#">Home</Nav.Link> */}
      </Nav>
    </Navbar.Collapse>
    {user && <AccountMenu user={user}/>}
  </Navbar>

  // <Navbar variant="dark" expand="md" style={NavBarStyle}>
  //   <Navbar.Brand href="#">Movie Collector</Navbar.Brand>
  //   <Navbar.Toggle aria-controls="basic-navbar-nav" />
  //   <Navbar.Collapse id="basic-navbar-nav">
  //     <Nav className="ml-auto">
  //       { user && <span className="navbar-text mr-2">Welcome, {user.email}</span>}
  //       { alwaysOptions }
  //       { user ? authenticatedOptions : unauthenticatedOptions }
  //     </Nav>
  //   </Navbar.Collapse>
  // </Navbar>
)

// const Header = ({ user }) => (
//   <Navbar variant="dark" expand="md" style={NavBarStyle}>
//     <Navbar.Brand href="#">
//     </Navbar.Brand>
//     <div className="logoContainer" style={logoStyle}>
//       <img src={require('./logo.png')} style={logoStyle} alt="ChitChat-logo"/>
//     </div>
//     <Navbar.Toggle aria-controls="basic-navbar-nav" />
//     <Navbar.Collapse id="basic-navbar-nav">
//       <Nav className="ml-auto">
//         { user && <span className="navbar-text mr-2">Welcome, {user.email}</span>}
//         { alwaysOptions }
//         { user ? authenticatedOptions : unauthenticatedOptions }
//       </Nav>
//     </Navbar.Collapse>
//   </Navbar>
// )

export default Header
