import React, { Component } from 'react';
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
    fetch("https://developer.trimet.org/ws/V1/arrivals?locIDs=13726&appID=0BD1DE92EE497EA57B0C32698&json=true")
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
        }
      )
  }

  render() {
    const { error, isLoaded, arrival } = this.state;
    if (error) {
      return <div>Error: {error.message} </div>;
    } else if (!isLoaded) {
      return <div>Gimme a sec...</div>;
    } else {
      return (
        <ul>
          {arrival.map(arrival => (
            <li key={arrival.scheduled}>
              {arrival.shortSign} {arrival.scheduled}
            </li>
        ))}
        </ul>
      );
    }

  }
}

export default Arrival;
