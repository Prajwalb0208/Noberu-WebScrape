import React, { useState } from 'react'
import './Home.css'
import Categories from '../../Components/Categories/Categories'
import AllProducts from '../../Components/AllProducts/AllProducts'

const Home = () => {

  const [cat,setCat] = useState("All")

  return (
    <div>
      <hr/>
      <Categories cat={cat} setCat={setCat} />
      <AllProducts/>
    </div>
  )
}

export default Home