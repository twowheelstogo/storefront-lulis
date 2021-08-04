import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import {
	Grid,
	Typography,
} from "@material-ui/core";
import MobileStepper from "@material-ui/core/MobileStepper";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles( theme => ({
	root: {
		width: "100%",
		height: "auto",
		padding: theme.spacing(3)
	},
	header: {
		display: "flex",
		alignItems: "center",
		height: 50,
		paddingLeft: theme.spacing(4),
		backgroundColor: theme.palette.background.default,
	},
	img: {
		maxHeight: "70vh",
		maxWidth: "95vw",
		overflow: "hidden",
		display: "block",
		width: "100%",
	},
}));

const images = [
	{
		url: "https://firebasestorage.googleapis.com/v0/b/twg-rrhh.appspot.com/o/lulis-coockies%2Fchocolate-eggs.png?alt=media&token=48a60c71-29f8-4d7c-bcd3-23415c8fd407"
	},
	{
		url: "https://firebasestorage.googleapis.com/v0/b/twg-rrhh.appspot.com/o/lulis-coockies%2Fbig-egg.png?alt=media&token=e31c4695-8ef9-4ed3-8c48-6348623e4e8f"
	},
	{
		url: "https://firebasestorage.googleapis.com/v0/b/twg-rrhh.appspot.com/o/lulis-coockies%2Foatmeal-eggs.jpg?alt=media&token=8cf13109-9eb9-4c2b-b08c-0790984bf672"  
	}
];

const Carousel = () => {
	const [ activeStep, setActiveStep ] = useState(0);
	const maxSteps = images.length;
	const classes = useStyles();

	const handleNextImage = () => {
		if (activeStep === maxSteps - 1) {
			setActiveStep(0);
		} else {
			setActiveStep(prevActiveStep => prevActiveStep + 1);
		}
	};

	const handlePreviousImage = () => {
		if (activeStep === 0 ) {
			setActiveStep( maxSteps - 1);
		} else {
			setActiveStep(prevActiveStep => prevActiveStep - 1);
		}
	};

	return (
		<Fragment>
			<Grid
				container
				direction = 'row'
				justify = 'center'
				alignItems = 'center'
				alignContent = 'center'
				className = { classes.root }
			>
				<Grid
					item
					md = { 12 }
				>
					<img 
						className = { classes.img }
						src = { images[activeStep].url }
					/>

					<MobileStepper
						steps = { maxSteps }
						position = 'static'
						variant = 'dots'
						activeStep = { activeStep }
						nextButton = {
							<Button
								size = 'small'
								onClick = { handleNextImage }
								// disabled = { activeStep === maxSteps - 1 }

							>
                                SIGUIENTE
							</Button>
						}
						backButton = {
							<Button
								size = 'small'
								onClick = { handlePreviousImage }
								disabled = { activeStep === -1 }
							>
                                ANTERIOR
							</Button>
						}
					/>
				</Grid>
			</Grid>
		</Fragment>
	);
};


export default Carousel;