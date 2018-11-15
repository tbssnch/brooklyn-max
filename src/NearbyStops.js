import React, { Component } from 'react';
import { geolocated } from 'react-geolocated';
import './NearbyStops.css';

// Material styles
import { withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const styles = theme => ({
  root: {
    display: 'block',
    margin: '0 auto',
    width: '300px'
  },
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
    const { classes, coords } = this.props;
    
    return (
      <div className="stop-container">
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor='stop-id'>Locate Nearby Stops</InputLabel>
          <Select
            value={this.props.locid}
            onChange={this.onHandleChange}
            classes={{
              root: classes.root
            }}
            inputProps={{
              name: 'locid',
              id: 'stop-id'
            }}
          >
            {location.length > 0
            ? location.map(({ desc, locid, lat, dir }) => (
              <MenuItem key={lat} value={locid} className="nearby-results">
                {`${desc} ${dir} ${locid}`}
              </MenuItem>
            ))
            : (<MenuItem value="">Locating nearby stops...</MenuItem>)
          }
          </Select>
        </FormControl>
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