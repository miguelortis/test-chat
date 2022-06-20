import React, { useContext } from "react";
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { useAuth } from '../context/AuthContext';
import Profile from './user/Profile';
import { Context } from '../components/contexts/Context'

export default function Nav() {
  const {
    state: { photoURL },
  } = useContext(Context)



  const { setModal } = useAuth();

  return (
    <React.Fragment>
      <Box sx={{ display: 'block', alignItems: 'center', textAlign: 'center' }}>

        <Tooltip title="Foto perfil">
          <IconButton onClick={() =>
            setModal({
              isOpen: true,
              title: 'Update Profile',
              content: <Profile />,
            })
          } size="small" sx={{ ml: 2 }} >
            <Avatar
              src={`data:image/png;base64,${photoURL}`}
              sx={{ width: 32, height: 32 }}
            >

            </Avatar>
          </IconButton>
        </Tooltip>

      </Box>

    </React.Fragment>
  );
}
