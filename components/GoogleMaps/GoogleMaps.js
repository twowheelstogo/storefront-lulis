import React from "react";
import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker
  } from "react-google-maps";
  import _ from "lodash";

  const icon =[
    '<svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">',
    '< g filter="url(#filter0_d)" >',
    '<circle cx="21" cy="17" r="17" fill="#242356"/>',
    '<circle cx="21" cy="17" r="16" stroke="white" stroke-width="2"/>',
    '</g >',
  '<defs>',
    '<filter id="filter0_d" x="0" y="0" width="42" height="42" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">',
     '<feFlood flood-opacity="0" result="BackgroundImageFix" />',
      '<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />',
      '<feOffset dy="4" />',
      '<feGaussianBlur stdDeviation="2" />',
      '<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />',
      '<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow" />',
      '<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape" />',
    '</filter>',
  '</defs>',
    '</svg>'
  ].join('\n');
  const GoogleMapComponent = withGoogleMap(props =>
    {
      const {SearchBox} = props;
      const coords = props.places.length>0?{lat:props.places[0].geometry.location.lat(),lng:props.places[0].geometry.location.lng()}:{lat:14.598875943067759,lng:-90.5183146056873}
      return <GoogleMap
      defaultZoom={14}
      center={coords}
      ref = {props.onMapMounted}
      defaultOptions ={{
        mapTypeControl:false
      }}
    >
      {SearchBox && React.cloneElement(SearchBox,{
        controlPosition: google.maps.ControlPosition.TOP_LEFT
      })}
      {props.places!=undefined &&(props.places.map(({ place_id, formatted_address, geometry: { location } }) =>
      <Marker
      position={{ lat: location.lat(), lng: location.lng() }}
      icon={{
        url: 'https://firebasestorage.googleapis.com/v0/b/twowheelstogo-572d7.appspot.com/o/resources%2FEllipse%202marker.png?alt=media&token=a64d45fc-9721-4ef0-b128-4ee52aef42e8',
        scaledSize: new window.google.maps.Size(36,36)
      }}
    />
    ))}
    </GoogleMap>
    }
  );
  console.log('data:image/svg+xml;utf8,' + encodeURIComponent(icon))
  export default GoogleMapComponent;