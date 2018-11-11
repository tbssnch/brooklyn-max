import React, { Component } from 'react';
import Arrival from './Arrival.js';

import NearbyStops from './NearbyStops.js';


class App extends Component {
  render() {
    return (
      <div className="App">
        <NearbyStops />
      </div>
    );
  }
}

export default App;
