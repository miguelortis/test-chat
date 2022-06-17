import React, { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { useNavigate } from 'react-router-dom'

export default function Header() {
	const navigate = useNavigate();
	const [auth, setAuth] = useState(null);
	const [anchorEl, setAnchorEl] = useState(null);

	useEffect(() => {
		setAuth(localStorage.getItem("name"));
	}
		, [localStorage.getItem("name")]);



	const handleMenu = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};
	const handleLogout = () => {
		localStorage.removeItem("name");
		navigate("/");
	}
	return (
		<Box sx={{ flexGrow: 1, gridColumn: '1/4' }}>
			<AppBar position="static">
				<Toolbar>
					{auth && (
						<div style={{ display: 'contents' }}>
							<IconButton
								size="large"
								aria-label="account of current user"
								aria-controls="menu-appbar"
								aria-haspopup="true"
								onClick={handleMenu}
								color="inherit"
							>
								<AccountCircle />
							</IconButton>
							<Menu
								id="menu-appbar"
								anchorEl={anchorEl}
								anchorOrigin={{
									vertical: 'top',
									horizontal: 'right',
								}}
								keepMounted
								transformOrigin={{
									vertical: 'top',
									horizontal: 'right',
								}}
								open={Boolean(anchorEl)}
								onClose={handleClose}
							>
								<MenuItem onClick={handleClose}>Profile</MenuItem>
								<MenuItem onClick={handleClose}>My account</MenuItem>
							</Menu>

							<Typography variant="h6" component="div">
								{auth.toLowerCase().replace(/\b\w/g, (l) => l.toUpperCase())}
							</Typography>
						</div>
					)}
					<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
						ChatApp
					</Typography>
					<IconButton
						size="large"
						edge="start"
						color="inherit"
						aria-label="menu"
						onClick={handleLogout}
					>
						<LogoutIcon />
					</IconButton>
				</Toolbar>
			</AppBar>
		</Box>
	);
}
