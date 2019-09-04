import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';

import './App.css';
import Auth from './Pages/Auth';
import Events from './Pages/Events';
import Bookings from './Pages/Bookings';
import Nav from './components/Nav/Nav';
import AuthContext from './context/auth-context';

class App extends React.Component {
  state = {
    token: null,
    userId: null
  };
  login = (token, userId, tokenExpiration) => {
    this.setState({ token, userId });
  };

  logout = () => {
    this.setState({ token: null, userId: null });
  };

  render() {
    return (
      <div className="App">
        <AuthContext.Provider
          value={{
            token: this.state.token,
            userId: this.state.userId,
            login: this.login,
            logout: this.logout
          }}
        >
          <Nav></Nav>
          <main className="main-content">
            <Switch>
              {this.state.token && (
                <Redirect path="/" to="/events" exact></Redirect>
              )}
              {this.state.token && (
                <Redirect path="/auth" to="/events" exact></Redirect>
              )}
              {!this.state.token && (
                <Route path="/auth" component={Auth}></Route>
              )}
              <Route path="/events" component={Events}></Route>
              {this.state.token && (
                <Route path="/bookings" component={Bookings}></Route>
              )}
              {!this.state.token && <Redirect to="/auth" exact></Redirect>}
            </Switch>
          </main>
        </AuthContext.Provider>
      </div>
    );
  }
}

export default App;
