import React, { Component } from 'react';
import FormInput from '../components/FormInput/FormInput';
import axios from 'axios';

import './Auth.css';
import AuthContext from '../context/auth-context';

export default class Auth extends Component {
  state = {
    isLogin: true,
    email: '',
    password: ''
  };

  static contextType = AuthContext;

  switchMode = () => {
    this.setState(prevState => {
      return { isLogin: !prevState.isLogin };
    });
  };

  handleChange = event => {
    const { name, value } = event.target;

    this.setState({ [name]: value });
  };

  handleSubmit = async event => {
    event.preventDefault();
    const { email, password } = this.state;

    if (email.trim().length === 0 || password.trim().length === 0) return;

    let reqData = {
      query: `
        query {
          login(email: "${email}", password: "${password}") {
            userId
            token
            tokenExpiration
          }
        }
      `
    };

    if (!this.state.isLogin) {
      reqData = {
        query: `
          mutation {
            createUser(userInput: {email: "${email}", password: "${password}"}) {
              _id
              email
            }
          }
        `
      };
    }

    try {
      const user = await axios({
        url: 'http://localhost:8000/graphql',
        method: 'post',
        data: reqData
      });
      if (user.status !== 200 && user.status !== 201) {
        throw new Error('Failed');
      }
      if (user.data.data.login.token) {
        this.context.login(
          user.data.data.login.token,
          user.data.data.login.userId,
          user.data.data.login.tokenExpiration
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <form className="auth-form" onSubmit={this.handleSubmit}>
        <FormInput
          name="email"
          type="email"
          value={this.state.email}
          id="email"
          htmlFor="email"
          handleChange={this.handleChange}
          label="Email"
          required
        />
        <FormInput
          name="password"
          type="password"
          value={this.state.password}
          id="password"
          htmlFor="password"
          handleChange={this.handleChange}
          label="Password"
          required
        />
        <div className="form-action">
          <button type="submit">
            {!this.state.isLogin ? 'Signup' : 'Login'}
          </button>
          <button type="button" onClick={this.switchMode}>
            Switch to {this.state.isLogin ? 'Signup' : 'Login'}
          </button>
        </div>
      </form>
    );
  }
}
