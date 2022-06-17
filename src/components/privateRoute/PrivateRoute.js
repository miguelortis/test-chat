import React from 'react'
import { Route, Navigate } from 'react-router-dom'
import { useContext } from 'react'
import { Context } from '../contexts/Context'
import Chat from '../../views/chat/Chat'

function PrivateRoute() {
  const {
    state: { currentUser },
  } = useContext(Context)
  if (localStorage.getItem("name") === null) {
    return <Navigate to="/" replace={true} />
  } else {

    return <Chat />
  }
}

export default PrivateRoute
