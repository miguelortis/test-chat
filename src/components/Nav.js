import React, { useContext } from "react";
import { Context } from '../components/contexts/Context'
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Profile from './user/Profile';

export default function Nav() {
  const {
    state: { photoURL },
    dispatch,
  } = useContext(Context)


  return (
    <React.Fragment>
      <Box sx={{ display: 'block', alignItems: 'center', textAlign: 'center' }}>

        <Tooltip title="Foto perfil">
          <IconButton onClick={() =>
            dispatch({ type: "SET_MODAL", payload: { isOpen: true, title: "Foto de Perfil", content: <Profile /> } })}>
            <Avatar
              src={`data:image/png;base64,${photoURL}`}
              sx={{ width: 70, height: 70 }}
            >

            </Avatar>
          </IconButton>
        </Tooltip>

      </Box>

    </React.Fragment>
  );
}
