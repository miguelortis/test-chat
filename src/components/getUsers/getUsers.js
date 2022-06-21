import React, { useState, useEffect, useContext } from "react";
import { Context } from '../contexts/Context'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import socket from "../socket/Socket";
import { Divider, IconButton, Typography } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
const StyledBadge = styled(Badge)(({ theme }) => ({
	'& .MuiBadge-badge': {
		backgroundColor: '#44b700',
		color: '#44b700',
		boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
		'&::after': {
			position: 'absolute',
			top: 0,
			left: 0,
			width: '100%',
			height: '100%',
			borderRadius: '50%',
			animation: 'ripple 1.2s infinite ease-in-out',
			border: '1px solid currentColor',
			content: '""',
		},
	},
	'@keyframes ripple': {
		'0%': {
			transform: 'scale(.8)',
			opacity: 1,
		},
		'100%': {
			transform: 'scale(2.4)',
			opacity: 0,
		},
	},
}));
export function GetUsers() {
	const {
		dispatch,
	} = useContext(Context)
	const [users, setUsers] = useState([]);
	useEffect(() => {
		socket.on("getUsers", (users) => {
			setUsers(users);
			dispatch({ type: "SET_USERS", payload: users });
		});
	}, [dispatch]);

	const handleClose = () => {
		dispatch({ type: "SET_BUTTON_INFO", payload: false })
	}

	return (
		<div >
			<List dense sx={{
				width: '100%', maxWidth: { md: 360 }, bgcolor: 'background.paper', minHeight: {
					xs: 'calc(100vh - 83px)',
					md: 'calc(100vh - 195px)'
				}
			}}>
				<IconButton
					size="large"
					aria-label="account of current user"
					aria-controls="menu-appbar"
					aria-haspopup="true"
					onClick={handleClose}
					color="inherit"
					sx={{ position: 'absolute', top: '0', display: { xs: 'flex', md: 'none' } }}
				>
					<ArrowBackIcon sx={{ fontSize: 40 }} />
				</IconButton>
				<Typography variant="h5" gutterBottom component="div" sx={{ pt: 1, pb: 2 }}>
					Usuarios Conectados
				</Typography>
				<Divider sx={{ margin: '5px 0' }} />
				{users.length <= 1
					? <ListItem sx={{ textAlign: 'center' }}><ListItemText primary='No se ha conectado ningun usuario' /></ListItem>
					: users.map((user, i) => {
						if (user.socketId === socket.id) {
							return null
						} else {
							return (
								<ListItem
									key={i}
									disablePadding
								>
									<ListItemButton>
										<ListItemAvatar>

											<StyledBadge
												overlap="circular"
												anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
												variant="dot"
											>
												<Avatar src={`data:image/png;base64,${user.photoURL}`} alt={user.name}>{user.name.charAt(0).toUpperCase()}</Avatar>
											</StyledBadge>
										</ListItemAvatar>
										<ListItemText primary={user.name} />
									</ListItemButton>
								</ListItem>
							);
						}
					})}
			</List>
		</div>
	);
}