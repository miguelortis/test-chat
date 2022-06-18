import React, { useState, useEffect, useRef } from "react";
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import Avatar from '@mui/material/Avatar';
import { Divider, IconButton, TextField } from '@mui/material';
import socket from "../../components/socket/Socket";
import SendIcon from '@mui/icons-material/Send';
import BgChat from '../../assets/images/bg_chat.png';
import './Conversation.css';

export default function BottomAppBar() {
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    useEffect(() => {
        socket.on("messages", (message) => {
            setMessages([...messages, { ...message, receiverId: socket.id }]);

        });


    }, [messages]);
    const name = localStorage.getItem("name");
    const divRef = useRef(null);
    const input = useRef(null);
    useEffect(() => {
        divRef.current.scrollIntoView({ behavior: "smooth" });
        input.current.focus();
    });

    const submit = (e) => {
        e.preventDefault();

        socket.emit("message", name, message);
        setMessage("");
    };
    const ListStyle = {
        backgroundColor: 'rgba(245, 236, 236)',
        maxHeight: '300px',
        overflowY: 'scroll',
        minHeight: {
            xs: 'calc(100vh - 200px)',
            md: 'calc(100vh - 320px)'
        },
        backgroundImage: `url(${BgChat})`,
        backgroundRepeat: 'repeat',
    }
    return (
        <div>

            <Paper square >
                <Typography variant="h5" gutterBottom component="div" sx={{ p: 2, pb: 1, display: { xs: 'none', md: 'block' } }}>
                    Bandeja de Entrada
                </Typography>
                <Divider />
                <List sx={ListStyle}>
                    {messages.map(({ name, message, messageDate, senderId, receiverId }, i) => (
                        <React.Fragment key={i}>

                            <div className={senderId === receiverId ? 'message-right' : 'message-left'}>
                                <div className={senderId === receiverId ? 'right' : 'left'} >
                                    <ListItem sx={{ pt: 0 }}>
                                        <ListItemText primary={
                                            <React.Fragment>
                                                <Typography
                                                    sx={{ display: 'inline' }}
                                                    component="span"
                                                    variant="caption"
                                                    color="text.primary"
                                                >
                                                    {senderId === receiverId ? '' : name + ': '}
                                                </Typography>
                                            </React.Fragment>} secondary={message} />
                                    </ListItem>
                                    <Typography sx={{
                                        display: 'inline-block',
                                        verticalAlign: 'top',
                                        fontSize: '0.6875rem'
                                    }} variant="caption" display="block" gutterBottom>
                                        02:00 pm
                                    </Typography>
                                </div>
                            </div>
                        </React.Fragment>
                    ))}
                    <div ref={divRef}></div>
                </List>
                <input
                    className='inputSubmit'
                    type="text"
                    label="Escribe tu mensaje"
                    ref={input}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={(e) => {
                        if (e.key === "Enter") submit(e)
                    }}
                />
                <IconButton onClick={submit}>
                    <SendIcon sx={{ fontSize: 40 }} />
                </IconButton>
            </Paper>
        </div>
    );
}
