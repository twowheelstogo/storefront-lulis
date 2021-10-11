import React, { useState } from "react";
import PropTypes from "prop-types";
import { Dialog, DialogContent, DialogTitle, DialogActions, Typography, IconButton } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { Form } from "reacto-form";
import { Button, TextField } from "@reactioncommerce/catalyst";
import styled from "styled-components";
import CloseIcon from "mdi-material-ui/Close";
import { applyTheme } from "@reactioncommerce/components/utils";

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

const ColHalf = styled.div`
  flex: 1 1 100%;
  @media (min-width: ${applyTheme("sm", "breakpoints")}px) {
    flex: 0 1 calc(50% - 9px);
  }`;

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
        email: "",
        firstName: "",
        lastName: "",
        phone: ""
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
                    <ColHalf>
                        <TextField
                            label="Nombre"
                            placeholder="John Doe"
                            name="firstName"
                            id="firstName"
                            onChange={handleChange}
                        />
                    </ColHalf>
                    <ColHalf>
                        <TextField
                            label="Apellido"
                            placeholder="John Doe"
                            name="lastName"
                            id="lastName"
                            onChange={handleChange}
                        />
                    </ColHalf>
                    <ColFull>
                        <TextField
                            name="phone"
                            label="Teléfono"
                            placeholder="22220000"
                            id="phone"
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
