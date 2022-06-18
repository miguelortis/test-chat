import React, { useEffect } from "react";
import socket from "../../components/socket/Socket";
import Conversation from '../../components/conversation/Conversation';
import { GetUsers } from "../../components/getUsers/getUsers";
import { Grid } from "@mui/material";
const Chat = () => {

  const name = localStorage.getItem("name");
  useEffect(() => {
    socket.emit("connected", name);
  }, [name]);

  return (
    <div className="chat">
      <Grid sx={{ mt: 2 }} container spacing={2}>
        <Grid item sx={{ display: { xs: 'none', md: 'block' } }} xs={12} md={4} lg={4} xl={4}>
          <GetUsers />
        </Grid>
        <Grid item xs={12} md={8} lg={8} xl={8}>
          <Conversation />
        </Grid>
      </Grid>
    </div>
  );
};

export default Chat;