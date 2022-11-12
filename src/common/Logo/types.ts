import React from "react";

export type LogoType = "static" | "button";

export type LogoProps = {
  handleClick?: (ev: React.MouseEvent) => void;
  className?: string;
};
