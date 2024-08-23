import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <div className='footer'>
      <div className="footer-container">
        <div className="footer-left">
          <ul>
            <li>Home</li>
            <li>Categories</li>
            <li>All-Products</li>
            <li>Contact-us</li>
          </ul>
        </div>
        <div className="footer-right">
          <h2>Get In Touch</h2>
          <div className="social">
            <img src={assets.social1} alt="" />
            <img src={assets.social2} alt="" />
            <img src={assets.social3} alt="" />
          </div>
        </div>
      </div>
      <p>&copy Nobero - All Rights Reserved</p>
    </div>
  )
}

export default Footer