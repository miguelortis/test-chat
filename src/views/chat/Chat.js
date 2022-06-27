import React, { useEffect, useContext, useState } from "react";
import { Context } from '../../components/contexts/Context'
import socket from "../../components/socket/Socket";
import Conversation from '../../components/conversation/Conversation';
import { GetUsers } from "../../components/getUsers/getUsers";
import { Grid } from "@mui/material";
import Map from '../map/Map';
import { Dialog, DialogTitle, IconButton } from "@mui/material";
import { Close } from "@mui/icons-material";
const Chat = () => {
  const [latLng, setLatLng] = useState({
    lat: 0,
    lng: 0,
  });
  const {
    state: { buttonInfo, openMap },
    dispatch,
  } = useContext(Context)
  const geolocation = JSON.parse(localStorage.getItem('geolocation'))
  const name = localStorage.getItem("name");
  useEffect(() => {
    socket.emit("connected", { name, photoURL: localStorage.getItem('Profile-Picture'), geolocation });
  }, [name]);
  const handleClose = () => {
    dispatch({ type: 'SET_MAP', payload: false })
  };
  return (
    <div className="chat">
      <Dialog fullWidth maxWidth='lg' open={openMap} onClose={handleClose}>
        <DialogTitle>
          <h4>Map</h4>
          <IconButton
            aria-label="Close"
            onClick={handleClose}
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <Close />
          </IconButton>
        </DialogTitle>
        <Grid container spacing={3}>
          <Grid item sm={4}>
            <GetUsers setLatLng={setLatLng} />
          </Grid>
          <Grid item sm={6}>
            <Map latLng={latLng} />
          </Grid>
        </Grid>
      </Dialog>
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