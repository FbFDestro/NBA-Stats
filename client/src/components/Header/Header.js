import React from 'react';
import './Header.css';
import Menu from '../Menu/Menu';

const Header = (props) => {
  return (
    <header>
      <a id='logo' href='#'>
        <img src='media/nbaLogo.png' alt='NBA' />
        <h1>NBA Stats</h1>
      </a>
      <Menu {...props} />
    </header>
  );
};

export default Header;
