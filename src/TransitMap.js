import React, { Component } from 'react';
import Arrival from './Arrival.js';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';



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
        position={{ lat: position.lat, lng: position.lng}} />
    </GoogleMap>
  );
}));

export default TransitMap;