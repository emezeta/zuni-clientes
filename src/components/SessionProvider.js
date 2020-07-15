import React, { useEffect, createContext, useState, useCallback } from 'react'
import jwtDecode from 'jwt-decode'

import { SessionUpdateEvent, ACCESS_TOKEN } from '../constants'

export const SessionContext = createContext()

const getUserInfo = () => {
  const token = window.localStorage.getItem(ACCESS_TOKEN)
  if (token) {
    try {
      return jwtDecode(token)
    } catch (e) {
      return
    }
  }
}

const SessionProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(getUserInfo())

  const updateSession = useCallback(() => {
    setUserInfo(getUserInfo())
  }, [])

  useEffect(() => {
    window.addEventListener(SessionUpdateEvent.type, updateSession)
    return () =>
      window.removeEventListener(SessionUpdateEvent.type, updateSession)
  }, [updateSession])

  return (
    <SessionContext.Provider value={userInfo}>
      {children}
    </SessionContext.Provider>
  )
}

export default SessionProvider
