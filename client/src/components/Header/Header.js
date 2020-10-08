import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import Menu from '../Menu/Menu';

const Header = () => {
  return (
    <header>
      <Link to='/' id='logo'>
        <img src='media/nbaLogo.png' alt='NBA' />
        <h1>NBA 2019 Stats</h1>
      </Link>
      <Menu />
    </header>
  );
};

export default Header;
