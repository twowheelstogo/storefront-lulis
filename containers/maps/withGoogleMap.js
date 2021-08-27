import React from "react";
import { compose, withProps,withHandlers,withState } from "recompose";
import { withScriptjs } from "react-google-maps";
import hoistNonReactStatic from "hoist-non-react-statics";
import { withComponents } from "@reactioncommerce/components-context";
const enhance = compose(
	withProps({
		googleMapURL:
        "https://maps.googleapis.com/maps/api/js?key=AIzaSyBsbuaZ4GRNZkquHV2W2wyo9Zume7N_hzc&v=3.exp&libraries=geometry,drawing,places",
		loadingElement: <div style={{ height: "100%" }} />,
		containerElement: <div style={{ height: "100%" }} />,
		mapElement:<div style={{ height: "100%" }} />
	}),
	withState("refs","setRefs",{}),
	withState("locationRef","setLocation",""),
	withState("places","setPlaces",[]),
	withHandlers({
		onSearchBoxMounted:({setRefs})=> (ref) => {
			setRefs(prev=>({
				...prev,
				searchBox:ref
			}));
		},
		onMapMounted:(({setRefs})=>ref=>{
			setRefs(prev=>({
				...prev,
				map:ref
			}));
		}),
		onPlacesChanged:({setPlaces,setLocation,refs})=> () => {
			const places = refs.searchBox.getPlaces();
			setPlaces(places);
			const locationRef = {
				latitude: places[0].geometry.location.lat(),
				longitude: places[0].geometry.location.lng() 
			};
			setLocation(locationRef);
		},
		onMarkerChanged:({locationRef, setLocation})=> () => {
			setLocation(locationRef);
		}
	}),
	withScriptjs
);
export default function withGoogleMaps(Component){
	const WithGoogleMap = React.forwardRef((props,ref)=>{
		const GoogleMapLayout = enhance(googleProps=>
			<Component
				ref={ref}
				{...props}
				googleProps={googleProps}
			/>);
		return <GoogleMapLayout/>;
	});
	hoistNonReactStatic(WithGoogleMap,Component);
	return withComponents(WithGoogleMap);
}