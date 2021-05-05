import React from "react";
import { compose, withProps,lifecycle } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"
import hoistNonReactStatic from "hoist-non-react-statics";
import { withComponents } from "@reactioncommerce/components-context";
const enhance = compose(
    withProps({
      googleMapURL:
        "https://maps.googleapis.com/maps/api/js?key=AIzaSyBsbuaZ4GRNZkquHV2W2wyo9Zume7N_hzc&v=3.exp&libraries=geometry,drawing,places",
      loadingElement: <div style={{ height: `100%` }} />,
      containerElement: <div style={{ height: `400px` }} />,
      mapElement:<div style={{ height: `100%` }} />
    }),
    lifecycle({
      componentWillMount() {
        const refs = {};
  
        this.setState({
          places: [],
          onSearchBoxMounted: (ref) => {
            console.log("onSearchBoxMounted: ", ref);
            refs.searchBox = ref;
          },
          onPlacesChanged: () => {
            const places = refs.searchBox.getPlaces();
            console.log("onPlacesChanged: ", places);
            this.setState({
              places
            });
          }
        });
      }
    }),
    withScriptjs
  );
export default function withGoogleMaps(Component){
    function WithGoogleMap(props){
        const GoogleMapLayout = enhance(googleProps=>
            <Component
                {...props}
                googleProps={googleProps}
                />);
        return <GoogleMapLayout/>;
    }
    hoistNonReactStatic(WithGoogleMap,Component);
    return withComponents(WithGoogleMap);
};