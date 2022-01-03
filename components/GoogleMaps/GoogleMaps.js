import React, { useState } from "react";
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";
import _ from "lodash";

const GoogleMapComponent = withGoogleMap((props) => {
  const { SearchBox, onMarkerChanged } = props;
  const coords = { lat: props.locationRef.latitude, lng: props.locationRef.longitude };
  const imageLocation = {
    scaledSize: 36,
    url: "https://firebasestorage.googleapis.com/v0/b/twowheelstogo-572d7.appspot.com/o/resources%2FEllipse%202marker.png?alt=media&token=a64d45fc-9721-4ef0-b128-4ee52aef42e8",
  };
  const [image, setImage] = useState(
    imageLocation
    // {
    // scaledSize: 60,
    // url: "https://thumbs.gfycat.com/InexperiencedGlossyAsiaticgreaterfreshwaterclam-size_restricted.gif",
    // }
  );
  return (
    <GoogleMap
      defaultZoom={14}
      center={coords}
      ref={props.onMapMounted}
      defaultOptions={{
        mapTypeControl: false,
      }}
    >
      {SearchBox &&
        React.cloneElement(SearchBox, {
          controlPosition: google.maps.ControlPosition.TOP_LEFT,
        })}
      <Marker
        draggable={true}
        // onDragStart={() => {
        //   setImage(imageLocation);
        // }}
        onDragEnd={async (obj) => {
          const { latLng } = obj;
          const lat = latLng.lat();
          const lng = latLng.lng();
          const locationRef = {
            latitude: lat,
            longitude: lng,
          };
          onMarkerChanged(locationRef, props.authStore.accessToken);
          // setImage(imageLocation);
        }}
        position={coords}
        icon={{
          url: image.url,
          scaledSize: new window.google.maps.Size(image.scaledSize, image.scaledSize),
        }}
      />
    </GoogleMap>
  );
});

export default GoogleMapComponent;
