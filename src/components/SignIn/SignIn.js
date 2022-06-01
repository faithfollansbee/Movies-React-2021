import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { signIn } from '../../api/auth'
import messages from '../AutoDismissAlert/messages'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Fade from '@material-ui/core/Fade'

// const buttonStyle = {
// backgroundColor: '#DC312F'
// }
class SignIn extends Component {
  constructor (props) {
    super(props)

    this.state = {
      email: '',
      password: '',
      isSigningIn: false
    }
  }

  handleChange = event => this.setState({
    [event.target.name]: event.target.value
  })
  componentDidMount = () => {
    this.setState({ isSigningIn: true })
  }

  onSignIn = event => {
    event.preventDefault()

    const { alert, history, setUser } = this.props

    signIn(this.state)
      .then(res => setUser(res.data.user))
      .then(() => alert({
        heading: `Welcome, ${this.state.email}`,
        message: messages.signInSuccess,
        variant: 'success'
      }))
      .then(() => history.push('/trending'))
      .catch(error => {
        console.error(error)
        this.setState({ email: '', password: '' })
        alert({
          heading: 'Sign In Failed',
          message: messages.signInFailure,
          variant: 'danger'
        })
      })
  }

  render () {
    const { email, password, isSigningIn } = this.state

    return (
      <Fade in={isSigningIn} {...(isSigningIn ? { timeout: 700 } : {})}>
        <div className="row">
          <div className="col-sm-10 col-md-8 mx-auto mt-5">
            <Card>
              <CardContent>
                <h3>Sign In</h3>
                <Form onSubmit={this.onSignIn}>
                  <Form.Group controlId="email">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      required
                      type="email"
                      name="email"
                      value={email}
                      placeholder="Enter email"
                      onChange={this.handleChange}
                    />
                  </Form.Group>
                  <Form.Group controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      required
                      name="password"
                      value={password}
                      type="password"
                      placeholder="Password"
                      onChange={this.handleChange}
                    />
                  </Form.Group>
                  <Button
                    // style={buttonStyle}
                    variant="primary"
                    // background-color="#881B1B"
                    type="submit"
                  >
                    Submit
                  </Button>
                </Form>
              </CardContent>
            </Card>
          </div>
        </div>
      </Fade>
    )
  }
}

export default withRouter(SignIn)
