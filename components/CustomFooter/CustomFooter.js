import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { Grid, IconButton } from "@material-ui/core";
import styled from "styled-components";
import Divider from "@material-ui/core/Divider";
import Hidden from "@material-ui/core/Hidden";
import { Facebook as FacebookIcon, Instagram as InstagramIcon, WhatsApp as WhatsAppIcon } from "@material-ui/icons";
import Link from "components/Link";

const date = new Date();
const styles = (theme) => ({
	root: {
		background: theme.palette.primary.main,
		paddingLeft: theme.spacing(2),
		paddingRight: theme.spacing(2),
		paddingTop: theme.spacing(10),
		paddingBottom: theme.spacing(5),
		color: "white"
	},
	main: {
		flex: "1 1 auto",
		maxWidth: theme.layout.mainContentMaxWidth,
		marginLeft: "auto",
		marginRight: "auto",
		// background:theme.palette.primary.light
	},
	items: {
		display: "flex",
		flexDirection: "column",
		gap: "20px",
	},
	divider: {
		color: "white",
		background: "white",
		opacity: "50%"
	},
	bottomItems: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
		paddingBottom: theme.spacing(2),
		paddingTop: theme.spacing(1)
	},
	copyright: {
		alignItems: "center",
		display: "flex",
		justifyContent: "center",
		marginBottom: theme.spacing(2),
		opacity: "50%"
	},
	flexItems: {
		display: "flex",
		flexDirection: "row",
		gap: "10px"
	},
	flexIcons: {
		display: "flex",
		flexDirection: "row",
		gap: "5px",
		opacity: "75%"
	}
});
const CustomTitle = styled.div`
    font-size:16px;
    font-weight:700;
`;
const CustomItem = styled.div`
    font-size:14px;
    font-weight:400;
    opacity: 50%;
`;
const CustomFooter = props => {
	const { classes } = props;
	const goToPage = (url) => {
		window.open(url, "_blank").focus();
	}
	return (
		<React.Fragment>
			<br></br>
			<br></br>
			<div className={classes.root}>
				<div className={classes.main}>
					<Grid
						container
						direction="row"
						alignItems="flex-start"
						spacing={2}>
						<Grid item xs={12}
							md={3}>
							<img src={imageUrl} width={"130px"} />
						</Grid>
						<Grid item xs={12} md={3} className={classes.items}>
							<CustomTitle>{"Contacto"}</CustomTitle>
							<CustomItem>{"+502 4548 5624"}</CustomItem>
							<CustomItem>{"20 calle 24-26 bodega 15 zona 10 Ofibodegas Pradera"}</CustomItem>
							<CustomItem>{"Lunes- Sábado: 8am - 8pm"}</CustomItem>
							<CustomItem>{"Domingo: 10am - 8pm"}</CustomItem>
						</Grid>
						<Grid item xs={12} md={3} className={classes.items}>
							<CustomTitle>{"Empresa"}</CustomTitle>
							<Link href="/about">
								<CustomItem>{"Sobre Nosotros"}</CustomItem>
							</Link>
							<Hidden mdUp>
								<Link href="/politics">
									<CustomItem>{"Políticas de Devolución"}</CustomItem>
								</Link>
								<Link href="/terms">
									<CustomItem>{"Términos y Condiciones"}</CustomItem>
								</Link>
							</Hidden>
						</Grid>
					</Grid>
					<br></br>
					<Divider className={classes.divider} />
					<div className={classes.bottomItems}>
						<div className={classes.flexIcons}>
						<IconButton color="inherit" size="small"
							onClick = {()=> goToPage("https://www.instagram.com/lulis.gt/")}
						>
								<InstagramIcon />
							</IconButton>
							<IconButton color="inherit" size="small"
							onClick = {()=> goToPage("https://www.facebook.com/LulisGourmetTreats")}>
								<FacebookIcon />
							</IconButton>
							<IconButton color="inherit" size="small"
							onClick = {()=> goToPage("https://wa.me/50245485624")}>
								<WhatsAppIcon />
							</IconButton>
						</div>
						<div className={classes.flexItems}>
							<Hidden xsDown>
								<Link href="/politics">
									<CustomItem>{"Políticas de Devolución"}</CustomItem>
								</Link>
								<Link href="/terms">
									<CustomItem>{"Términos y Condiciones"}</CustomItem>
								</Link>
							</Hidden>
						</div>
					</div>
					<div className={classes.copyright}>
						<small>&copy; {date.getFullYear()} Lulis GT</small>
					</div>
				</div>
			</div>
		</React.Fragment>
	);
};
const imageUrl = "https://firebasestorage.googleapis.com/v0/b/twowheelstogo-572d7.appspot.com/o/resources%2FArtboard%201.png?alt=media&token=d217eb7f-efbe-4519-8bfa-1130b1725331";
export default withStyles(styles)(CustomFooter);