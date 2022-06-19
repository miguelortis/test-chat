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
    const online = {
        height: '10px',
        width: '10px',
        backgroundColor: 'rgba(25, 255, 4, 0.89)',
        borderRadius: '50px',
        border: '1px solid rgba(5, 155, 30, 0.89)',
    }
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
                                    secondaryAction={
                                        <div style={online} />
                                    }
                                    disablePadding
                                >
                                    <ListItemButton>
                                        <ListItemAvatar>
                                            <Avatar>{user.name.charAt(0).toUpperCase()}</Avatar>
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