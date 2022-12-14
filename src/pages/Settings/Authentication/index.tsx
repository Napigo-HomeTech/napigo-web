import { Divider, Heading, HStack, VStack, Button } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { Card } from "@/elements";
import React from "react";
import { LoginEmailForm } from "@/components/Settings/Authentication/LoginEmailForm";
import { LoginPasswordForm } from "@/components/Settings/Authentication/LoginPasswordForm";
import { MobileNumberSetting } from "@/components/Settings/Authentication/MobileNumberSetting";
import { getMessage } from "@/constant/datasets/fixtures";

export const SettingAuthenticationPage: React.FC = () => {
  return (
    <VStack
      display="flex"
      flexDirection="column"
      maxWidth="700px"
      py="30px"
      gap={5}
    >
      <HStack w="100%" justifyContent="space-between" p={0} alignItems="end">
        <Heading size="md">
          {getMessage("settingsStrings", "authentication.title")}
        </Heading>
        <Button as={RouterLink} to={`/user/console`} size="sm">
          {getMessage(
            "settingsStrings",
            "authentication.back-console.buttontext"
          )}
        </Button>
      </HStack>
      <SectionContainer
        title={getMessage(
          "settingsStrings",
          "authentication.emailloginform.heading"
        )}
      >
        <LoginEmailForm />
      </SectionContainer>
      <SectionContainer
        title={getMessage(
          "settingsStrings",
          "authentication.passwordform.heading"
        )}
      >
        <LoginPasswordForm />
      </SectionContainer>
      <MobileNumberSetting />
    </VStack>
  );
};

type SectionContainerProps = {
  title: string;
  children: React.ReactNode;
  rightControl?: React.ReactElement;
};

/**
 *
 * @param props
 * @returns
 */
export const SectionContainer: React.FC<SectionContainerProps> = (props) => {
  const { title, children, rightControl } = props;
  return (
    <Card w="100%">
      <VStack width="100%" flex={1} gap={6}>
        <SectionTitle title={title} rightControl={rightControl} />
        {children}
      </VStack>
    </Card>
  );
};
/**
 *
 * @param title
 * @returns
 */
export const SectionTitle = (props: any) => {
  const { title, rightControl } = props;
  return (
    <VStack width="inherit">
      <HStack width="100%" justifyContent="space-between">
        <Heading size="md" mb="5px">
          {title}
        </Heading>
        {rightControl}
      </HStack>
      <Divider />
    </VStack>
  );
};
