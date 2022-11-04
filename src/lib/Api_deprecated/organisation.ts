import { OptionBase } from "chakra-react-select";
import { getOrgAutoCompleteFromRapidApi } from "../RapidApis/organisation";
import { mock_getOrganisationAutoComplete } from "./mock_organisation";

export interface OrganisationOption extends OptionBase {
    label: string;
    value: string;
}
/**
 * Only used for get autocomplete on a 'select oragnisation' component
 * @param value
 */
export const getOrganisationAutoComplete = (
    value: string
): Promise<OrganisationOption[]> => {
    if (import.meta.env.VITE_MOCK_ORGANISATION_API == "true") {
        return mock_getOrganisationAutoComplete(value);
    }
    return getOrgAutoCompleteFromRapidApi();
};
