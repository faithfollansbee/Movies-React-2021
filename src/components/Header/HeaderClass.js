import React, { Fragment, Component } from 'react'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import AccountMenu from './UserMenu'
import { signIn } from '../../api/auth'
import { withRouter } from 'react-router-dom'

const NavBarStyle = {
  boxShadow: 'none',
  backgroundColor: '#ffffff'
}

const authenticatedOptions = (
  <Fragment>
    <Nav.Link href="#movies">Movies</Nav.Link>
    <Nav.Link href="#search">Search</Nav.Link>
    <Nav.Link href="#genres">My Lists</Nav.Link>
    <Nav.Link href="#trending">Trending</Nav.Link>
  </Fragment>
)

const alwaysOptions = (
  <Fragment>
  </Fragment>
)

class Header extends Component {
  render () {
    const { alert, user, history, setUser } = this.props

    const guestSignIn = (user, setUser) => {
      event.preventDefault()
      signIn({ email: 'guest@guest', password: 'guest' })
        .then(res => setUser(res.data.user))
        .then(() => alert({
          heading: `Welcome, ${this.props.user.email}`,
          variant: 'success'
        }))
        .then(() => history.push('/trending'))
    }

    return (
      <Fragment>
        <Navbar variant="light" style={NavBarStyle}>
          <Navbar.Brand href="#">Movie Collector</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav variant="light" className="me-auto">
              { alwaysOptions }
              { user ? authenticatedOptions : (
                <Fragment>
                  <Nav.Link className="nav-link" to="#sign-up" href="#sign-up"> Sign Up </Nav.Link>
                  <Nav.Link className="nav-link" to="#sign-in" href="#sign-in"> Sign In </Nav.Link>
                  <Nav.Link onClick={() => guestSignIn(user, setUser)} to="/trending" href="#trending">Guest</Nav.Link>
                </Fragment>
              )}
              { /* {...(user && { authenticatedOptions: user })} */}
              { /*  <Nav.Link href="#">Home</Nav.Link> */}
            </Nav>
          </Navbar.Collapse>
          {user && <AccountMenu user={user}/>}
        </Navbar>
      </Fragment>
    )
  }
}

export default withRouter(Header)
