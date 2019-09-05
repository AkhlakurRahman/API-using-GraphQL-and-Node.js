import React, { Component } from 'react';

import './Events.css';
import Modal from '../components/Modal/Modal';
import Backdrop from '../components/Modal/Backdrop/Backdrop';

export default class Events extends Component {
  state = {
    showBackdrop: false
  };

  handleShowingBackdrop = () => {
    this.setState({ showBackdrop: true });
  };

  handleCancelingBackdrop = () => {
    this.setState({ showBackdrop: false });
  };

  handleConfirm = () => {
    this.setState({ showBackdrop: false });
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
          </Modal>
        )}
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
      </React.Fragment>
    );
  }
}
