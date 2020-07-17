import React, { useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'

import useSession from './hooks/useSession'

import './App.css'
import Login from './pages/Login'
import Shop from './pages/Shop'

import Disclaimer from './components/Disclaimer'
import Header from './components/Header'

const App = () => {
  const session = useSession()
  const navigate = useNavigate()

  useEffect(() => {
    if (!session) {
      navigate('/login', { replace: true })
    }
  }, [session, navigate])

  return (
    <div className="min-vh-100 d-flex flex-column">
      <div className="d-flex flex-grow-1 flex-column bg-gray">
        <Disclaimer />
        <Header />
        <Routes>
          <Route path="/" element={<Shop />}></Route>
          <Route path="/login" element={<Login />}></Route>
        </Routes>
      </div>
    </div>
  )
}

export default App
