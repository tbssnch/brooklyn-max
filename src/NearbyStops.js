import React, { Component } from 'react';
import { geolocated } from 'react-geolocated';


class NearbyStops extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: [],
      error: null,
      desc: '',
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.coords !== prevProps.coords) {
      this.fetchNearbyStops();
    }
  }

  fetchNearbyStops = () => {
    const API_KEY = `${process.env.REACT_APP_TRIMET_KEY}`;
    const { coords } = this.props;
    if(coords) {
      console.log("if");
      fetch(`https://developer.trimet.org/ws/V1/stops?json=true&appID=${API_KEY}&ll=${coords.latitude}, ${coords.longitude}&feet=1000`)
      .then(res => res.json())
      .then((res) => this.setState({
        isLoaded: true,
        location: res.resultSet.location
      }))
      .catch(error => this.setState(
        {isLoaded: true, error}))
      } else {
        console.log("else");
        alert("Location is not available")
    }
  }

  render() {
    const { error, location, desc} = this.state;
    // console.log(this.state);
    console.log(this.props);
    return (
      <div className="stop-container">
      {location.length > 0
      ? location.map(({ desc, dir }) => (
        <div key={dir} className="nearby-results">
          <h3>{desc}</h3>
        </div>
      ))
      :
      (<h1>Location unavailable</h1>)
    }
        
      </div>
    );
  }
}

export default geolocated({
  positionOptions: {
    enableHighAccuracy: false,
    maximumAge: 0
  },
  userDecisionTimeout: null
})(NearbyStops);