import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './Components/NavBar/Navbar';
import Footer from './Components/Footer/Footer';
import Home from './Pages/Home/Home';
import PDetails from './Pages/PDetails/PDetails';

const App = () => {
  return (
    <div className='app'>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/product/:productTitle' element={<PDetails />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
