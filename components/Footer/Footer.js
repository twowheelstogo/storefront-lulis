import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const date = new Date();

const styles = (theme) => ({
    footer: {
        alignItems: "center",
        display: "flex",
        justifyContent: "center",
        marginBottom: theme.spacing(2)
    },
    divider: {
        color: '#7ec5c8',
        backgroundColor: '#7ec5c8',
        margin: theme.spacing(7, 0, 0, 0),
        opacity: '50%'
    },
    footerHeader: {
        color: '#7ec5c8',
        margin: theme.spacing(7, 2, 0, 2),
        textAlign: 'left',
        fontWeight: 500

    },
    footerContent: {
        color: '#888e8e',
        textAlign: 'left',
        margin: theme.spacing(2, 2, 2, 2),
        fontWeight: 400
    },
    subscribreButton: {
        color: '#7ec5c8',
        margin: theme.spacing(1, 2),
        width: '75%'
    },
    subscribe: {
        margin: theme.spacing(1, 2),
        width: '75%'
    }
});

const Footer = ({ ...props }) => (
    // <footer className={props.classes.footer}>
        <div>
            <Divider className = { props.classes.divider } />

            <div>
                <Grid
                    container
                    direction = 'row'
                    justify = 'center'
                    alignItems = 'flex-start'
                    alignContent = 'flex-start'
                >
                    <Grid
                        item
                        md = { 3 }
                        xs = { 12 }
                    >
                        <Grid
                            container
                            direction = 'column'
                            justify = 'center'
                            alignItems = 'flex-start'
                            alignContent = 'flex-start'
                        >
                            <Typography variant = 'h5' className = { props.classes.footerHeader }>
                                TÉRMINOS Y CONDICIONES
                            </Typography>

                            <Typography variant = 'body1' className = { props.classes.footerContent}>
                                Pago y Garantías
                            </Typography>
                        </Grid>
                    </Grid>

                    <Grid
                        item
                        md = { 3 }
                        xs = { 12 }
                    >
                        <Grid
                            container
                            direction = 'column'
                            justify = 'center'
                            alignItems = 'flex-start'
                            alignContent = 'flex-start'
                        >
                            <Typography variant = 'h5' className = { props.classes.footerHeader }>
                                CONTACTO
                            </Typography>

                            <Typography variant = 'body1' className = { props.classes.footerContent}>
                                2316-3692 | 2316-3693
                            </Typography>

                            <Typography variant = 'body1' className = { props.classes.footerContent}>
                                20 calle 24-26 bodega 15 zona 10 Ofibodegas Pradera
                            </Typography>

                            <Typography variant = 'body1' className = { props.classes.footerContent}>
                                Lunes - sábado: 8am - 7pm
                            </Typography>

                            <Typography variant = 'body1' className = { props.classes.footerContent}>
                                Domingo: 10am - 7pm
                            </Typography>
                        </Grid>
                    </Grid>

                    <Grid
                        item
                        md = { 3 }
                        xs = { 12 }
                    >
                        <Grid
                            container
                            direction = 'column'
                            justify = 'center'
                            alignItems = 'flex-start'
                            alignContent = 'flex-start'
                        >
                            <Typography variant = 'h5' className = { props.classes.footerHeader }>
                                POLÍTICAS
                            </Typography>

                            <Typography variant = 'body1' className = { props.classes.footerContent}>
                                Políticas de devolución
                            </Typography>
                        </Grid>
                    </Grid>

                    <Grid
                        item
                        md = { 3 }
                        xs = { 12 }
                    >
                        <Grid
                            container
                            direction = 'column'
                            justify = 'center'
                            alignItems = 'flex-start'
                            alignContent = 'flex-start'N
                        >
                            <Typography variant = 'h5' className = { props.classes.footerHeader }>
                                SUSCRÍBETE
                            </Typography>

                            <div >
                                <TextField 
                                    fullwidth
                                    type = 'email'
                                    label = 'Correo electrónico'
                                    className = { props.classes.subscribe } 
                                />

                                <Button
                                    variant = 'outlined'
                                    fullwidth
                                    className = { props.classes.subscribreButton }
                                >
                                    SUSCRIBIRSE
                                </Button>
                            </div>
                        </Grid>
                    </Grid>

                    <div className = { props.classes.footer }>
                        <Typography variant="caption">
                            &copy; {date.getFullYear()} Lulis GT
                        </Typography>
                    </div>
                </Grid>
            </div>
        </div>
    // </footer>
);

Footer.propTypes = {
  classes: PropTypes.object
};

export default withStyles(styles, { name: "SkFooter" })(Footer);
