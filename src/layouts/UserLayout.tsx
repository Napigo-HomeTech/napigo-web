import React, { Fragment } from "react";
import { Outlet } from "react-router-dom";
import { Nav } from "@/components/Nav";

export const UserLayout: React.FC = () => {
  // const [drawerCollapse, setDrawerCollapse] = useState<boolean>(false);

  return (
    <Fragment>
      <Nav />
      <Outlet />
    </Fragment>
  );
};
