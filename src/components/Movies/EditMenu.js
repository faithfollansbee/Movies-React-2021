import * as React from 'react'
import Box from '@material-ui/core/Box'
import Menu from '@material-ui/core/Menu'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import EditMovieDialog from './EditMovieDialog/EditMovieDialog'
import DeleteMovieDialog from './DeleteMovieDialog'

export default function EditMenu ({ deleteMovie, id, user, movie, title, genre, image, description, released, currentGenre }) {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  return (
    <React.Fragment>
      <Box sx={{ alignItems: 'center', textAlign: 'center' }}>
        <Tooltip title="Options">
          <IconButton className="material-icons right" onClick={handleClick} size="small" sx={{ ml: 2 }}>
            {/*  {user && <Avatar>{user.email.charAt(0).toUpperCase()}</Avatar>} */}
            {/* {user && <Avatar sx={{ width: 32, height: 32 }}>{user.email.charAt(0).toUpperCase()}</Avatar>} */}
            <MoreVertIcon />
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        id="menu-appbar"
        // anchorEl={anchorEl}
        getContentAnchorEl={null}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        transformOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={open}
        // className={props.classes.menu}
        anchorEl={anchorEl}
        onClose={handleClose}
        // onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0
            }
          }
        }}
        // transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        // anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <span>
          <EditMovieDialog onMenuClose={handleClose} id={id} user={user} movie={movie} title={title} currentGenre={currentGenre} genre={genre} image={image} released={released} description={description}/>
        </span>
        <span>
          <DeleteMovieDialog deleteMovie={deleteMovie} onMenuClose={handleClose} id={id} user={user} movie={movie} title={title} currentGenre={currentGenre} genre={genre} image={image} released={released} description={description}/>
        </span>
      </Menu>
    </React.Fragment>
  )
}
