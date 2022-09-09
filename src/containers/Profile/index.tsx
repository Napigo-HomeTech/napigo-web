import React from "react";
import { VerticalMenuLayout } from "@/layouts/VerticalMenuLayout";
import { Navigate, Route, Routes } from "react-router-dom";
import { SettingGeneralPage } from "@/pages/Settings/General";
import {
  MdOutlineAccountCircle as PersonalIcon,
  MdOutlineFamilyRestroom as FamilyIcon,
} from "react-icons/md";
import { getMessage } from "@/constant/datasets/fixtures";
import { VerticalMenu } from "@/elements";

const ICON_SIZE = 20;

/**
 * Listing of Menu Mapping Object for Settings
 */
const PROFILE_MENUS = [
  {
    icon: <PersonalIcon size={ICON_SIZE} />,
    name: "personal",
    displayText: getMessage("profileStrings", "menu.item.personal.displaytext"),
    to: "",
  },
  {
    icon: <FamilyIcon size={ICON_SIZE} />,
    name: "family",
    displayText: getMessage("profileStrings", "menu.item.family.displaytext"),
    to: "authentication",
  },
];

export const ProfileContainer: React.FC = () => {
  return (
    <Routes>
      <Route
        element={
          <VerticalMenuLayout
            menu={<VerticalMenu menus={PROFILE_MENUS} />}
            contentBackground="inherit"
          />
        }
      >
        <Route index element={<Navigate to="personal" />} />
        <Route path="personal" element={<SettingGeneralPage />} />
      </Route>
    </Routes>
  );
};
