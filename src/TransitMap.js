import React, { Component } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import TrimetIcon from './assets/trimet-icon.png';

const TransitMap = withScriptjs(
  withGoogleMap(
    ({ position: { lng, lat } }) => (
      <GoogleMap
        key={lat}
        defaultZoom={14}
        center={{ lat, lng }}
      >
        <Marker 
          defaultSize={10}
          position={{ lat, lng }}
          icon={TrimetIcon} 
        />
      </GoogleMap>
    )
  )
);

export default TransitMap;