import React from 'react';
import { NavLink } from 'react-router-dom';

import './Nav.css';

const Nav = () => {
  return (
    <header className="main-navigation">
      <div className="main-navigation__logo">
        <h1>EventBooking</h1>
      </div>
      <div className="main-navigation__items">
        <ul>
          <li>
            <NavLink to="/auth">Login</NavLink>
          </li>
          <li>
            <NavLink to="/events">Events</NavLink>
          </li>
          <li>
            <NavLink to="/bookings">Bookings</NavLink>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Nav;
