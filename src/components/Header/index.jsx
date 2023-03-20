import React from 'react';
import logo from '../../img/Logo.svg';
import './header.scss';

const Header = () => {
  return (
    <header className='header'>
      <div className="container">
        <a className="header__logo" href="#" >
          <img src={logo} alt="logo" />
        </a>
        <div className="header__buttons">
          <button className="header__button button">Users</button>
          <button className="header__button button">Sign up</button>
        </div>
      </div>
    </header>
  )
}

export default Header
