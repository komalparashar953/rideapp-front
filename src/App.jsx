import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Homepage from './pages/Homepage'
import UserSignin from './pages/UserSignin'
import UserSignup from './pages/UserSignup'
import CaptainSignin from './pages/CaptainSignin'
import CaptainSignup from './pages/CaptainSignup'
import Home from './pages/Home'
import UserProtectWrapper from './pages/UserProtectWrapper'
import UserLogout from './pages/UserLogout'
import CaptainHome from './pages/CaptainHome'
import CaptainProtectWrapper from './pages/CaptainProtectWrapper'
import CaptainLogout from './pages/CaptainLogout'
import Riding from './pages/Riding'
import CaptainRiding from './pages/CaptainRiding'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Homepage />}/>
        <Route path='/signin' element={<UserSignin />} />
        <Route path='/signup' element={<UserSignup />} />
        <Route path='/captain-signin' element={<CaptainSignin />} />
        <Route path='/captain-signup' element={<CaptainSignup />} />
        <Route path='/riding' element={<Riding />} />
        <Route path='/captain-riding' element={<CaptainRiding />} />

        <Route 
        path='/home' 
        element={
          <UserProtectWrapper>
            <Home />
          </UserProtectWrapper>
        } />

        <Route  path='/logout' element={
          <UserProtectWrapper>
            <UserLogout />
          </UserProtectWrapper>
        }/>

        <Route 
        path='/captain-home' 
        element={
          <CaptainProtectWrapper>
            <CaptainHome />
          </CaptainProtectWrapper>
          } />

        <Route path='/captain-logout' element={
          <CaptainProtectWrapper>
            <CaptainLogout />
          </CaptainProtectWrapper>
        } />
        
      </Routes>
    </div>
  )
}

export default App
