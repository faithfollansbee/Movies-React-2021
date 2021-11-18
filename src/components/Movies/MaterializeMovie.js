import React from 'react'
import Card from '@material-ui/core/Card'
// import CardActionArea from '@material-ui/core/CardActionArea'
// import Tooltip from '@material-ui/core/Tooltip'
import { makeStyles } from '@material-ui/core/styles'
// import { red } from '@material-ui/core/colors'
// import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight'
// import CardContent from '@material-ui/core/CardContent'
// import Typography from '@material-ui/core/Typography'
// import MoreVertIcon from '@material-ui/icons/MoreVert'
import EditMovie from './EditMovieDialog/EditMovie'

// import CardMedia from '@material-ui/core/CardMedia'
// const fabStyle1 = {
//   bottom: 60,
//   left: 150
// }
// const fabStyle2 = {
//   bottom: 60,
//   left: 170
// }
// const fabRowStyle = {
//   display: 'flex',
//   justifyContent: 'space-evenly',
//   position: 'absolute'
// }
const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    // zIndex: 5,
    // transition: 'transform 0.22s ease-in-out',
    '& .hidden-button': {
      display: 'none'
    }
    // '& .hidden-content': {
    //   display: 'none'
    // }
  },
  // media: {
  //   height: 0,
  //   paddingTop: '56.25%' // 16:9
  // },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest
    })
  },
  cardHovered: {
    // position: 'relative',
    // transform: 'scale(1.2)',
    // zIndex: '15 !important',
    '&:hover .hidden-button': {
      display: 'flex'
    }
    // '&:hover .hidden-content': {
    //   display: 'flex'
    // }
  },
  avatar: {
    // backgroundColor: red[500]
  }
}))
// deletemovie = () => {
//   axios({
//     url: `${apiUrl}/movies/${this.props.match.params.id}`,
//     method: 'DELETE',
//     headers: {
//       'Authorization': `Token token=${this.props.user.token}`
//     }
//   })
//     .then(() => this.setState({ deleted: true }))
// }
// editMovie = () => {
//   console.log('edit eventually')
// }
const MaterializeMovie = (props) => {
  const classes = useStyles()

  const [state, setState] = React.useState({
    hovered: false,
    shadow: 1
  })
  console.log(props.deleteMovie)
  // <div className="mx-auto py-3 px-1">
  // <div className="col s12 m7">
  return (
    <div className="mx-auto py-1 px-1">
      <Card className="card"
        classes={{ root: state.hovered ? classes.cardHovered : '' } }
        style={{ width: '20rem' }}
        onMouseOver={() => setState({ hovered: true, shadow: 3 })}
        onMouseOut={() => setState({ hovered: false, shadow: 1 })}
        hovered={state.hovered} zdepth={state.shadow}
        aria-label="show more"
      >
        <div className="card-image activator waves-effect waves-block waves-light">
          {
            props.image == null
              ? <img
                className="activator"
                component="img"
                alt="Contemplative Reptile"
                src={'https://i.imgur.com/R7mqXKL.png'}
                title="card-image"
              />
              : <img
                className="activator"
                component="img"
                alt="Contemplative Reptile"
                src={`https://image.tmdb.org/t/p/w185/${props.image}`}
                title="Contemplative Reptile"
              />
          }
        </div>
        <div className="card-content" style={{ textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden' }}>
          <EditMovie className="material-icons right" style={{ textDecoration: 'none' }} deleteMovie={props.deleteMovie} editMovie={props.editMovie}/>
          <span style={{ textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden' }} className="card-title activator grey-text text-darken-4">{props.title}
          </span>
        </div>
        <div className="card-reveal">
          <span className="card-title grey-text text-darken-4">{props.title}<i className="material-icons right">close</i></span>
          <p>{props.description}</p>
        </div>
      </Card>
    </div>
  )
}
// <MoreVertIcon to="/more-info" href={`#/movies/${props.id}`} className="material-icons right" style={{ textDecoration: 'none' }}/>

export default MaterializeMovie
// <div className="card" style={{ width: '18rem' }} >
//   <div className="card-image waves-effect waves-block waves-light">
//     {
//       props.image == null
//         ? <CardMedia
//           component="img"
//           alt="Contemplative Reptile"
//           image={'https://i.imgur.com/R7mqXKL.png'}
//           title="card-image"
//         />
//         : <CardMedia
//           component="img"
//           alt="Contemplative Reptile"
//           image={`https://image.tmdb.org/t/p/w185/${props.image}`}
//           title="Contemplative Reptile"
//         />
//     }
//   </div>
//   <div className="card-content">
//     <span className="card-title activator grey-text text-darken-4">
//       Card Title
//       <i className="material-icons right">more_vert</i>
//     </span>
//     <p><a href="#">This is a link</a></p>
//   </div>
//   <div className="card-action">
//     <a href="#">This is a link</a>
//     <a href="#">This is a link</a>
//   </div>
//   <div className="card-reveal">
//     <span className="card-title grey-text text-darken-4">Card Title<i className="material-icons right">close</i></span>
//     <p>Here is some more information about this product that is only revealed once clicked on.</p>
//   </div>
//   <div className="card-reveal">
//     <span className="card-title grey-text text-darken-4">
//       Card Title
//       <i className="material-icons right">close</i>
//     </span>
//     <p>Here is some more information about this product that is only revealed once clicked on.</p>
//   </div>
// </div>
// { /* <Tooltip title="Favorite">
//   <Fab size="medium" style={fabStyle1} className='hidden-button floating waves-effect waves-light' color="primary" aria-label="favorite" >
//     <FavoriteIcon />
//   </Fab>
// </Tooltip>
// <Tooltip title="More">
//   <Fab size="medium" style={fabStyle2} to="/more-info" href={`#/movies/${props.id}`} className='hidden-button floating waves-effect waves-light' color="primary" aria-label="more" >
//     <KeyboardArrowRightIcon style={{ color: 'white', textDecoration: 'none' }}/>
//   </Fab>
// </Tooltip>
// <Card style={{ width: '18rem' }} className={classes.root}
//   classes={{ root: state.hovered ? classes.cardHovered : '' } }
//   onMouseOver={() => setState({ hovered: true, shadow: 3 })}
//   onMouseOut={() => setState({ hovered: false, shadow: 1 })}
//   hovered={state.hovered} zdepth={state.shadow}
//   aria-label="show more"
// >
