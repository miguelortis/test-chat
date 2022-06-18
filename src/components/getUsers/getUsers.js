import React, { useState, useEffect } from "react";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Checkbox from '@mui/material/Checkbox';
import Avatar from '@mui/material/Avatar';
import socket from "../socket/Socket";
import { Divider, Typography } from "@mui/material";
export function GetUsers() {

    const [users, setUsers] = useState([]);

    useEffect(() => {
        socket.on("getUsers", (users) => {
            setUsers(users);
        });
    }, [users]);
    const online = {
        height: '10px',
        width: '10px',
        backgroundColor: 'rgba(25, 255, 4, 0.89)',
        borderRadius: '50px',
        border: '1px solid rgba(5, 155, 30, 0.89)',
    }
    return (

        <div >
            <List dense sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', minHeight: 'calc(100vh - 195px)' }}>
                <Typography variant="h5" gutterBottom component="div" sx={{ p: 2, pb: 0 }}>
                    Usuarios Conectados
                </Typography>
                <Divider />
                {users.length <= 1
                    ? <ListItem sx={{ textAlign: 'center' }}><ListItemText primary='No se ha conectado ningun usuario' /></ListItem>
                    : users.map((user, i) => {
                        if (user.socketId === socket.id) return
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
                                        <Avatar
                                            alt={user.name}
                                        />
                                    </ListItemAvatar>
                                    <ListItemText primary={user.name} />
                                </ListItemButton>
                            </ListItem>
                        );
                    })}
            </List>
        </div>
    );
}