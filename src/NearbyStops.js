import React, { Component } from 'react';
import { geolocated } from 'react-geolocated';

import { withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


const styles = theme => ({
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 300
  }
});


class NearbyStops extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: [],
      error: null,
      desc: '',
      locid: ''
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

  onHandleChange = event => {
    this.props.handleChange(event);
  };

  render() {
    const { error, location, desc, locid } = this.state;
    const { classes } = this.props;
    // console.log(this.state);
    console.log(this.props);
    
    return (
      <div className="stop-container">
        <div className="input-field col s12">
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor='stop-id'>Choose a Stop ID</InputLabel>
          <Select
            value={this.props.locid}
            onChange={this.onHandleChange}
            inputProps={{
              name: 'locid',
              id: 'stop-id'
            }}
          >
            {location.length > 0
            ? location.map(({ desc, locid, lat }) => (
              <MenuItem key={lat} value={locid} className="nearby-results">
                {desc + ' '}
                {locid}
              </MenuItem>
            ))
            : (<MenuItem value="">No location found</MenuItem>)
            
          }
          </Select>
        </FormControl>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(geolocated({
  positionOptions: {
    enableHighAccuracy: false,
    maximumAge: 0
  },
  userDecisionTimeout: null
})(NearbyStops));