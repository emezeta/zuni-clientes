import React from 'react'
import { Routes, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'

import './App.css'
import Login from './pages/Login'
import Shop from './pages/Shop'
import Signup from './pages/Signup'

import PrivateRoute from './components/PrivateRoute'
import Disclaimer from './components/Disclaimer'
import Header from './components/Header'

const App = () => {
  return (
    <div className="min-vh-100 d-flex flex-column">
      <div className="d-flex flex-grow-1 flex-column bg-gray">
        <Disclaimer />
        <Header />
        <Routes>
          <PrivateRoute path="/" element={<Shop />}></PrivateRoute>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
        </Routes>
      </div>
    </div>
  )
}

export default App
