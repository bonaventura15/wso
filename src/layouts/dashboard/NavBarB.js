import * as React from 'react';
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
import ButtonGroup from '@mui/material/ButtonGroup';

const pages = [
  { title: 'Home', href: '/' },
  { title: 'User', href: '/user-information' },
  { title: 'Toko', href: '/toko' },
];

const sett = [
  { title: 'Log-Audio', href: '/log-audio' },
];

export const Navbarb = (props) => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

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

  return (
    <Container maxWidth="xl">
      <Toolbar disableGutters>
        <Typography
          variant="h6"
          noWrap
          component="a"
          href="#app-bar-with-responsive-menu"
          sx={{
            mr: 2,
            display: { xs: 'none', md: 'flex' },
            fontFamily: 'Roboto Mono',
            fontWeight: 700,
            fontSize: '45px',
            color: '#FFF',
            textDecoration: 'none',
            textDecorationLine: 'underline',
            transform: 'translateX(-8%)'
          }}
        >
          BecomeWaifu
        </Typography>

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
              <MenuItem key={page.title} onClick={handleCloseNavMenu}>
                <Typography textAlign="center" component="a" href={page.href}>
                  {page.title}
                </Typography>
              </MenuItem>
            ))}
          </Menu>
        </Box>
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
          BecomeWaifu
        </Typography>
        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
          {sett.map((page) => (
            <Button
              key={page.title}
              component="a"
              href={page.href}
              onClick={handleCloseNavMenu}
              sx={{ color: '#FFF', display: 'block', fontSize: '27px', fontFamily: 'Roboto Mono', fontWeight: 300, }}
            >
              {page.title}
            </Button>
          ))}
        </Box>
        <Box sx={{ flexGrow: 0, display: { xs: 'none', md: 'flex' } }}>
          <ButtonGroup variant="outlined" aria-label="outlined button group" style={{ backgroundColor: 'rgba(0, 0, 0, 0.20)', transform: 'skew(-20deg)',}}>
            {pages.map((page) => (
              <Button
                key={page.title}
                component="a"
                href={page.href}
                onClick={handleCloseNavMenu}
                sx={{
                  color: '#FFF',
                  display: 'block',
                  fontSize: '27px',
                  fontFamily: 'Roboto Mono',
                  fontWeight: 300,
                  transform: 'translateX(-0%)',
                }}
              >
                {page.title}
              </Button>
            ))}
          </ButtonGroup>
        </Box>
      </Toolbar>
    </Container>
  );
}
