import { useState, useContext, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { makeStyles } from '@mui/styles';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo_minimal_white.webp'; // Adjust the path as necessary
import { AuthContext } from '../providers/AuthContext';

const pages = [
  { id: 1, name: 'Noticias', path: 'news' },
// { id: 2, name: 'Rankings', path: 'rankings' },
  { id: 2, name: 'Eventos', path: 'events' },
  { id: 3, name: 'Galeria', path: 'gallery'}
// { id: 4, name: 'Academias', path: 'teams' },
// { id: 5, name: 'Atletas', path: 'athletes' },
// { id: 6, name: 'Reglamento', path: 'rules' },
//  { id: 7, name: 'Brackets', path: 'brackets' },

]

const settings = [
  { id: 1, name: 'Profile', path: 'profile'}, 
  { id: 2, name: 'Configuración', path: 'config'}, 
  { id: 3, name: 'Mis eventos', path: 'my-events'}, 
  { id: 4, name: 'Logout', path: 'logout'}, 
];

const adminSettings = [
  { id: 5, name: 'Manage Event', path: 'manage-event'},
  { id: 6, name: 'Manage Team', path: 'manage-team'},
];


const useStyles = makeStyles({
  link: {
    textDecoration: "none",
    color: "white",
    fontSize: "20px",
    //marginLeft: theme.spacing(20),
    "&:hover": {
      color: "grey",
      borderBottom: "1px solid white",
    },
  },
});

export const ResponsiveAppBar = () => {
  const [ loggedIn, setLoggedIn ] = useState(null);
  const classes = useStyles();
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const navigate = useNavigate();
  const { user, setUser } = useContext(AuthContext);
  
  useEffect(() => {
    if (user) {
      setLoggedIn(true)
    }
  }, [user]);

  const finalSettings = user?.role === 'admin' ? [...settings, ...adminSettings] : settings;


  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  
  const handleLogout = () => {
    setUser(null);
    setLoggedIn(false)
    handleCloseUserMenu();
    navigate('/');
  };

  const handleMenuItem = (name) => {
    if (name === 'Logout') {
      handleLogout()
    } else {
      const setting = finalSettings.find(setting => setting.name === name);
      if (setting) {
        handleCloseUserMenu();
        navigate(`/${setting.path}`);
      }
    }
  };


  const handleLogIn = () => {
    navigate("/login");
  };

  return (
    <AppBar position="static" sx={{ bgcolor: '#000000' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>

        <Box
          component="a"
          onClick={() => navigate('/')}
          sx={{
            mr: 2,
            display: { xs: 'none', md: 'flex' },
            alignItems: 'center',
            textDecoration: 'none',
          }}
        >
          <img
            src={logo}
            alt="Logo"
            style={{
              height: '40px', // Adjust the height as necessary
              display: 'block',
            }}
          />
        </Box>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page.id} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page.name}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page.id}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
              
              <Link to={`/${page.path.toLowerCase()}`} className={classes.link}>
               {page.name}
              </Link>

              {/*<Button  variant="contained" color="primary"
                component={Link}
                to={`/${page.toLowerCase()}`}
              >
                {page}
              </Button>*/
              }
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
          {loggedIn ? (
              <>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {finalSettings.map((setting) => (
                <MenuItem key={setting.id} onClick={() => handleMenuItem(setting.name)}>
                  <Typography textAlign="center">{setting.name}</Typography>
                </MenuItem>
              ))}
            </Menu>
            </>
            ) : (
              <Button color="inherit" onClick={handleLogIn}>
                Login
              </Button>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
