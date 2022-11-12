import React from "react";
import {
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  HStack,
  Text,
  Box,
} from "@chakra-ui/react";
import { uniqueId } from "lodash";
import { MdSpaceDashboard as ServicesIcon } from "react-icons/md";
import { IoChevronDown as DropdownIcon } from "react-icons/io5";
import { fixtures } from "@/constant/datasets/fixtures";
import { Link as RouterLink } from "react-router-dom";
import { featureFlags } from "@/config/feature-flags";
/**
 * Services Icon Imports
 */
import {
  FaMoneyCheckAlt as FinancingIcon,
  FaCalendarAlt as EventIcon,
  FaCompass as TravelPlannerIcon,
  FaMemory as BiteFormIcon,
  FaFileInvoice as DocumentIcon,
} from "react-icons/fa";
import { IfFeatureEnabled } from "@growthbook/growthbook-react";

const ServiceItems = [
  {
    Icon: FinancingIcon,
    text: "Financing",
    goto: "finance",
    featureFlag: featureFlags.enable_module_finance,
  },
  {
    Icon: EventIcon,
    text: "Event & Calendar",
    goto: "event-calendar",
    featureFlag: featureFlags.enable_module_event_calendar,
  },
  {
    Icon: TravelPlannerIcon,
    text: "Travel Planner",
    goto: "travel-planner",
    featureFlag: featureFlags.enable_module_travel_planner,
  },
  {
    Icon: BiteFormIcon,
    text: "BiteForms",
    goto: "bite-forms",
    featureFlag: featureFlags.enable_module_biteform,
  },
  {
    Icon: DocumentIcon,
    text: "Documents",
    goto: "documents",
    featureFlag: featureFlags.enable_module_document,
  },
];

export const ServiceMenu: React.FC = () => {
  return (
    <Menu>
      <MenuButton
        as={Button}
        leftIcon={<ServicesIcon />}
        rightIcon={<DropdownIcon />}
        colorScheme="brand-gr"
      >
        {fixtures.navStrings["service.buttontext"]}
      </MenuButton>
      <MenuList width="auto" maxHeight="600px" overflow="scroll">
        {ServiceItems.map((item) => (
          <IfFeatureEnabled key={uniqueId()} feature={item.featureFlag}>
            <MenuItem
              as={RouterLink}
              to={item.goto}
              paddingRight="40px"
              color={"text-hard"}
              _hover={{
                background: "brand-gr",
                color: "white",
              }}
            >
              <HStack>
                <Box
                  bg="transparent"
                  borderWidth={1}
                  borderColor="border"
                  width="50px"
                  height="50px"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  rounded={"base"}
                  color="brand-gr"
                >
                  {<item.Icon size={20} />}
                </Box>
                <Text>{item.text}</Text>
              </HStack>
            </MenuItem>
          </IfFeatureEnabled>
        ))}
      </MenuList>
    </Menu>
  );
};
