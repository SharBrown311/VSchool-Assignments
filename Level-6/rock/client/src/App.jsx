import './App.css'
import React, { useContext } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Navbar from "./components/Navbar"
import Public from './components/Public'
import Profile from './components/Profile'
import Auth from "./components/Auth"
import { UserContext } from './context/UserProvider'


function App() {
  const { token, logout } = useContext(UserContext)
  return (
    <div className="App">
      <Navbar logout={logout} token={token} />
      <Routes>
        <Route
          path="/"
          element={token ? <Navigate replace to="/profile" /> : <Auth />}
        />
        <Route
          path="/profile"
          element={token ? <Profile /> : <Navigate replace to="/" />}
        />
        <Route
          path="/public"
          element={token ? <Public /> : <Navigate replace to="/" />}
        />
      </Routes>
    </div>
  )
}

export default App;