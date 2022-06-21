import React, { useEffect, useContext } from 'react';
import { Context } from './contexts/Context'
import { Close } from '@mui/icons-material';
import { Dialog, DialogTitle, IconButton } from '@mui/material';

const Modal = () => {
  const {
    state: { showModal, alert: { location, isAlert } },
    dispatch,
  } = useContext(Context)

  const handleClose = () => {
    dispatch({ type: 'SET_MODAL', payload: { isOpen: false, title: '', content: '' } })
  };

  useEffect(() => {
    if (showModal.isOpen === false) {
      if (isAlert && location === 'modal') {
        dispatch({ type: 'ALERT', payload: { isAlert: false, severity: 'info', message: '', timeout: null, location: '' } })
      }
    }
  }, [showModal?.isOpen]);
  return (
    <Dialog open={showModal.isOpen} onClose={handleClose}>
      <DialogTitle>
        {showModal.title}
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
      {showModal.content}
    </Dialog>
  );
};

export default Modal;
