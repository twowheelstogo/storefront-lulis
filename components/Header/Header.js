import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import inject from "hocs/inject";
import AppBar from "@material-ui/core/AppBar";
import Hidden from "@material-ui/core/Hidden";
import  IconButton from "@material-ui/core/IconButton";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import { NavigationDesktop } from "components/NavigationDesktop";
import { NavigationMobile, NavigationToggleMobile } from "components/NavigationMobile";
import LocaleDropdown from "components/LocaleDropdown";
import AccountDropdown from "components/AccountDropdown";
import MenuIcon from "@material-ui/icons/Menu";
import ShopLogo from "@reactioncommerce/components/ShopLogo/v1";
import Link from "components/Link";
import MiniCart from "components/MiniCart";

const styles = (theme) => ({
    appBar: {
        backgroundColor: theme.palette.reaction.white,
        borderBottom: `solid 1px ${theme.palette.reaction.black05}`,
        color: theme.palette.reaction.coolGrey500
    },
        controls: {
        alignItems: "inherit",
        display: "inherit",
        flex: 1
    },
    title: {
        color: theme.palette.reaction.reactionBlue,
        marginRight: theme.spacing(),
        borderBottom: `solid 5px ${theme.palette.reaction.reactionBlue200}`
    },
    toolbar: {
        alignItems: "center",
        display: "flex",
        justifyContent: "space-between"
    },
    titleHeader: {
    },
    orderBefore: {
        backgroundColor: '#95d2de',
        width: '100%',
        padding: theme.spacing(1, 2)
    },
    whiteTxt: {
        textTransform: 'uppercase',
        textAlign: 'center',
        color: '#ffffff',
        textWeight: 800
    },
    logo: {
        margin: theme.spacing(1),
        width: 75,
        height: 'auto'
    },
    letters: {
        margin: theme.spacing(1),
        width: 128,
        height: 'auto'
    },
    menuButton: {
        marginRight: theme.spacing(2),
      },

});

class Header extends Component {
    static propTypes = {
        classes: PropTypes.object,
        shop: PropTypes.shape({
            name: PropTypes.string.isRequired
        }),
        uiStore: PropTypes.shape({
            toggleMenuDrawerOpen: PropTypes.func.isRequired
        }).isRequired,
        viewer: PropTypes.object
    };

    static defaultProps = {
        classes: {}
    };

    handleNavigationToggleClick = () => {
        this.props.uiStore.toggleMenuDrawerOpen();
    };

    render() {
        const { classes: { appBar, controls, toolbar, title, titleHeader, orderBefore, whiteTxt, logo, letters,menuButton }, shop } = this.props;

        return (
            <Fragment>
                <div className = { orderBefore }>
                    <Typography variant = 'subtitle1' className = { whiteTxt }>
                        <strong>ENTREGAS EL MISMO DÍA, SI HACES TU PEDIDO ANTES DE LAS 8:00 PM</strong>
                    </Typography>
                </div>

                <div className = { titleHeader }>
                    <AppBar position="static" elevation={0} className={appBar}>
                        <Toolbar className={toolbar}>
                            <Hidden mdUp>
                                <NavigationToggleMobile onClick={this.handleNavigationToggleClick} />
                            </Hidden>
                            <IconButton edge="start" className={menuButton} color="inherit" aria-label="menu">
                            <MenuIcon />
                        </IconButton>
                            <Link route="/">
                                <img
                                    // src = 'https://firebasestorage.googleapis.com/v0/b/twg-rrhh.appspot.com/o/company-logos%2Flulis-logo%20(2).png?alt=media&token=50e9772a-81c8-43d8-ba5d-29c70ed918c4'
                                    src = 'https://firebasestorage.googleapis.com/v0/b/twg-rrhh.appspot.com/o/company-logos%2Flulis-logo.png?alt=media&token=891d79ae-57a0-48f7-bc09-8e757e77af34'
                                    className = { logo }
                                />
                            </Link>

                            <div className={controls}>
                                {/* <Typography className={title} color="inherit" variant="h6">
                                    <Link route="/">
                                        {shop ? <ShopLogo shopName={shop.name} /> : "Example Storefront"}
                                    </Link>
                                </Typography> */}

                                <Hidden xsDown initialWidth={"md"}>
                                    <NavigationDesktop />
                                </Hidden>
                            </div>

                            {/* <LocaleDropdown /> */}

                            <AccountDropdown />
                            <MiniCart />
                        </Toolbar>
                        
                        <NavigationMobile />
                    </AppBar>
                </div>
            </Fragment>
        );
    }
}

export default withStyles(styles)(inject("uiStore")(Header));
