import React, { Component } from 'react';
import Arrival from './Arrival.js';

import NearbyStops from './NearbyStops.js';


class App extends Component {
  state = {
    locid: ''
  }

  handleOnChange = event => {
    console.log(event);
    
    this.setState({ [event.target.name]: event.target.value });
  }

  render() {
    const { locid } = this.state;
    return (
      <div className="App">
        <NearbyStops locid={locid} handleChange={this.handleOnChange}/>
        <Arrival stopId={locid} handleChange={this.handleOnChange}/>
      </div>
    );
  }
}

export default App;
