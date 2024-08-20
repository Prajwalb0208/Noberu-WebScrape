import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Navbar from './Components/NavBar/Navbar'
import Footer from './Components/Footer/Footer'
import Home from './Pages/Home/Home'
import PDetails from './Pages/PDetails/PDetails'

const App = () => {
  return (
    <>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/product' element={<PDetails/>}/>
      </Routes>
      <Footer/>
    </>
  )
}

export default App