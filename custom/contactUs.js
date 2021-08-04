import React from "react";
import {
	TextField,
	Grid,
	Typography,
	Button
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
	formContainer: {
		width: "50%",
		marginBottom: theme.spacing(1)
	},
	submitButton: {
		color: "#7ec5c8"
	},
	title: {
		color: "#0095b3",
		fontWight: 500,
		marginBottom: theme.spacing(2),
		marginTop: "10vh"
	}
}));

const ContactUsForm = () => {
	const classes = useStyles();

	return (
		<Grid
			container
			direction="column"
			justify="center"
			alignItems="center"
			alignContent="center"
			// className = { classes.formContainer }
		>
			<Typography variant="h3" className={classes.title}>
                CONTÁCTANOS
			</Typography>

			<Grid
				container
				direction="row"
				justify="center"
				alignItems="center"
				alignContent="center"
				spacing={5}
				className={classes.formContainer}
			>
				<Grid
					item
					lg={6}
					md={6}
					xs={12}
				>
					<TextField
						type="text"
						label="Nombre"
						fullWidth
					/>
				</Grid>

				<Grid
					item
					lg={6}
					md={6}
					xs={12}
				>
					<TextField
						type="text"
						label="Número de teléfono"
						fullWidth
					/>
				</Grid>
			</Grid>

			<Grid
				container
				direction="row"
				justify="center"
				alignItems="center"
				alignContent="center"
				spacing={5}
				className={classes.formContainer}
			>
				<Grid
					item
					lg={12}
					md={12}
					xs={12}
				>
					<TextField
						type="email"
						label="Correo electrónico"
						fullWidth
					/>
				</Grid>
			</Grid>

			<Grid
				container
				direction="row"
				justify="center"
				alignItems="center"
				alignContent="center"
				spacing={5}
				className={classes.formContainer}
			>
				<Grid
					item
					lg={12}
					md={12}
					xs={12}
				>
					<TextField
						label="Mensaje"
						multiline
						rows={6}
						fullWidth
					/>
				</Grid>
			</Grid>

			<Grid
				container
				direction="row"
				justify="center"
				alignItems="center"
				alignContent="center"
				spacing={5}
				className={classes.formContainer}
			>
				<Grid
					item
					lg={6}
					md={6}
					xs={12}
				>
					<Button
						variant="outlined"
						fullWidth
						className={classes.submitButton}
					>
                        ENVIAR
					</Button>
				</Grid>
			</Grid>
		</Grid>
	);
};

export default ContactUsForm;
