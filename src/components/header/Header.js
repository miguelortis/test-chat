import React, { useEffect, useState, useContext } from 'react';
import { Context } from '../contexts/Context'
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
import socket from "../../components/socket/Socket";
import { Avatar, ListItemAvatar } from '@mui/material';

export default function Header() {
	const {
		state: { users },
		dispatch,
	} = useContext(Context)
	const navigate = useNavigate();

	const [auth, setAuth] = useState(null);
	const [anchorEl, setAnchorEl] = useState(null);
	const userData = localStorage.getItem("name")
	useEffect(() => {
		setAuth(userData);
	}
		, [userData]);


	const handleClose = () => {
		setAnchorEl(null);
	};
	const handleLogout = () => {
		localStorage.removeItem("name");
		navigate("/");
	}
	const openInfo = () => {
		dispatch({ type: "SET_BUTTON_INFO", payload: true })
	}
	return (
		<Box sx={{ flexGrow: 1, gridColumn: '1/4' }}>
			<AppBar position="static">
				<Toolbar>
					{auth && (
						<div style={{ display: 'contents' }}>
							<ListItemAvatar>
								<Avatar>
									{userData.charAt(0).toUpperCase()}
								</Avatar>
							</ListItemAvatar>
							{/* <IconButton
								size="large"
								aria-label="account of current user"
								aria-controls="menu-appbar"
								aria-haspopup="true"
								// onClick={handleMenu}
								color="inherit"
							>
								<AccountCircle sx={{ fontSize: 40 }} />
							</IconButton> */}
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
							<div>
								<button className='buttonInfo' onClick={openInfo}></button>
								<Typography sx={{ mt: '10px', lineHeight: 1 }} variant="h6" component="div">
									{auth.toLowerCase().replace(/\b\w/g, (l) => l.toUpperCase())}
								</Typography>
								<Typography sx={{ display: { md: 'none' } }} variant="caption" component="span">
									{users.length > 2
										? users.slice(-2, -1).map((user) => {
											if (user.socketId !== socket.id) { return user.name }
											return null
										})
										: users.map((user) => {
											if (user.socketId !== socket.id) { return user.name }
											return null
										})}

								</Typography>

							</div>
						</div>
					)}
					<Typography variant="h6" component="div" sx={{ flexGrow: 1, display: { xs: 'none', md: 'block' } }}>
						ChatApp
					</Typography>
					{auth && <IconButton
						size="large"
						edge="start"
						color="inherit"
						aria-label="menu"
						onClick={handleLogout}
						sx={{
							position: { xs: 'absolute' },
							right: { xs: '20px' },
						}}
					>
						<LogoutIcon />
					</IconButton>}
				</Toolbar>
			</AppBar>
		</Box>
	);
}
