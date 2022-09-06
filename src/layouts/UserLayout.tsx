import React, { Fragment } from "react";
import { Outlet } from "react-router-dom";
import { Nav } from "@/components/Nav";

export const UserLayout: React.FC = () => {
  return (
    <Fragment>
      <Nav />
      <Outlet />
    </Fragment>
  );
};
