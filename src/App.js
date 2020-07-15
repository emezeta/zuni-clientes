import React from 'react'

import useSession from './hooks/useSession'

import Login from './pages/Login'

const App = () => {
  console.log(useSession())

  return <Login />
}

export default App
