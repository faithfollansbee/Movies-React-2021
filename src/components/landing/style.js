const styles = theme => ({
  logo: {
    height: '300px',
    width: '310px',
    marginLeft: 'auto',
    marginRight: 'auto',
    padding: '0px',
    marign: '0px',
    alignItems: 'center'
    // padding: `${theme.spacing(5)}px ${theme.spacing(5)}px ${theme.spacing(5)}px`,
  },
  container: {
    padding: '0',
    maxWidth: '100%'
  },
  // main: {
  //   width: 'auto',
  //   display: 'block',
  //   marginLeft: theme.spacing(25),
  //   marginRight: theme.spacing(25),
  //   [theme.breakpoints.up(200 + theme.spacing * 5 * 3)]: {
  //     width: 150,
  //     marginLeft: 'auto',
  //     marginRight: 'auto'
  //   }
  // },
  rootStyle: {
    backgroundColor: 'black',
    height: '100vh',
    width: '100%',
    position: 'absolute'
  }
  // paper: {
  //   marginTop: theme.spacing(1),
  //   display: 'flex',
  //   backgroundColor: '#79b8f7',
  //   flexDirection: 'column',
  //   alignItems: 'center',
  //   padding: `${theme.spacing(5)}px ${theme.spacing(5)}px ${theme.spacing(5)}px`,
  // },
  // options: {
  //   padding: '10px',
  //   size: '30px',
  //   width: '100%',
  //   fontFamily: 'Monda, sans-serif',
  //   textDecoration: 'none',
  //   color: 'black',
  //   fontWeight: 'bolder'
  // }
})

export default styles
