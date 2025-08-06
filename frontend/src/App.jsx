import React from 'react'
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom'
import PrivateChat from './components/pages/PrivateChat'
import Loginpage from './components/pages/Loginpage'
import Home from './components/pages/Home'
import Register from './components/pages/Register'
import Header from './components/pages/Header'
function App() {
  return (
    <>
    <Router>
      <Header/>
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/chat" element={<PrivateChat/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/login" element={<Loginpage/>}/>
        </Routes>
    </Router>
    </>
  )
}

export default App