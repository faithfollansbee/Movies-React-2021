import React from 'react'

import styles from './style'

import withStyles from '@material-ui/core/styles/withStyles'
// import { Spring } from 'react-spring/renderprops'
// import OptionsComponent from './options'

class Landing extends React.Component {
  constructor () {
    super()
    this.state = {
      email: null
    }
  }
  render () {
    const { classes } = this.props

    return (
      <div className={classes.rootStyle}>
        <div className={classes.logo}>
          { /* <img src={require('./logo.png')} alt="movie-logo"/> */ }
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(Landing)
