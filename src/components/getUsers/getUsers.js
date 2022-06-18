import React, { useState, useEffect } from "react";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Checkbox from '@mui/material/Checkbox';
import Avatar from '@mui/material/Avatar';
import socket from "../socket/Socket";
export function GetUsers() {

    const [users, setUsers] = useState([]);
    const [checked, setChecked] = React.useState([1]);

    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };
    //////////////////////////////////////////////
    useEffect(() => {
        socket.on("getUsers", (users) => {
            setUsers(users);
            console.log(users)
        });
    }, [users]);
    return (

        <div >
            <List dense sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', minHeight: 'calc(100vh - 202px)' }}>
                {users.map((user, i) => {
                    if (user.socketId === socket.id) return
                    const labelId = `checkbox-list-secondary-label-${i}`;
                    return (
                        <ListItem
                            key={i}
                            secondaryAction={
                                <Checkbox
                                    edge="end"
                                    onChange={handleToggle(i)}
                                    checked={checked.indexOf(i) !== -1}
                                    inputProps={{ 'aria-labelledby': labelId }}
                                />
                            }
                            disablePadding
                        >
                            <ListItemButton>
                                <ListItemAvatar>
                                    <Avatar
                                        alt={user.name}
                                    />
                                </ListItemAvatar>
                                <ListItemText id={labelId} primary={user.name} />
                            </ListItemButton>
                        </ListItem>
                    );
                })}
            </List>
            {/*             
            <h4>Usuarios conectados</h4>
            <span style={{ margin: '-10px auto', textTransform: 'uppercase' }}>({users.map(el => { return (el.socketId === socket.id && el.name) })})</span>
            <hr style={{ width: '100%' }} />
            <ul>

                {users.map((el, i) => (
                    el.socketId !== socket.id &&
                    <li key={i}>
                        <div>{el.name}</div>
                    </li>
                ))}
            </ul> */}
        </div>
    );
}