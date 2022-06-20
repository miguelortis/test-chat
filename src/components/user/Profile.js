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
import { useAuth } from '../../context/AuthContext';
import { Send } from '@mui/icons-material';
import { Button } from '@mui/material';
import CropEasy from '../crop/CropEasy';
import { Crop } from '@mui/icons-material';

const Profile = () => {
  const {
    state: { photoURL: currentPhotoURL },
    dispatch,
  } = useContext(Context)
  const { setLoading, setAlert, modal, setModal } = useAuth();
  const [file, setFile] = useState(null);
  const [photoURL, setPhotoURL] = useState(currentPhotoURL);
  const [openCrop, setOpenCrop] = useState(false);
  useEffect(() => {
    setPhotoURL(currentPhotoURL);
  }
    , [currentPhotoURL]);


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
    setLoading(true);

    try {

      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result.replace('data:', '').replace(/^.+,/, '');
        localStorage.setItem('Profile-Picture', base64String);
        dispatch({ type: 'SET_PROFILE_PICTURE', payload: base64String });
      };
      reader.readAsDataURL(file);

      setAlert({
        isAlert: true,
        severity: 'success',
        message: 'Your profile has been updated',
        timeout: 3000,
        location: 'modal',
      });
    } catch (error) {
      setAlert({
        isAlert: true,
        severity: 'error',
        message: error.message,
        timeout: 5000,
        location: 'modal',
      });
      console.log(error);
    }

    setLoading(false);
    setModal({
      isOpen: false,
      title: '',
      content: '',
    });
  };

  useEffect(() => {
    if (openCrop) {
      setModal({ ...modal, title: 'Editar Imagen' });
    } else {
      setModal({ ...modal, title: 'Actualizar Perfil' });
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
              src={photoURL ? photoURL : `data:image/png;base64,${photoURL}`}
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
