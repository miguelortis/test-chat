import React from 'react'
import { Navigate } from 'react-router-dom'
import Chat from '../../views/chat/Chat'

function PrivateRoute() {

  if (localStorage.getItem("name") === null) {
    return <Navigate to="/" replace={true} />
  } else {

    return <Chat />
  }
}

export default PrivateRoute
