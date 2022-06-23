import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'
import routes from "../../routes"
import { Link } from 'react-router-dom'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import LocalDiningIcon from '@mui/icons-material/LocalDining'
import { destroySession } from '../../api/sessions'
import { getMe } from '../../api/users'

const Header = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const handleLoginClick = () => navigate("/sign-in")
  const handleLogoClick = () => navigate("/")
  const [open, setDrawerOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false)

  const logout = async () => {
    await destroySession()
    navigate("/sign-out")
  }

  const fetchMe = async () => {
    const data = await getMe()
    if (data.error || data.user === null) {
      console.log(data)
      setLoggedIn(false)
    } else {
      setLoggedIn(true)
    }
  }

  useEffect(() => {
    fetchMe()
  }, [location])

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setDrawerOpen(open);
  };

  const list = () => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {routes.map((route) => (
          <ListItem button key={route.name} component={Link} to={route.path}>
            <ListItemText primary={route.name} />
          </ListItem>
        ))}
      </List>
    </Box>
  )

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 1 }}
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
          <IconButton sx={{ flexGrow: 1 }} onClick={handleLogoClick}>
            <LocalDiningIcon />
          </IconButton>
          {loggedIn
            ? <Button color="inherit" onClick={logout}>Logout</Button>
            : <Button color="inherit" onClick={handleLoginClick}>Login</Button>
          }
        </Toolbar>
      </AppBar>
      <Drawer
        anchor="left"
        open={open}
        onClose={toggleDrawer(false)}
        variant="temporary"
      >
        {list()}
      </Drawer>
    </Box>
  )
}

export default Header
