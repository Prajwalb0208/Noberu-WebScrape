import React, { useState } from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'
import { Link } from 'react-router-dom'

const Navbar = () => {

  const [menu, setmenu] = useState("home")

  return (
    <div className="navbar-container">
      <div className='navbar-marquee'>
        <marquee>100% Refund Guarantee if you don't ❤️ the product. Shop with Confidence</marquee>
      </div>
      <div className="navbar">
        <Link to='/'>
          <img src={assets.logo} alt="Logo" className='logo' />
        </Link>
        <ul className='navbar-menu'>
          <li className={menu === "home" ? "active" : ""} onClick={() => setmenu("home")}>Home</li>
          <li className={menu === "categories" ? "active" : ""} onClick={() => setmenu('categories')}>Categories</li>
          <li className={menu === "all-products" ? "active" : ""} onClick={() => setmenu('all-products')}>All Products</li>
          <li className={menu === "contact-us" ? "active" : ""} onClick={() => setmenu('contact-us')}>Contact Us</li>
        </ul>
        <img src={assets.basket} alt="" className='basket' />
      </div>
    </div>
  )
}

export default Navbar