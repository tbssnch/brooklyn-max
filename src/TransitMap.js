import React, { Component } from 'react';
import Arrival from './Arrival.js';
import './TransitMap.css';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import TrimetIcon from './assets/trimet-icon.png';



const TransitMap = withScriptjs(withGoogleMap((props) => {
  const { position } = props;
  
  return (
    <GoogleMap
      defaultZoom={14}
      center={{ lat: position.lat, lng: position.lng}}>
      {/* <Arrival
        location={{lat: position.lat, lng: position.lng}}
          /> */}
      <Marker 
        defaultSize={10}
        position={{ lat: position.lat, lng: position.lng}}
        icon={TrimetIcon} />
    </GoogleMap>
  );
}));

export default TransitMap;