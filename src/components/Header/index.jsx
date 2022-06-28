import React from "react";
import './Header.css';

//images
import img_logo from './assets/logo-01.png';




export default ( {black} ) => {
  
  return (
    <header className={black ? 'black' : ''}>
      <div className="header--logo">
        <a href="/">
          <img src={img_logo} alt="logo" />
        </a>
      </div>
      <div className="header--user">
        <a href="/">
          <img src="https://i.pinimg.com/originals/0d/dc/ca/0ddccae723d85a703b798a5e682c23c1.png" alt="usuário" />
        </a>
      </div>
    </header>
  )

}