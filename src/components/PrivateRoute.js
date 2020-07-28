import React, { useEffect } from 'react'
import { Route, useNavigate } from 'react-router-dom'
import mixpanel from 'mixpanel-browser'
import useSession from '../hooks/useSession'

const PrivateRoute = (props) => {
  const session = useSession()
  const navigate = useNavigate()

  useEffect(() => {
    if (!session) {
      navigate('/login', { replace: true })
    } else {
      mixpanel.identify(session.phone)
      mixpanel.people.set({ phone: session.phone, name: session.name })
    }
  }, [session, navigate])

  return <Route {...props} />
}

export default PrivateRoute
