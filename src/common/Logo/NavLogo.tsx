import React from "react";
import { LogoProps } from "./types";

export const NavLogo: React.FC<LogoProps> = (props) => {
    const { className, handleClick } = props;

    return (
        <svg width={48} height={27} onClick={handleClick} className={`${className ?? ""}`} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path d="M43.48 4.082H32.21l-8.174 14.447L17.84 4.082 9.588 18.529H2" stroke="#037C66" strokeWidth={2.885} strokeLinecap="square" />
            <path d="M34.04 8.553 25.864 23 19.67 8.553 11.417 23l.317-.555" stroke="#037C66" strokeWidth={2.885} strokeLinecap="square" />
            <circle cx={44.8} cy={4.08} r={3.048} fill="#037C66" stroke="#037C66" strokeWidth={0.063} />
        </svg>
    );
};
