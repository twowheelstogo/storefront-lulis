import React, { useImperativeHandle, useRef } from "react";
import { withComponents } from "@reactioncommerce/components-context";
import { Form } from "reacto-form";
import PropTypes from "prop-types";
import styled from "styled-components";
import { applyTheme, getRequiredValidator } from "@reactioncommerce/components/utils";
import uniqueId from "lodash.uniqueid";

const Grid = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const ColFull = styled.div`
  flex: 1 1 100%;
`;

const ColHalf = styled.div`
  flex: 1 1 100%;
  @media (min-width: ${applyTheme("sm", "breakpoints")}px) {
    flex: 0 1 calc(50% - 9px);
  }
`;

function ProfileEditForm(props) {
    const {
        components: { Field, TextInput, ErrorsBlock },
        firstNameLabelText,
        lastNameLabelText,
        phoneLabelText,
        usernameLabelText,
        errors,
        validator,
        value,
        onChange,
        onSubmit
    } = props;

    let _form = null;

    const uniqueInstanceIdentifier = uniqueId("ProfileEditForm_");

    const firstNameInputId = `firstName_${uniqueInstanceIdentifier}`;
    const lastNameInputId = `lastName_${uniqueInstanceIdentifier}`;
    const phoneInputId = `phone_${uniqueInstanceIdentifier}`;
    // const noteInputId = `note_${uniqueInstanceIdentifier}`;
    const usernameInputId = `username_${uniqueInstanceIdentifier}`;

    useImperativeHandle(props.formRef, () => ({
        submit() {
            _form.submit();
        }
    }));

    return (
        <div
            ref={props.formRef}
        >
            <Form
                ref={(formEl) => {
                    _form = formEl;
                }}
                errors={errors}
                validator={validator}
                value={value}
                onChange={onChange}
                onSubmit={onSubmit}
                revalidateOn="changed"
            >
                <Grid>
                    <ColHalf>
                        <Field name="firstName" label={firstNameLabelText} labelFor={firstNameInputId}>
                            <TextInput
                                id={firstNameInputId}
                                name="firstName"
                                // TODO: Replace addressNamePlaceholder to adressNamePlaceholderText
                                placeholder={"Ingrese..."}
                            // isReadOnly={isSaving || isReadOnly}
                            />
                            <ErrorsBlock names={["firstName"]} />
                        </Field>
                    </ColHalf>
                    <ColHalf>
                        <Field name="lastName" label={lastNameLabelText} labelFor={lastNameInputId}>
                            <TextInput
                                id={lastNameInputId}
                                name="lastName"
                                // TODO: Replace addressNamePlaceholder to adressNamePlaceholderText
                                placeholder={"Ingrese..."}
                            // isReadOnly={isSaving || isReadOnly}
                            />
                            <ErrorsBlock names={["lastName"]} />
                        </Field>
                    </ColHalf>
                    <ColFull>
                        <Field name="username" label={usernameLabelText} labelFor={usernameInputId}>
                            <TextInput
                                id={usernameInputId}
                                name="username"
                                // TODO: Replace addressNamePlaceholder to adressNamePlaceholderText
                                placeholder={"Ingrese..."}
                            // isReadOnly={isSaving || isReadOnly}
                            />
                            <ErrorsBlock names={["username"]} />
                        </Field>
                    </ColFull>
                    <ColFull>
                        <Field name="phone" label={phoneLabelText} labelFor={phoneInputId}>
                            <TextInput
                                id={phoneInputId}
                                name="phone"
                                // TODO: Replace addressNamePlaceholder to adressNamePlaceholderText
                                placeholder={"Ingrese..."}
                            // isReadOnly={isSaving || isReadOnly}
                            />
                            <ErrorsBlock names={["phone"]} />
                        </Field>
                    </ColFull>
                </Grid>
            </Form>
        </div>
    );
}

ProfileEditForm.propTypes = {
    firstNameLabelText: PropTypes.string,
    lastNameLabelText: PropTypes.string,
    phoneLabelText: PropTypes.string,
    noteLabelText: PropTypes.string,
    usernameLabelText: PropTypes.string,
    value: PropTypes.shape({
        firstName: PropTypes.string,
        lastName: PropTypes.string,
        phone: PropTypes.string,
        note: PropTypes.string,
        username: PropTypes.string
    }),
    onSubmit: PropTypes.func,
    onChange: PropTypes.func,
    errors: PropTypes.arrayOf(PropTypes.shape({
        message: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired
    })),
    validator: PropTypes.func
};

ProfileEditForm.defaultProps = {
    firstNameLabelText: "Nombre",
    lastNameLabelText: "Apellido",
    phoneLabelText: "Teléfono",
    noteLabelText: "",
    usernameLabelText: "Usuario",
    value: {
        firstName: "",
        lastName: "",
        phone: "",
        note: "",
        username: ""
    },
    onSubmit() { },
    onChange() { },
    errors: [],
    validator: getRequiredValidator("firstName", "lastName", "phone", "username")
};

export default withComponents(ProfileEditForm);