import React, { Component } from "react";
import PropTypes from "prop-types";
import Router from "translations/i18nRouter";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import GuestForm from "@reactioncommerce/components/GuestForm/v1";
import Button from "@reactioncommerce/components/Button/v1";

// flex wrapper jss mixin
const flexWrapper = () => ({
	alignItems: "stretch",
	display: "flex",
	flexDirection: "column",
	justifyContent: "flex-start"
});

const styles = (theme) => ({
	loginWrapper: {
		...flexWrapper(),
		paddingBottom: theme.spacing(8),
		[theme.breakpoints.up("md")]: {
			minHeight: "400px",
			paddingBottom: 0,
			paddingRight: theme.spacing(8)
		}
	},
	loginButton: {
		marginTop: theme.spacing(2),
		background: "black",
		border: "none"
	},
	signupButton: {
		marginTop: theme.spacing(2),
	},
	guestWrapper: {
		...flexWrapper(),
		borderTop: `solid 1px ${theme.palette.reaction.black10}`,
		paddingTop: theme.spacing(8),
		[theme.breakpoints.up("md")]: {
			borderLeft: `solid 1px ${theme.palette.reaction.black10}`,
			borderTop: "none",
			paddingLeft: theme.spacing(8),
			paddingTop: 0
		}
	}
});

class Entry extends Component {
	static propTypes = {
		classes: PropTypes.object,
		onLoginButtonClick: PropTypes.func,
		onRegisterButtonClick: PropTypes.func,
		setEmailOnAnonymousCart: PropTypes.func,
		theme: PropTypes.object
	};

	static defaultProps = {
		onLoginButtonClick() {
			Router.push("/signin");
		},
		onRegisterButtonClick() {
			window.location.href = "/signup";
		},
		setEmailOnAnonymousCart() { }
	};

	render() {
		const { classes, onLoginButtonClick, onRegisterButtonClick, setEmailOnAnonymousCart } = this.props;
		return (
			<Grid container>
				<Grid item xs={12}>
					<div className={classes.loginWrapper}>
						<Typography variant="h6" gutterBottom>
							Registrate o inicia Sesión
						</Typography>
						<Button onClick={onLoginButtonClick} actionType="important" isFullWidth className={classes.loginButton} color="secondary">
							Iniciar Sesión
						</Button>
						<Button onClick={onRegisterButtonClick} actionType="secondary" isFullWidth className={classes.signupButton}>
							Crear cuenta
						</Button>
					</div>
				</Grid>
			</Grid>
		);
	}
}

export default withStyles(styles, { withTheme: true })(Entry);
