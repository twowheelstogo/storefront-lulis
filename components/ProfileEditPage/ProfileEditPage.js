import React from "react";
import ProfileEditForm from "components/ProfileEditForm";
import styled from "styled-components";
import { applyTheme } from "@reactioncommerce/components/utils";
import { withComponents } from "@reactioncommerce/components-context";

const CustomTitle = styled.div`
    font-size: 18px;
    color: #242356;
    font-weight: 700;
    @media (min-width: ${applyTheme("sm", "breakpoints")}px) {
        font-size: 24px;
      }
`;

const ButtonsLayout = styled.div`
      display: flex;
      flex-direction: row;
      gap: 10px;
      justify-content: flex-end;
`;

function ProfileEditPage(props) {

    let _formRef = null;

    const handleSubmit = (value) => {
        console.log(value);
    }

    function renderButtons() {
        const {
            components: { Button }
        } = props;
        return (
            <ButtonsLayout>
                <Button variant="important" color="primary" actionType="secondary">Cancelar</Button>
                <Button variant="important" color="primary" onClick={() => { _formRef.submit() }}>Guardar cambios</Button>
            </ButtonsLayout>
        );
    }
    console.log(_formRef)

    return (
        <React.Fragment>
            <CustomTitle>Editar Perfil</CustomTitle>
            <ProfileEditForm
                formRef={(formEl) => {
                    _formRef = formEl;
                }}
                onSubmit={handleSubmit}
            />
            {renderButtons()}
        </React.Fragment>
    );
}

export default withComponents(ProfileEditPage);