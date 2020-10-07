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
        <li>
          <Link to='/' className={isActive('/')}>
            Teams
          </Link>
        </li>
        <li>
          <Link to='/players' className={isActive('/players')}>
            Players
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Menu;
