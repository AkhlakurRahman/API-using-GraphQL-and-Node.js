import React, { Component } from 'react';
import axios from 'axios';

import './Events.css';
import Modal from '../components/Modal/Modal';
import Backdrop from '../components/Modal/Backdrop/Backdrop';
import FormInput from '../components/FormInput/FormInput';
import AuthContext from '../context/auth-context';

export default class Events extends Component {
  state = {
    showBackdrop: false,
    title: '',
    price: '',
    date: '',
    description: ''
  };

  static contextType = AuthContext;

  handleShowingBackdrop = () => {
    this.setState({ showBackdrop: true });
  };

  handleCancelingBackdrop = () => {
    this.setState({ showBackdrop: false });
  };

  handleChange = event => {
    const { name, value } = event.target;

    this.setState({ [name]: value });
  };

  handleConfirm = async () => {
    const { title, date, description } = this.state;

    const price = +this.state.price;

    if (
      title.trim().length === 0 ||
      price <= 0 ||
      date.trim().length === 0 ||
      description.trim().length === 0
    )
      return;

    console.log({ title, price, date, description });

    const reqData = {
      query: `
        mutation {
          createEvent(eventInput: {title: "${title}", price: ${price}, date: "${date}", description: "${description}"}) {
            _id
            title
            description
            price
            date
            creator {
              _id
              email
            }
         }
       }
      `
    };

    const token = this.context.token;

    try {
      const event = await axios({
        url: 'http://localhost:8000/graphql',
        method: 'post',
        data: reqData,
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (event.status !== 200 && event.status !== 201) {
        throw new Error('Failed');
      }

      console.log(event.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <React.Fragment>
        {this.state.showBackdrop && <Backdrop />}
        {this.state.showBackdrop && (
          <Modal
            title="Create an Event"
            canCancel
            canConfirm
            handleCancelingBackdrop={this.handleCancelingBackdrop}
            handleConfirm={this.handleConfirm}
          >
            <p>Hi Modal</p>
            <form>
              <FormInput
                name="title"
                type="title"
                value={this.state.title}
                htmlFor="title"
                id="title"
                label="Title"
                handleChange={this.handleChange}
                required
              />
              <FormInput
                name="price"
                type="number"
                value={this.state.price}
                htmlFor="price"
                id="price"
                label="Price"
                handleChange={this.handleChange}
                required
              />
              <FormInput
                name="date"
                type="datetime-local"
                value={this.state.date}
                htmlFor="date"
                id="date"
                label="Date"
                handleChange={this.handleChange}
                required
              />
              <FormInput
                name="description"
                value={this.state.description}
                htmlFor="description"
                id="description"
                label="Description"
                textarea
                handleChange={this.handleChange}
                required
              />
            </form>
          </Modal>
        )}
        {this.context.token && (
          <div className="events-control">
            <p>Event management is easier than ever!</p>
            <button
              className="btn"
              type="button"
              onClick={this.handleShowingBackdrop}
            >
              Create Event
            </button>
          </div>
        )}
      </React.Fragment>
    );
  }
}
