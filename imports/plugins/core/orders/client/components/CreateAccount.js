import React, { useState } from "react";
import PropTypes from "prop-types";
import { Dialog, DialogContent, DialogTitle, DialogActions, Typography, IconButton } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { Form } from "reacto-form";
import { Button, TextField } from "@reactioncommerce/catalyst";
import styled from "styled-components";
import CloseIcon from "mdi-material-ui/Close";

const Grid = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const ColFull = styled.div`
  flex: 1 1 100%;
  padding-top: 5px;
  padding-bottom: 5px;
`;

const CustomTitleLayout = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    font-size: 20px;
    font-weight: 600;
`;

/**
 * @name CreateAccount
 * @param {Object} props Component props
 * @returns {React.Component} returns a React component
 */
function CreateAccount(props) {
    const { open, onClose, onSubmit } = props;
    const [value, setValue] = useState({
        name: "",
        email: ""
    });

    const handleSubmit = () => onSubmit(value);

    const handleChange = (event) => {

        setValue({
            ...value,
            [event.target.id]: event.target.value
        });
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
        >
            <DialogTitle>
                <CustomTitleLayout>
                    <div>{"Crear cliente"}</div>
                    <IconButton
                        onClick={onClose}
                    >
                        <CloseIcon />
                    </IconButton>
                </CustomTitleLayout>
            </DialogTitle>
            <DialogContent>
                <Grid>
                    <ColFull>
                        <TextField
                            label="Nombre completo"
                            placeholder="John Doe"
                            name="name"
                            id="name"
                            onChange={handleChange}
                        />
                    </ColFull>
                    <ColFull>
                        <TextField
                            name="email"
                            label="Correo"
                            placeholder="example@gmail.com"
                            id="email"
                            onChange={handleChange}
                        />
                    </ColFull>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button
                    variant="outlined"
                    color="primary"
                    onClick={onClose}
                >{"Cancelar"}</Button>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit}
                >{"Guardar"}</Button>
            </DialogActions>
        </Dialog>
    );
}

CreateAccount.propTypes = {
    open: PropTypes.bool,
    onClose: PropTypes.func,
    onSubmit: PropTypes.func
};

CreateAccount.defaultProps = {
    open: false,
    onClose() { },
    onSubmit() { }
};

export default CreateAccount;
