import { Card } from "@/elements";
import { TextField } from "@/elements/Form";
import {
  Divider,
  FormLabel,
  Grid,
  GridItem,
  Heading,
  HStack,
} from "@chakra-ui/react";
import { Select } from "chakra-react-select";
import React from "react";

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
        <Heading size="md">Work</Heading>
      </HStack>
      <Divider />
      <Grid
        h="200px"
        templateRows="repeat(2, 1fr)"
        templateColumns="repeat(4, 1fr)"
        gap={4}
      >
        <GridItem colSpan={2}>
          <TextField label="Job Title" placeholder="Civil Engineer" />
        </GridItem>
        <GridItem colSpan={2}>
          <FormLabel>Employment Type</FormLabel>
          <Select
            selectedOptionStyle="check"
            size="md"
            useBasicStyles
            placeholder="Employment Type"
            options={employmentTypeOptions}
          />
        </GridItem>

        <GridItem colSpan={2}>
          <FormLabel>Organization</FormLabel>
          <Select
            selectedOptionStyle="check"
            size="md"
            useBasicStyles
            placeholder="Company Name"
            options={employmentTypeOptions}
          />
        </GridItem>
      </Grid>
    </Card>
  );
};
