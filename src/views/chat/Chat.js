import React, { useEffect, useContext } from "react";
import { Context } from '../../components/contexts/Context'
import socket from "../../components/socket/Socket";
import Conversation from '../../components/conversation/Conversation';
import { GetUsers } from "../../components/getUsers/getUsers";
import { Grid } from "@mui/material";
const Chat = () => {
  const {
    state: { buttonInfo },
  } = useContext(Context)

  const name = localStorage.getItem("name");
  useEffect(() => {
    socket.emit("connected", name);
  }, [name]);

  return (
    <div className="chat">
      <Grid container spacing={2}>
        <Grid item sx={{ display: { xs: buttonInfo ? 'block' : 'none', md: 'block' }, position: { xs: 'absolute', md: 'relative' }, zIndex: { xs: 1 }, width: { xs: '100%' } }} xs={12} md={4} lg={4} xl={4}>
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