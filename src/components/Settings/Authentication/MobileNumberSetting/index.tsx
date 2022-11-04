import { fixtures } from "@/constant/datasets/fixtures";
import { Card } from "@/elements";
import { getUser } from "@/lib/Auth";
import { DefaultCallback } from "@/types";
import { Divider, Heading, HStack, Text, VStack } from "@chakra-ui/react";
import { isEmpty } from "lodash";
import React, {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useState,
} from "react";
import parsePhoneNumber from "libphonenumber-js";
import { MdPhoneIphone as MobileIcon } from "react-icons/md";
import { MobileForm } from "./MobileForm";
import { MobileReadOnly } from "./MobileReadOnly";

type FormDisplayType = "onLoading" | "verified" | "onUpdate" | "notVerified";

type FormContextProps = {
    formType: FormDisplayType;
    setFormType: (type: FormDisplayType) => void;
    verifiedPhoneNumber: string | null;
    setNumber: (number: string) => void;
    isRecentlyVerified: (isRecent: boolean) => void;
    recentlyVerified: boolean;
};

const MobileSettingContext = createContext<FormContextProps>({
    formType: "onLoading",
    setFormType: DefaultCallback,
    verifiedPhoneNumber: null,
    setNumber: DefaultCallback,
    isRecentlyVerified: DefaultCallback,
    recentlyVerified: false,
});

export const useMobileSetting = () => {
    return useContext(MobileSettingContext);
};

export const MobileNumberSetting: React.FC = () => {
    const [formType, setFormType] = useState<FormDisplayType>("onLoading");
    const [recentlyVerified, setRecentlyVerified] = useState<boolean>(false);
    const [verifiedPhoneNumber, setNumber] = useState<string | null>(null);

    const isRecentlyVerified = useCallback((isRecent: boolean) => {
        setRecentlyVerified(isRecent);
    }, []);

    useEffect(() => {
        const user = getUser();
        const phoneNo = user?.phoneNumber ?? null;
        if (!isEmpty(phoneNo) || phoneNo !== null) {
            setFormType("verified");
            const formattedPhoneNumber = parsePhoneNumber(
                phoneNo as string
            )?.formatInternational();
            /**
             * fallback to original format provided by Firebase if
             * parsing the number failed get result
             */
            setNumber(formattedPhoneNumber ?? phoneNo);
            return;
        }
        setFormType("notVerified");
    }, []);

    const value = {
        formType,
        setFormType,
        verifiedPhoneNumber,
        setNumber,
        isRecentlyVerified,
        recentlyVerified,
    };

    return (
        <MobileSettingContext.Provider value={value}>
            <Card w="100%">
                <VStack w="inherit" flex={1} gap={3}>
                    <HeadBar />

                    <Text color="text-gray">
                        {formType === "notVerified" ? (
                            <>
                                {
                                    fixtures.settingsStrings[
                                        "authentication.mobileform.notverified.description"
                                    ]
                                }
                            </>
                        ) : (
                            <>
                                {
                                    fixtures.settingsStrings[
                                        "authentication.mobileform.verified.description"
                                    ]
                                }
                            </>
                        )}
                    </Text>
                    {formType === "onLoading" && <></>}
                    {formType === "verified" && <MobileReadOnly />}
                    {formType === "onUpdate" && <MobileForm />}
                    {formType === "notVerified" && <MobileForm />}
                </VStack>
            </Card>
        </MobileSettingContext.Provider>
    );
};

const HeadBar = () => (
    <VStack width="inherit">
        <HStack width="inherit">
            <Heading size="sm" fontWeight="bold" mb="5px" color="text-hard">
                {fixtures.settingsStrings["authentication.mobileform.heading"]}
            </Heading>
            <MobileIcon fill="text-hard" size={20} />
        </HStack>
        <Divider />
    </VStack>
);
