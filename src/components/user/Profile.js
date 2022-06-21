import {
  Avatar,
  Box,
  DialogActions,
  DialogContent,
  DialogContentText,
  IconButton,
  Typography,
} from '@mui/material';
import { Context } from '../contexts/Context'
import { useState, useEffect, useContext } from 'react';
import { Send } from '@mui/icons-material';
import { Button } from '@mui/material';
import CropEasy from '../crop/CropEasy';
import { Crop } from '@mui/icons-material';

const Profile = () => {
  const {
    state: { photoURL: currentPhotoURL, showModal },
    dispatch,
  } = useContext(Context)
  const [file, setFile] = useState(null);
  const [photoURL, setPhotoURL] = useState('');
  const [openCrop, setOpenCrop] = useState(false);

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFile(file);
      setPhotoURL(URL.createObjectURL(file));
      setOpenCrop(true);
      dispatch({ type: 'SET_PROFILE_PICTURE', payload: URL.createObjectURL(file) });
    }
  };
  const handleSubmit = async (e) => {
    dispatch({ type: 'SET_LOADING', payload: true });

    try {

      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result.replace('data:', '').replace(/^.+,/, '');
        localStorage.setItem('Profile-Picture', base64String);
        dispatch({ type: 'SET_PROFILE_PICTURE', payload: base64String });
      };
      reader.readAsDataURL(file);
      dispatch({
        type: 'SET_ALERT', payload: {
          isAlert: true,
          severity: 'success',
          message: 'Your profile has been updated',
          timeout: 3000,
          location: 'modal',
        }
      });

    } catch (error) {
      dispatch({
        type: 'SET_ALERT', payload: {
          isAlert: true,
          severity: 'error',
          message: error.message,
          timeout: 5000,
          location: 'modal',
        }
      });

      console.log(error);
    }
    dispatch({ type: 'SET_LOADING', payload: false });
    dispatch({ type: 'SET_MODAL', payload: { isOpen: false, title: '', content: '' } });

  };

  useEffect(() => {
    if (openCrop) {
      dispatch({ type: 'SET_MODAL', payload: { ...showModal, title: 'Editar Imagen' } });
    } else {
      dispatch({ type: 'SET_MODAL', payload: { ...showModal, title: 'Actualizar Perfil' } });
    }
  }, [openCrop]);

  return !openCrop ? (
    <div >
      <DialogContent dividers sx={{ textAlign: 'center' }}>
        <DialogContentText sx={{ textAlign: 'center' }}>
          Ingresa una foto de perfil
          <Typography sx={{ display: 'block' }} variant="caption">
            (opcional)
          </Typography>
        </DialogContentText>
        <Box sx={{ display: 'block', alignItems: 'center' }}>
          <label htmlFor="profilePhoto">
            <input
              accept="image/*"
              id="profilePhoto"
              type="file"
              style={{ display: 'none' }}
              onChange={handleChange}
            />
            <Avatar
              src={photoURL ? photoURL : `data:image/png;base64,${currentPhotoURL}`}
              sx={{ width: 75, height: 75, cursor: 'pointer', margin: '0 auto' }}
            />
          </label>
          {file && (
            <IconButton
              aria-label="Crop"
              color="primary"
              onClick={() => setOpenCrop(true)}
            >
              <Crop />
            </IconButton>
          )}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSubmit} variant="contained" endIcon={<Send />} type="submit">
          Aceptar
        </Button>
      </DialogActions>
    </div>
  ) : (
    <CropEasy {...{ photoURL, setOpenCrop, setPhotoURL, setFile }} />
  );
};

export default Profile;
