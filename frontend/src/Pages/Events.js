import React, { Component } from 'react';

import './Events.css';
export default class Events extends Component {
  render() {
    return (
      <div className="events-control">
        <p>Event management is easier than ever!</p>
        <button className="btn" type="button">
          Create Event
        </button>
      </div>
    );
  }
}
