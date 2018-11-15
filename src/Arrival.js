import React, { Component } from 'react';
import Moment from 'react-moment';
import './Arrival.css';
import TransitMap from './TransitMap.js';

// Material Styles
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';


const styles = {
  textField: {
    width: '100%',
    marginBottom: '1rem'
  },
  button: {
    width: '100%'
  }
}

class Arrival extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrival: [],
      error: null,
      stopId: ''
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.stopId !== prevProps.stopId) {
      this.setState({
        stopId: this.props.stopId
      });
      // TO DO:
      // Clear interval
      // clearInterval(this.intervalId);
    }
    // TO DO:
    // Check if stopId in the state or props has changed
    // if (this.state.stopId !== prevState.stopId ||
    //     this.props.stopId !== prevProps.stopId
      // ) {
      // Fetch location every 3.5 seconds
      // this.intervalId = setInterval(() => this.fetchArrivalTimes(), 3500);
    // }
  }

  // componentWillUnmount() {
  //   clearInterval(this.intervalId);
  // }


  // Fetch Arrivals when user submits the form
  fetchArrivalTimes = () => {
    const API_KEY = `${process.env.REACT_APP_TRIMET_KEY}`;
    fetch(`https://developer.trimet.org/ws/V1/arrivals?locIDs=${this.state.stopId}&appID=${API_KEY}&json=true`)
    .then(res => res.json())
    .then((res) => {
      // Filter arrivals array based on blockPosition to get lng and lat
      const arrivals = res.resultSet.arrival.filter(item => {
        if (item.hasOwnProperty('blockPosition')) return item
      });
      // Check filtered array and if empty means the bus is out of service and set error state
      if (!arrivals.length > 0) {
        this.setState({
          error: 'Sorry! This line is out of service for the evening.)'
        })
      }

      this.setState({
        isLoaded: true, 
        arrival: arrivals
      })
    })
    .catch(error => this.setState({ isLoaded: true, error: error.message }))
  }

  handleSubmit = event => {
    event.preventDefault()
    this.fetchArrivalTimes()
  }
    
  handleChange = ({ target: {name, value} }) => this.setState ({ [name] : value })

  render() {
    const { error, arrival, stopId } = this.state;
    const GOOGLE_API_KEY = `${process.env.REACT_APP_GOOGLEMAPS_KEY}`;
    
      return (
        <div className="arrival-container">
          <div className="arrival">
            <form onSubmit={this.handleSubmit}>
              <TextField
                label="Enter any Stop ID"
                value={stopId}
                name="stopId"
                onChange={this.handleChange}
                margin="normal"
                style={styles.textField}
              />
              <Button 
                variant="outlined"
                style={styles.button}
                type="submit"
                >
                Go
              </Button>
            </form>
            <Grid container spacing={8}>
            {arrival.length > 0
            ? arrival.map(({ estimated, shortSign, scheduled, blockPosition: { lng, lat } }) => (
            <Grid item xs={12} sm={12} md={6} lg={4} key={estimated}>
              <div  className="results">
                <h3>
                  <span>{shortSign}</span>
                  <span>
                    Scheduled:  
                    <Moment format="LT">
                      {scheduled}
                    </Moment>
                  </span>
                </h3>
                  <TransitMap
                    position={{ lng, lat }}
                    googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${GOOGLE_API_KEY}&v=3.exp&libraries=geometry,drawing,places`}
                    loadingElement={<div style={{ height: `100%` }} />}
                    containerElement={<div style={{ height: `400px`, width: `400px`, margin: `auto` }} />}
                    mapElement={<div style={{ height: `100%` }} />}
                  />
              </div>
            </Grid>
            ))
              :
              error && (<h3 style={{ margin: 'auto' }}>{error}</h3>)
            }
            </Grid>
          </div>
        </div>
      );
    }
  }


export default Arrival;
