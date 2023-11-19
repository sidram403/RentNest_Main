import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import CreateListing from './pages/CreateListing'
import Search from './pages/Search'

const App = () => {
  return (
    <BrowserRouter>
     <Routes>
        <Route path='/search' element={<Search />}></Route>
        <Route path='/' element={<CreateListing />}></Route>
     </Routes>
    </BrowserRouter>
  )
}

export default App