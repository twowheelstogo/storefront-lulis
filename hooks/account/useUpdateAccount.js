import { useMutation } from "@apollo/client";
import { updateAccountMutation } from "./mutations.gql";
import useViewer from "hooks/viewer/useViewer";

const cleanedInput = (input) => {
    delete input.addressBook;
    delete input._id;
    delete input.emailRecords;
    delete input.primaryEmailAddress;
    for (var key in input) {
        if (!input[key] || input[key] == null) {
            delete input[key];
        }
    }
    Object.assign(input, { name: `${input.firstName} ${input.lastName}` })

    return input;
}
/**
 * update account details
 * @returns {Array} The update account entry
 */
export default function useUpdateAccount() {
    const [viewer, , refetchViewer] = useViewer();

    const [updateAccountEntryFunc, { loading }] = useMutation(updateAccountMutation, {
        onCompleted() {
            refetchViewer();
        }
    });

    const updateAccountEntry = async (account) => {
        const input = cleanedInput(account);

        const data = await updateAccountEntryFunc({
            variables: {
                input
            }
        });

        return data;
    };

    return [
        updateAccountEntry,
        loading
    ]
}