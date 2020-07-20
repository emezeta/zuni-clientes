import React from 'react'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'

import './App.css'
import SessionProvider from './components/SessionProvider'
import { SnackbarProvider } from 'notistack'
import Login from './pages/Login'
import Shop from './pages/Shop'
import Signup from './pages/Signup'

import PrivateRoute from './components/PrivateRoute'
import Disclaimer from './components/Disclaimer'
import Header from './components/Header'

const App = () => {
  return (
    <SessionProvider>
      <BrowserRouter>
        <SnackbarProvider>
          <div className="min-vh-100 d-flex flex-column">
            <div className="d-flex flex-grow-1 flex-column bg-gray">
              <Disclaimer />
              <div className="container py-3">
                <Header />
                <Routes>
                  <PrivateRoute path="/" element={<Shop />}></PrivateRoute>
                  <Route path="/login" element={<Login />}></Route>
                  <Route path="/signup" element={<Signup />}></Route>
                </Routes>
              </div>
            </div>
          </div>
        </SnackbarProvider>
      </BrowserRouter>
    </SessionProvider>
  )
}

export default App
