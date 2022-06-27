import React, { useEffect, useState, useContext } from 'react';
import { Context } from '../contexts/Context'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import Menu from '@mui/material/Menu';
import { useNavigate } from 'react-router-dom'
import socket from "../../components/socket/Socket";
import { Avatar } from '@mui/material';
import Profile from '../user/Profile';

import Modal from '../Modal';
export default function Header() {
	const {
		state: { users, openMap },
		dispatch,
	} = useContext(Context)
	const navigate = useNavigate();

	const [auth, setAuth] = useState(null);
	const [anchorEl, setAnchorEl] = useState(null);
	const open = Boolean(anchorEl);
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
		localStorage.removeItem('Profile-Picture');
		dispatch({ type: 'RESET' });
		navigate("/");

	}
	const openInfo = () => {
		dispatch({ type: "SET_BUTTON_INFO", payload: true })
	}
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	console.log(openMap);
	return (
		<Box sx={{ flexGrow: 1, gridColumn: '1/4' }}>
			<AppBar position="static">
				<Toolbar>
					{auth && (
						<div style={{ display: 'contents' }}>
							<Tooltip title="Opciones">
								<IconButton onClick={handleClick} size="small" sx={{ ml: 2 }} >
									<Avatar src={`data:image/png;base64,${localStorage.getItem('Profile-Picture')}`}>
										{userData?.charAt(0)?.toUpperCase()}
									</Avatar>
								</IconButton>
							</Tooltip>
							<Menu
								anchorEl={anchorEl}
								open={open}
								onClose={handleClose}
								onClick={handleClose}
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
											mr: 1,
										},
										'&:before': {
											content: '""',
											display: 'block',
											position: 'absolute',
											top: 0,
											left: 14,
											width: 10,
											height: 10,
											bgcolor: 'background.paper',
											transform: 'translateY(-50%) rotate(45deg)',
											zIndex: 0,
										},
									},
								}}
								transformOrigin={{ horizontal: 'left', vertical: 'top' }}
								anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
							>
								<MenuItem
									onClick={() =>
										dispatch({
											type: "SET_MODAL", payload: {
												isOpen: true,
												title: 'Actualizar Perfil',
												content: <Profile />,
											}
										})
									}
								>
									<Avatar src={`data:image/png;base64,${localStorage.getItem('Profile-Picture')}`} />
									<Typography variant="button">
										Actualizar Foto
									</Typography>
								</MenuItem>
								<Divider />
								<MenuItem
									onClick={() =>
										dispatch({
											type: "SET_MAP", payload: true
										})
									}
								>
									<Avatar src={`data:image/png;base64,${localStorage.getItem('Profile-Picture')}`} />
									<Typography variant="button">
										Ubicacion de Usuarios
									</Typography>
								</MenuItem>
							</Menu>
							<Modal />
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
		</Box >
	);
}
