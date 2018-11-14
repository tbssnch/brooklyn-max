import React, { Component } from 'react';

// Assests
import './App.css';
import logo from './assets/trimet.png';

// Components
import Arrival from './Arrival.js';
import NearbyStops from './NearbyStops.js';

//Material UI Components
import Typography from '@material-ui/core/Typography';


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
