import React, { Component } from 'react';
import Moment from 'react-moment';
import logo from './assets/transit-logo.png';
import rail from './assets/rail.png';
import './Arrival.css';

class Arrival extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      arrival: []
    };
  }


  componentDidMount() {
    const API_KEY = `${process.env.REACT_APP_TRIMET_KEY}`;
    fetch("https://developer.trimet.org/ws/V1/arrivals?locIDs=13726,13713&appID=0BD1DE92EE497EA57B0C32698&json=true")
      .then(res => res.json())
      .then(
        (resultSet) => {
          console.log(resultSet);
          this.setState({
            isLoaded: true,
            arrival: resultSet.resultSet.arrival
          });
          console.log(this.state);
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        })
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
            {arrival.map(arrival => (
              <div className="results">
                <h3>{arrival.shortSign}</h3>
                <h3>
                  <Moment format="LT">
                    {arrival.scheduled}
                  </Moment>
                </h3>
              </div>
            ))}
          </div>
          <img className="rail" src={rail} />
        </div>
      );
    }
  }
}

export default Arrival;
