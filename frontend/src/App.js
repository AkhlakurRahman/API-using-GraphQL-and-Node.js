import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';

import './App.css';
import Auth from './Pages/Auth';
import Events from './Pages/Events';
import Bookings from './Pages/Bookings';
import Nav from './components/Nav/Nav';

function App() {
  return (
    <div className="App">
      <Nav></Nav>
      <main className="main-content">
        <Switch>
          <Redirect path="/" to="/auth" exact></Redirect>
          <Route path="/auth" component={Auth}></Route>
          <Route path="/events" component={Events}></Route>
          <Route path="/bookings" component={Bookings}></Route>
        </Switch>
      </main>
    </div>
  );
}

export default App;
