import { faker } from "@faker-js/faker";
import { OptionBase } from "chakra-react-select";
import { delayInvoke } from "../utils/delays";

const SEED = 100;
/**
 * Provide fake data for mocking if required
 */
faker.mersenne.seed(SEED);

interface OrganisationOption extends OptionBase {
    label: string;
    value: string;
}
const orgs: OrganisationOption[] = [];

export const initOrganisationData = () => {
    if (orgs.length === 0) {
        let i = 0;
        const n = SEED;
        for (; i < n; i++) {
            const name = faker.company.name();
            orgs.push({
                value: name,
                label: name,
            });
        }
        return orgs;
    }
    return orgs;
};

/**
 *
 * @param value
 */
export const mock_getOrganisationAutoComplete = (
    value: string
): Promise<OrganisationOption[]> => {
    let data = orgs;
    if (data.length === 0) {
        data = initOrganisationData();
    }
    const result = data.filter((item: OrganisationOption) =>
        item.value.toLowerCase().includes(value.toLowerCase())
    );
    return new Promise((resolve) => {
        delayInvoke(() => {
            resolve(result);
        }, 1000);
    });
};
