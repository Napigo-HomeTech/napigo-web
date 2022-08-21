import React, { cloneElement, ReactElement, useCallback } from "react";
import { LogoContainerProps } from "./types";

const ButtonClassMap = {
  button:
    "cursor-pointer transform active:scale-90 transition-transform ease-in-out",
  static: "",
};

export const LogoContainer: React.FC<LogoContainerProps> = (props) => {
  const { type = "static", onClick, children } = props;

  const handleClick = useCallback(
    (ev: React.MouseEvent) => {
      if (type === "button") {
        onClick?.(ev);
        return;
      }
    },
    [type, onClick]
  );

  return React.Children.only(
    cloneElement(children as ReactElement, {
      handleClick: handleClick,
      className: ButtonClassMap[type],
    })
  );
};
