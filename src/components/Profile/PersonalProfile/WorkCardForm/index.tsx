import { Card } from "@/elements";
import { SingleDatepicker } from "@/elements/SmartDatePicker";
import { TextField } from "@/elements/Form";
import { getOrganisationAutoComplete } from "@/lib/Apis/organisation";
import { Divider, FormControl, FormLabel, Grid, GridItem, Heading, HStack } from "@chakra-ui/react";
import { AsyncCreatableSelect, Select } from "chakra-react-select";
import React from "react";
import { fixtures } from "@/constant/datasets/fixtures";

const employmentTypeOptions = [
    {
        label: "Full Time",
        value: "Full Time",
    },
    {
        label: "Part Time",
        value: "Part Time",
    },
    {
        label: "Self Employed",
        value: "Self Employed",
    },
    {
        label: "Freelance",
        value: "Freelance",
    },
    {
        label: "Contract",
        value: "Contract",
    },
    {
        label: "Internship",
        value: "Internship",
    },
    {
        label: "Apprenticeship",
        value: "Apprenticeship",
    },
    {
        label: "Seasonal",
        value: "Seasonal",
    },
];

export const WorkCardForm: React.FC = () => {
    return (
        <Card width="100%">
            <HStack width="100%">
                <Heading size="md">{fixtures.profileStrings["work.section.title"]}</Heading>
            </HStack>
            <Divider />
            <Grid h="200px" templateRows="repeat(2, 1fr)" templateColumns="repeat(4, 1fr)" gap={4}>
                <GridItem colSpan={2}>
                    <TextField
                        label={fixtures.profileStrings["work.job-title.input.label"]}
                        placeholder={fixtures.profileStrings["work.job-title.input.placeholder"]}
                    />
                </GridItem>
                <GridItem colSpan={2}>
                    <FormControl>
                        <FormLabel>{fixtures.profileStrings["work.employment-type.select.label"]}</FormLabel>
                        <Select selectedOptionStyle="check" size="md" useBasicStyles placeholder="Employment Type" options={employmentTypeOptions} />
                    </FormControl>
                </GridItem>

                <GridItem colSpan={2}>
                    <FormControl>
                        <FormLabel>{fixtures.profileStrings["work.organization.select.label"]}</FormLabel>
                        <AsyncCreatableSelect
                            selectedOptionStyle="check"
                            isMulti={false}
                            allowCreateWhileLoading
                            formatCreateLabel={(inputValue) => {
                                return `Add "${inputValue}"`;
                            }}
                            size="md"
                            loadOptions={(inputValue: string, callback) => {
                                getOrganisationAutoComplete(inputValue).then((result) => {
                                    callback(result);
                                });
                            }}
                            useBasicStyles
                            placeholder="Company Name"
                            options={employmentTypeOptions}
                        />
                    </FormControl>
                </GridItem>
                <GridItem colSpan={2}>
                    <HStack>
                        <FormControl>
                            <SingleDatepicker
                                onDateChange={(_) => {
                                    /**
                                     *@TODO need to redefined date formating accross entities and layers
                                     */
                                }}
                                label={fixtures.profileStrings["work.start.input.label"]}
                            />
                        </FormControl>
                        <FormControl>
                            <SingleDatepicker
                                onDateChange={(_) => {
                                    /**
                                     *@TODO need to redefined date formating accross entities and layers
                                     */
                                }}
                                label={fixtures.profileStrings["work.until.input.label"]}
                            />
                        </FormControl>
                    </HStack>
                </GridItem>
            </Grid>
        </Card>
    );
};
