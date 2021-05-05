import React from "react";
import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker
  } from "react-google-maps";
  import _ from "lodash";

  const GoogleMapComponent = withGoogleMap(props =>
    {
      const coords = props.places.length>0?{lat:props.places[0].geometry.location.lat(),lng:props.places[0].geometry.location.lng()}:{lat:14.598875943067759,lng:-90.5183146056873}
      return <GoogleMap
      defaultZoom={14}
      center={coords}
    >
      {props.places!=undefined &&(props.places.map(({ place_id, formatted_address, geometry: { location } }) =>
      <Marker
      position={{ lat: location.lat(), lng: location.lng() }}
    />
    ))}
    </GoogleMap>
    }
  );
  export default GoogleMapComponent;