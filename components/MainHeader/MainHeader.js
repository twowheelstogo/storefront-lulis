import React from "react";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import PropTypes from "prop-types";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import CssBaseline from "@material-ui/core/CssBaseline";
import { NavigationDesktop } from "components/NavigationDesktop";
import { NavigationMobile, NavigationToggleMobile } from "components/NavigationMobile";
import Hidden from "@material-ui/core/Hidden";
import Toolbar from "@material-ui/core/Toolbar";
import { toPairs } from "lodash";
import MiniCart from "components/MiniCart";
import AccountDropdown from "components/AccountDropdown";
import inject from "hocs/inject";
import Link from "components/Link";
import { IconButton } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import Router from "translations/i18nRouter";
import styled from "styled-components";
import CloseIcon from "@material-ui/icons/Close";

const styles = (theme) => ({
	root: {
		position: "fixed"
	},
	appBar: {
		background: "transparent"
	},
	scrolledAppBar: {
		background: "white",
		color: "#000000",
		borderBottom: "1px solid #f1f1f1"
	},
	logo: {
		// marginLeft: theme.spacing(1),
		width: "auto",
		height: "70px"
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
	items: {

	},
	actions: {

	},
	orderBefore: {
		backgroundColor: "#95d2de",
		width: "100%",
		padding: theme.spacing(1, 2)
	},
	whiteTxt: {
		textTransform: "uppercase",
		textAlign: "center",
		color: "#ffffff",
		textWeight: 800
	},
	closeAlert: {
		color: "white"
	}
});
function ElevationScroll(props) {
	const { children, window, classes: { appBar, scrolledAppBar } } = props;
	// Note that you normally won't need to set the window ref as useScrollTrigger
	// will default to window.
	// This is only being set here because the demo is in an iframe.
	const trigger = useScrollTrigger({
		disableHysteresis: true,
		threshold: 0,
		target: window ? window() : undefined,
	});

	return React.cloneElement(children, {
		elevation: 0,
		className: trigger ? scrolledAppBar : appBar
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

class MainHeader extends React.Component {

	
	handleNavigationToggleClick = () => {
		this.props.uiStore.toggleMenuDrawerOpen();
	};
	handleSearch = () => {
		Router.push("/product/search");
	}

	render() {
		const { classes: { logo, controls, toolbar, scrolledAppBar, closeAlert }, noScrollAction, cart } = this.props;
		if (noScrollAction) return (
			<React.Fragment>
				<CssBaseline />
				<AppBar position="fixed" className={scrolledAppBar} elevation={0}>
					<Toolbar className={toolbar}>
						<Hidden mdUp>
							<NavigationToggleMobile onClick={this.handleNavigationToggleClick} />
						</Hidden>
						<Link route="/" className={logo}>
							<img
								src='https://firebasestorage.googleapis.com/v0/b/twowheelstogo-572d7.appspot.com/o/resources%2FArtboard%201.png?alt=media&token=d217eb7f-efbe-4519-8bfa-1130b1725331'
								className={logo}
							/>
						</Link>
						<div className={controls}>
							<Hidden xsDown initialWidth={"md"}>
								<NavigationDesktop />
							</Hidden>
						</div>
						<IconButton color="inherit" onClick={this.handleSearch}>
							<SearchIcon />
						</IconButton>
						<AccountDropdown />
						<MiniCart {...cart} />
					</Toolbar>
					<NavigationMobile />
				</AppBar>
			</React.Fragment>
		);
		return (
			<React.Fragment>
				<CssBaseline />
				<ElevationScroll {...this.props}>
					<AppBar position="fixed">
						<Toolbar className={toolbar}>
							<Hidden mdUp>
								<NavigationToggleMobile onClick={this.handleNavigationToggleClick} />
							</Hidden>
							<Link route="/" className={logo}>
								<img
									src='https://firebasestorage.googleapis.com/v0/b/twowheelstogo-572d7.appspot.com/o/resources%2FArtboard%201.png?alt=media&token=d217eb7f-efbe-4519-8bfa-1130b1725331'
									className={logo}
								/>
							</Link>
							<div className={controls}>
								<Hidden xsDown initialWidth={"md"}>
									<NavigationDesktop />
								</Hidden>
							</div>
							{/* <LocaleDropdown /> */}
							<IconButton color="inherit" onClick={this.handleSearch}>
								<SearchIcon />
							</IconButton>
							<AccountDropdown />
							<MiniCart {...cart} />
						</Toolbar>
						<NavigationMobile />
					</AppBar>
				</ElevationScroll>
			</React.Fragment>
		);
	}
}
export default withStyles(styles)(inject("uiStore")(MainHeader));