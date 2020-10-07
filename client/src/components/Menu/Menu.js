import React from 'react';
import { Link } from 'react-router-dom';
import './Menu.css';

export const Menu = (props) => {
  const isActive = (linkPath) => {
    if (linkPath === props.match.url) return 'btn active';
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
