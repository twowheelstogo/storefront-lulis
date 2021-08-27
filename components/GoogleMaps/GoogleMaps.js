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
	const {SearchBox, onMarkerChanged, setLocation} = props;
	const coords = props.places.length>0?{lat:props.places[0].geometry.location.lat(),lng:props.places[0].geometry.location.lng()}:props.location
		?{lat:props.location.latitude,lng:props.location.longitude}:{lat:14.598875943067759,lng:-90.5183146056873};
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
		{props.places.length>0 ?(props.places.map(({ place_id, formatted_address, geometry: { location } }) =>
			<Marker
				draggable={true}
				onDraggableChanged={(val) => console.log(val)}
				onDragEnd = {(obj) => { 
					const {latLng} = obj;
					const lat = latLng.lat();
					const lng = latLng.lng();
					const locationRef = {
						latitude: lat,
						longitude: lng 
					};
					onMarkerChanged({locationRef, setLocation});
				 }}
				position={{ lat: location.lat(), lng: location.lng() }}
				icon={{
					url: "https://firebasestorage.googleapis.com/v0/b/twowheelstogo-572d7.appspot.com/o/resources%2FEllipse%202marker.png?alt=media&token=a64d45fc-9721-4ef0-b128-4ee52aef42e8",
					scaledSize: new window.google.maps.Size(36,36)
				}}
			/>
		)):props.location && (
			<Marker
				draggable={true}
				onDraggableChanged={(val) => console.log(val)}
				onDragEnd = {(obj) => { 
					const {latLng} = obj;
					const lat = latLng.lat();
					const lng = latLng.lng();
					const locationRef = {
						latitude: lat,
						longitude: lng 
					};
					onMarkerChanged({locationRef, setLocation});
					 }}
				position={{ lat: props.location.latitude, lng: props.location.longitude }}
				icon={{
					url: "https://firebasestorage.googleapis.com/v0/b/twowheelstogo-572d7.appspot.com/o/resources%2FEllipse%202marker.png?alt=media&token=a64d45fc-9721-4ef0-b128-4ee52aef42e8",
					scaledSize: new window.google.maps.Size(36,36)
				}}
			/>
		)}
	</GoogleMap>;
}
);
export default GoogleMapComponent;