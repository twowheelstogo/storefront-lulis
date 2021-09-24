import React from "react";
import {
	withScriptjs,
	withGoogleMap,
	GoogleMap,
	Marker
} from "react-google-maps";
import _ from "lodash";

const GoogleMapComponent = withGoogleMap(props => {
	const { SearchBox, onMarkerChanged } = props;
	const coords = { lat: props.locationRef.latitude, lng: props.locationRef.longitude };
	return <GoogleMap
		defaultZoom={14}
		center={coords}
		ref={props.onMapMounted}
		defaultOptions={{
			mapTypeControl: false
		}}
	>
		{SearchBox && React.cloneElement(SearchBox, {
			controlPosition: google.maps.ControlPosition.TOP_LEFT
		})}
		<Marker
			draggable={true}
			onDragEnd={async (obj) => {
				const { latLng } = obj;
				const lat = latLng.lat();
				const lng = latLng.lng();
				const locationRef = {
					latitude: lat,
					longitude: lng
				};
				onMarkerChanged(locationRef, props.accessToken);
			}}
			position={coords}

		/>
	</GoogleMap>;
}
);
export default GoogleMapComponent;