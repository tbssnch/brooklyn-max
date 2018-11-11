import React, { Component } from 'react';


class NearbyStops extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: [],
      error: null,
      desc: '',
    };
  }

  componentDidMount() {
    this.fetchNearbyStops();
  }

  fetchNearbyStops = () => {
    const API_KEY = `${process.env.REACT_APP_TRIMET_KEY}`;
    fetch(`https://developer.trimet.org/ws/V1/stops?json=true&appID=${API_KEY}&ll=45.498961, -122.656801&feet=1000`)
    .then(res => res.json())
    .then((res) => this.setState({
      isLoaded: true,
      location: res.resultSet.location
    }))
    .catch(error => this.setState(
      {isLoaded: true, error}))
  }

  render() {
    const { error, location, desc} = this.state;
    console.log(this.state);
    return (
      <div className="stop-container">
      {location.length > 0
      ? location.map(({ desc, dir }) => (
        <div key={dir} className="nearby-results">
          <h3>{desc}</h3>
        </div>
      ))
      :
      (<h1>Test</h1>)
    }
        
      </div>
    );
  }
}

export default NearbyStops;