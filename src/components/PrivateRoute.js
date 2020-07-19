import React, { useEffect } from 'react'
import { Route, useNavigate } from 'react-router-dom'
import useSession from '../hooks/useSession'

const PrivateRoute = (props) => {
  const session = useSession()
  const navigate = useNavigate()

  useEffect(() => {
    if (!session) {
      navigate('/login', { replace: true })
    }
  }, [session, navigate])

  return <Route {...props} />
}

export default PrivateRoute
