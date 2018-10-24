import React, { Component } from 'react';
import Moment from 'react-moment';
import logo from './assets/transit-logo.png';
import rail from './assets/rail.png';
import './Arrival.css';

import fetchArrivals from "./utils/fetchArrivals";

class Arrival extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      stopId: '',
      arrival: []
    };
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleOnChange(event) {
    this.setState({
      [event.target.name] : event.target.value
    });

  }

  handleSubmit(event) {

    event.preventDefault();
    const { stopId } = this.state;
    const API_KEY = `${process.env.REACT_APP_TRIMET_KEY}`;

    fetch(`https://developer.trimet.org/ws/V1/arrivals?locIDs=${stopId}&appID=${API_KEY}&json=true`)
    .then(res => res.json())
    .then(
      (res) => {
        console.log(res);
        this.setState({
          isLoaded: true,
          arrival: res.resultSet.arrival,
        });
        console.log(this.state);
      },
      (error) => {
        this.setState({
          isLoaded: true,
          error
        });
      });  
  }
  






  componentDidMount() {
    const API_KEY = `${process.env.REACT_APP_TRIMET_KEY}`;
    const { stopId } = this.state;

    fetch(`https://developer.trimet.org/ws/V1/arrivals?locIDs=${stopId}&appID=${API_KEY}&json=true`)
    .then(res => res.json())
    .then(
      (res) => {
        console.log(res);
        this.setState({
          isLoaded: true,
          arrival: res.resultSet.arrival,
        });
        console.log(this.state);
      },
      (error) => {
        this.setState({
          isLoaded: true,
          error
        });
      });  
    
    }

  render() {
    const { error, isLoaded, arrival } = this.state;
    if (error) {
      return <div>Error: {error.message} </div>;
    } else if (!isLoaded) {
      return <div>Gimme a sec...</div>;
    } else {
      return (
        <div className="arrival-container">
          <div className="arrival">
            <img className="logo" src={logo} />
            <form onSubmit={this.handleSubmit}>
              <input
                type="text"
                placeholder="Stop ID"
                onChange={this.handleOnChange}
                value={this.state.stopId}
                name="stopId" />
              <input 
                type="submit"
                 value="Submit" />
            </form>
            {
              (arrival) ?
              arrival.map(arrival => (
                <div key={arrival.estimated} className="results">
                  <h3>{arrival.shortSign}</h3>
                  <h3>
                    <Moment format="LT">
                      {arrival.scheduled}
                    </Moment>
                  </h3>
                </div>
              ))
              :
              (<h1>Enter a stop ID to see arrivals</h1>)
            }
          </div>
          <img className="rail" src={rail} />
        </div>
      );
    }
  }
}

export default Arrival;
