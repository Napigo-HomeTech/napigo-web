import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { MdOutlineAccountCircle as PersonalIcon, MdOutlineFamilyRestroom as FamilyIcon } from "react-icons/md";
import { fixtures } from "@/constant/datasets/fixtures";
import { PersonalProfilePage } from "@/pages/Profile/PersonalProfile";
import { Heading } from "@chakra-ui/react";
import { ModulePage } from "../ModulePage";

/**
 * Listing of Menu Mapping Object for Settings
 */
const profileMenus = [
    {
        icon: <PersonalIcon />,
        name: "personal",
        displayText: fixtures.profileStrings["menu.item.personal.displaytext"],
        goto: "",
    },
    {
        icon: <FamilyIcon />,
        name: "family",
        displayText: fixtures.profileStrings["menu.item.family.displaytext"],
        goto: "family",
    },
];

export const ProfileContainer: React.FC = () => {
    return (
        <Routes>
            <Route element={<ModulePage menus={profileMenus} title="Profile" />}>
                <Route index element={<Navigate to="personal" />} />
                <Route path="personal" element={<PersonalProfilePage />} />
                <Route path="family" element={<Heading size="md">Family Page in progress..</Heading>} />
            </Route>
        </Routes>
    );
};
