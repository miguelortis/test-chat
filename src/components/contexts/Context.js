
import React, { useReducer, useEffect, createContext } from 'react'
import PropTypes from 'prop-types'

const initialState = {
  users: [],
  buttonInfo: false,
  photoURL: '',
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_USERS':
      return { ...state, users: action.payload }
    case 'SET_BUTTON_INFO':
      return { ...state, buttonInfo: action.payload }
    case 'SET_PROFILE_PICTURE':
      return { ...state, photoURL: action.payload }
    case 'RESET':
      return { ...state, users: [], buttonInfo: false, photoURL: '' }
    default:
      return state
  }
}

const Context = createContext(initialState)
const ContextProvider = ({ children }) => {
  ContextProvider.propTypes = {
    children: PropTypes.node,
  }
  const [state, dispatch] = useReducer(reducer, initialState)
  const { currentUser } = state
  /* const logout = () => {
    history.push('/')
  } */

  useEffect(() => { }, [dispatch, currentUser])

  return <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
}

export { Context, ContextProvider }
