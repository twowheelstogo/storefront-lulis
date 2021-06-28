import React from "react";
import {withStyles} from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import PropTypes from "prop-types";
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import CssBaseline from '@material-ui/core/CssBaseline';
import { NavigationDesktop } from "components/NavigationDesktop";
import { NavigationMobile, NavigationToggleMobile } from "components/NavigationMobile";
import Hidden from "@material-ui/core/Hidden";
import Toolbar from "@material-ui/core/Toolbar";
import { toPairs } from "lodash";
import MiniCart from "components/MiniCart";
import AccountDropdown from "components/AccountDropdown";
import inject from "hocs/inject";

const styles = (theme)=>({
    root:{
        position:'fixed'
    },
    appBar:{
        background:'transparent'
    },
    scrolledAppBar:{
        background:'white',
        color:"#0095b3"
    },
    logo:{
        marginLeft: theme.spacing(1),
        width: 95,
        height: 'auto'
    },    
    controls: {
        alignItems: "inherit",
        display: "inherit",
        flex: 1
    },
    toolbar: {
        alignItems: "center",
        display: "flex",
        justifyContent: "space-between"
    },
    items:{

    },
    actions:{

    }
});
function ElevationScroll(props) {
    const { children, window,classes:{appBar,scrolledAppBar} } = props;
    // Note that you normally won't need to set the window ref as useScrollTrigger
    // will default to window.
    // This is only being set here because the demo is in an iframe.
    const trigger = useScrollTrigger({
      disableHysteresis: true,
      threshold: 0,
      target: window ? window() : undefined,
    });
  
    return React.cloneElement(children, {
      elevation: trigger ? 4 : 0,
      className: trigger ? scrolledAppBar:appBar
    });
  }
  
  ElevationScroll.propTypes = {
    children: PropTypes.element.isRequired,
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
  };
class MainHeader extends React.Component{
    handleNavigationToggleClick = () => {
    this.props.uiStore.toggleMenuDrawerOpen();
};

    render(){
        const {classes:{logo,controls,toolbar}} = this.props;
        return(
            <React.Fragment>
            <CssBaseline />
                   <ElevationScroll {...this.props}>
                   <AppBar position="fixed">
                    <Toolbar className={toolbar}>
                        <Hidden mdUp>
                                <NavigationToggleMobile onClick={this.handleNavigationToggleClick} />
                            </Hidden>
                    <img
                    // src = 'https://firebasestorage.googleapis.com/v0/b/twg-rrhh.appspot.com/o/company-logos%2Flulis-logo%20(2).png?alt=media&token=50e9772a-81c8-43d8-ba5d-29c70ed918c4'
                    src = 'https://firebasestorage.googleapis.com/v0/b/twowheelstogo-572d7.appspot.com/o/resources%2Fwhite_logo_with_background.png?alt=media&token=a6d8f959-79e7-4d2e-a588-e8655a6aa266'
                    className = { logo }
                />
                <div className={controls}>
                <Hidden xsDown initialWidth={"md"}>
                                    <NavigationDesktop />
                                </Hidden>
                </div>
                <AccountDropdown />
                            <MiniCart />
                    </Toolbar>
                    <NavigationMobile/>
                    </AppBar>
                   </ElevationScroll>
            </React.Fragment>
        )
    }
}
export default withStyles(styles)(inject("uiStore")(MainHeader));