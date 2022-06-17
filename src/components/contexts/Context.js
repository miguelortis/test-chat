
import React, { useReducer, useEffect, createContext } from 'react'
import PropTypes from 'prop-types'

const initialState = {
  currentUser: null,
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_USER_DATA':
      return { ...state, currentUser: { ...state.currentUser, ...action.payload } }
    case 'RESET':
      return { ...state, currentUser: null, dataTotal: [] }
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
