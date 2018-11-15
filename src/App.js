import React, { Component } from 'react';
import './App.css';
import logo from './assets/trimet.png';
import Arrival from './Arrival.js';
import NearbyStops from './NearbyStops.js';

class App extends Component {
  state = {
    locid: ''
  }

  handleOnChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  }

  render() {
    const { locid } = this.state;
    return (
      <div className="App">
        <img className="logo" src={logo} />
        <NearbyStops locid={locid} handleChange={this.handleOnChange}/>
        <h5 className="separator">
          OR
        </h5>
        <Arrival stopId={locid} handleChange={this.handleOnChange}/>
      </div>
    );
  }
}

export default App;
