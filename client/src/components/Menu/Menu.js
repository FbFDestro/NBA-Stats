import React from 'react';
import { Link } from 'react-router-dom';
import './Menu.css';

import { useLocation } from 'react-router-dom';

export const Menu = (props) => {
  let location = useLocation();

  const isActive = (linkPath) => {
    if (linkPath === location.pathname) return 'btn active';
    return 'btn';
  };

  return (
    <nav>
      <ul>
        <img
          className={`${props.theme === 0 ? 'img-dark' : ''} `}
          src='/media/light.png'
          alt='theme'
          onClick={() => {
            props.setTheme(props.theme ^ 1);
          }}
        />
        <li>
          <Link to='/teams' className={isActive('/teams')}>
            Teams
          </Link>
        </li>
        <li>
          <Link to='/compareTeams' className={isActive('/compareTeams')}>
            Compare Teams
          </Link>
        </li>
        <li>
          <Link to='/players' className={isActive('/players')}>
            Players
          </Link>
        </li>
        <li>
          <Link to='/comparePlayers' className={isActive('/comparePlayers')}>
            Compare Players
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Menu;
