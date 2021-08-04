import React, { Fragment } from "react";
import {
	Grid,
	Typography
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles( theme => ({
	creations: {
		backgroundColor: "#e8fbff",
		// width: '100vw',
		padding: theme.spacing(3)
	},
	fresh: {
		padding: theme.spacing(3)
	},
	title: {
		color: "#0095b3",
		fontWight: 500,
	},
	content: {
		color: "#888e8e",
		// width: '100vw',
		margin: theme.spacing(2, 0),
		fontWight: 400,
		maxWidth: "75%"
	},
	images: {
		width: "90%",
		height: "auto",
		maxWidth: 400
	}
}));

const ShowImage = () => {
	const classes = useStyles();

	return (
		<Fragment>
			<div className = { classes.creations }>
				<Grid
					container
					direction = 'row-reverse'
					justify = 'center'
					alignItems = 'center'
					alignContent = 'center'
				>
					<Grid
						item
						md = { 6 }
						xs = { 12 }
					>
						<Grid
							container
							direction = 'column'
							justify = 'flex-start'
							alignItems = 'flex-start'
							alignContent = 'flex-start'
						>
							<Typography variant = 'h2' className = { classes.title }>
								{"Creaciones con Lulis"}
							</Typography>
                            
							<Typography variant = 'h6' className = { classes.content }>
								{"¡Comparte tus recetas usando nuestros productos en casa!"}
							</Typography>
						</Grid>
					</Grid>
                    
					<Grid
						item
						md = { 6 }
						xs = { 12 }
					>
						<Grid
							container
							direction = 'column'
							justify = 'center'
							alignItems = 'center'
							alignContent = 'center'
						>
							<img
								src = 'https://firebasestorage.googleapis.com/v0/b/twg-rrhh.appspot.com/o/lulis-coockies%2Flulis-creatins.png?alt=media&token=fda3de27-b676-41cb-9e17-e73754cf7bd0'
								className = { classes.images }
							/>
						</Grid>
					</Grid>
				</Grid>
			</div>

			<div className = { classes.fresh }>
				<Grid
					container
					direction = 'row'
					justify = 'center'
					alignItems = 'center'
					alignContent = 'center'
				>
					<Grid
						item
						md = { 6 }
						xs = { 12 }
					>
						<Grid
							container
							direction = 'column'
							justify = 'flex-start'
							alignItems = 'flex-start'
							alignContent = 'flex-start'
						>
							<Typography variant = 'h2' className = { classes.title }>
								{"¡Fresh, calientito y de nuestro horno a tu casa! :)"}
							</Typography>
                            
							<Typography variant = 'h6' className = { classes.content }>
								{"ENTREGAS EL MISMO DÍA, SI HACES TU PEDIDO ANTES DE LAS 6:30 PM"}
							</Typography>
						</Grid>
					</Grid>
                    
					<Grid
						item
						md = { 6 }
						xs = { 12 }
					>
						<Grid
							container
							direction = 'column'
							justify = 'center'
							alignItems = 'center'
							alignContent = 'center'
						>
							<img
								src = 'https://firebasestorage.googleapis.com/v0/b/twg-rrhh.appspot.com/o/lulis-coockies%2Ffresh-lulis.png?alt=media&token=e0f7adcf-4511-424d-92a0-b291c56cd013'
								className = { classes.images }
							/>
						</Grid>
					</Grid>
				</Grid>
			</div>
		</Fragment>
	);
};

export default ShowImage;