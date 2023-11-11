import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import SingIn from './pages/SingIn'
import Signup from './pages/Signup'
import About from './pages/About'
import Profile from './pages/Profile'
import Header from './components/Header'
import PrivateRoute from './components/PrivateRoute'

const App = () => {
  return (
    <BrowserRouter>
    <Header />
     <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/sign-in' element={<SingIn />}></Route>
        <Route path='/sign-up' element={<Signup />}></Route>
        <Route path='/about' element={<About />}></Route>
        <Route element={<PrivateRoute />}>
          <Route path='/profile' element={<Profile />}></Route>
        </Route>
     </Routes>
    </BrowserRouter>
  )
}

export default App