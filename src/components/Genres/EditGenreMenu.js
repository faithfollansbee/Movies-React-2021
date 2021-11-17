import * as React from 'react'
import Box from '@material-ui/core/Box'
// import Avatar from '@material-ui/core/Avatar'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import IconButton from '@material-ui/core/IconButton'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import Tooltip from '@material-ui/core/Tooltip'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import EditGenreDialog from './EditGenre/EditGenreDialog'

export default function EditGenreMenu ({ genre, id, user, deleteGenre }) {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
    console.log('EditGenreMenu handleClick()')
  }
  const handleClose = () => {
    setAnchorEl(null)
    console.log('EditGenreMenu handleClose()')
  }
  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Tooltip title="Options">
          <IconButton onClick={handleClick} size="small" sx={{ ml: 2 }}>
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
        // <EditGenreDialog id={genre._id} genre={genre} user={user} />
        // id={this.state.genre._id} genre={this.state.genre} user={this.props.user}
      >
        <EditGenreDialog id={id} genre={genre} user={user} />
        <MenuItem href={`#genres/${genre._id}/edit`} component="a">
          <ListItemIcon>
            <EditIcon />
          </ListItemIcon>
          Edit Link
        </MenuItem>
        <MenuItem onClick={deleteGenre} component="a">
          <ListItemIcon >
            <DeleteIcon />
          </ListItemIcon>
          Delete
        </MenuItem>
      </Menu>
    </React.Fragment>
  )
}
