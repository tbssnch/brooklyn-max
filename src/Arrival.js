import React, { Component } from 'react';
import Moment from 'react-moment';
import logo from './assets/transit-logo.png';
import rail from './assets/rail.png';

import TransitMap from './TransitMap.js';
import './Arrival.css';


class Arrival extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrival: [],
      error: null,
      stopId: '',
      position: {
        lng: '',
        lat: ''
      }
    };
    console.log(this.state)
  }

    fetchArrivalTimes = () => {
      console.log("HEY")
      const API_KEY = `${process.env.REACT_APP_TRIMET_KEY}`;
      fetch(`https://developer.trimet.org/ws/V1/arrivals?locIDs=${this.state.stopId}&appID=${API_KEY}&json=true`)
      .then(res => res.json())
      .then((res) => this.setState({
        isLoaded: true, 
        arrival: res.resultSet.arrival, 
        position: { 
          lng: res.resultSet.arrival[0].blockPosition.lng, 
          lat: res.resultSet.arrival[0].blockPosition.lat
        }
      }))
      .catch(error => this.setState({isLoaded: true, error}))
    }


  handleChange = ({ target: {name, value} }) => this.setState ({ [name] : value })

  handleSubmit = event => {
    event.preventDefault()
    this.fetchArrivalTimes()
  }

  render() {
    const { error, arrival, stopId, position } = this.state;
    console.log(this.state.stopId)
    if (error) return <div>Error: {error.message}</div>

      return (
        <div className="arrival-container">
          <div className="arrival">
            <img className="logo" src={logo} />
            <form onSubmit={this.handleSubmit}>
              <input
                type="text"
                placeholder="Stop ID"
                onChange={this.handleChange}
                value={stopId}
                name="stopId" />
              <input type="submit" value="Submit" />
            </form>
            {arrival.length > 0 
            ? arrival.map(({ estimated, shortSign, scheduled }) => (
              <div key={estimated} className="results">
                <h3>{shortSign}</h3>
                <h3>
                  Scheduled:  
                  <Moment format="LT">
                    {scheduled}
                  </Moment>
                  <TransitMap
                      position={position}
                      googleMapURL={`https://maps.googleapis.com/maps/api/js?key=AIzaSyDcB-Hvjon7joaUK_-yOHUmvZzDHnq6Yls&v=3.exp&libraries=geometry,drawing,places`}
                      loadingElement={<div style={{ height: `100%` }} />}
                      containerElement={<div style={{ height: `600px`, width: `600px` }} />}
                      mapElement={<div style={{ height: `100%` }} />}
                    />
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


export default Arrival;
