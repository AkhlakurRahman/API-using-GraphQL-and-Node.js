import React from 'react';
import { NavLink } from 'react-router-dom';

import AuthContext from '../../context/auth-context';
import './Nav.css';

const Nav = props => (
  <AuthContext.Consumer>
    {context => {
      return (
        <header className="main-navigation">
          <div className="main-navigation__logo">
            <h1>EventBooking</h1>
          </div>
          <div className="main-navigation__items">
            <ul>
              {!context.token && (
                <li>
                  <NavLink to="/auth">Login</NavLink>
                </li>
              )}
              <li>
                <NavLink to="/events">Events</NavLink>
              </li>
              {context.token && (
                <React.Fragment>
                  <li>
                    <NavLink to="/bookings">Bookings</NavLink>
                  </li>
                  <button onClick={context.logout}>Logout</button>
                </React.Fragment>
              )}
            </ul>
          </div>
        </header>
      );
    }}
  </AuthContext.Consumer>
);

export default Nav;
