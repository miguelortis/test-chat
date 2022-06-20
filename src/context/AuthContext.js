// import {
//   createUserWithEmailAndPassword,
//   GoogleAuthProvider,
//   onAuthStateChanged,
//   sendPasswordResetEmail,
//   signInWithEmailAndPassword,
//   signInWithPopup,
//   signOut,
// } from 'firebase/auth';
import { useState } from 'react';
import { useContext } from 'react';
import { createContext } from 'react';
// import { auth } from '../firebase/config';

const authContext = createContext();

export const useAuth = () => {
  return useContext(authContext);
};

const AuthContext = ({ children }) => {
  const [modal, setModal] = useState({ isOpen: false, title: '', content: '' });
  const [alert, setAlert] = useState({
    isAlert: false,
    severity: 'info',
    message: '',
    timeout: null,
    location: '',
  });
  const [loading, setLoading] = useState(false);

  const value = {
    modal: modal,
    setModal,
    alert: alert,
    setAlert,
    loading: loading,
    setLoading,
  };
  return <authContext.Provider {...{ value }}>{children}</authContext.Provider>;
};

export default AuthContext;
