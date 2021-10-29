import React from "react";
import ProfileEditForm from "components/ProfileEditForm";
import styled from "styled-components";
import { applyTheme } from "@reactioncommerce/components/utils";
import { withComponents } from "@reactioncommerce/components-context";
import Router from "translations/i18nRouter";
import inject from "hocs/inject";
import useUpdateAccount from "hooks/account/useUpdateAccount";

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

const Grid = styled.div`
      padding: 10px;
`;

function ProfileEditPage(props) {
    const { authStore: { account } } = props;
    const [updateAccountEntry, loading] = useUpdateAccount();

    let _formRef = null;

    const handleSubmit = async (value) => {
        console.log(value);
        await updateAccountEntry(value);
        Router.push("/profile/address");
    }

    // const formValues = {
    //     firstName: account.firstName,
    //     lastName: account.lastName,
    //     username: account.username,
    //     phone: account.phone
    // }

    function renderButtons() {
        const {
            components: { Button }
        } = props;

        const handleCancel = () => Router.push("/profile/address");

        return (
            <ButtonsLayout>
                <Button variant="important" color="primary" actionType="secondary" onClick={handleCancel}>Cancelar</Button>
                <Button variant="important" color="primary" onClick={() => { _formRef.submit() }} isWaiting={loading}>Guardar cambios</Button>
            </ButtonsLayout>
        );
    }

    return (
        <Grid>
            <CustomTitle>Editar Perfil</CustomTitle>
            <ProfileEditForm
                formRef={(formEl) => {
                    _formRef = formEl;
                }}
                onSubmit={handleSubmit}
                isSaving={loading}
                value={account}
            />
            {renderButtons()}
        </Grid>
    );
}

export default withComponents(inject("authStore")(ProfileEditPage));