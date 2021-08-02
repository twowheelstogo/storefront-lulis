import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { withStyles, makeStyles } from "@material-ui/core/styles";
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
		// padding: theme.spacing(3)
	},
	img: {
		// maxHeight: '70vh',
		maxWidth: "70vw",
		// overflow: 'hidden',
		// display: 'block',
		// width: '100%',
	},
	carouselButton: {
		marginRight: "5vw",
		marginLeft: "5vw"
	},
	title: {
		color: "#0095b3",
		fontWight: 500,
		marginBottom: theme.spacing(2),
		marginTop: "10vh",
		marginBottom: "10vh"
	}
}));

const images = [
	{
		url: "https://cdn.shopify.com/s/files/1/0471/9814/2623/files/1._Sweet_3x_1e0d2b53-aa7a-4990-ae0b-28aac27c366e.png?v=1599843433"
	},
	{
		url: "https://cdn.shopify.com/s/files/1/0471/9814/2623/files/2._Salty_3x_37b3eacd-9cfa-4c84-896e-8a852a6b580c.png?v=1599843466"
	},
	{
		url: "https://cdn.shopify.com/s/files/1/0471/9814/2623/files/3._Cookie_dough_3x_895e2bcf-7c98-4a36-b73d-45a28e26b89d.png?v=1599843497"
	}
];

const CareCarousel = () => {
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
				direction = 'column'
				justify = 'center'
				alignItems = 'center'
				alignContent = 'center'
				className = { classes.root }
			>
				<Typography variant = 'h3' className = { classes.title}>
                    LULIS-CARE
				</Typography>

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
							className = { classes.carouselButton }

						>
                            SIGUIENTE
						</Button>
					}
					backButton = {
						<Button
							size = 'small'
							onClick = { handlePreviousImage }
							disabled = { activeStep === -1 }
							className = { classes.carouselButton }
						>
                            ANTERIOR
						</Button>
					}
				/>
			</Grid>

		</Fragment>
	);
};


export default CareCarousel;