import React from "react";
import { LogoProps } from "./types";

export const NapigoLogoBaseLg: React.FC<LogoProps> = (props) => {
    const { className, handleClick } = props;

    return (
        <svg
            {...props}
            width={50}
            height={57}
            fill="none"
            onClick={handleClick}
            className={`${className ?? ""}`}
            xmlns="http://www.w3.org/2000/svg"
        >
            <g clipPath="url(#a)">
                <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M26.1.485a2.49 2.49 0 0 0-2.489 0L1.244 13.402A2.49 2.49 0 0 0 0 15.557v25.835c0 .89.474 1.71 1.244 2.155l22.367 12.917a2.49 2.49 0 0 0 2.49 0l22.366-12.916a2.49 2.49 0 0 0 1.245-2.156V15.557c0-.889-.475-1.71-1.245-2.155L26.101.485Zm.122 6.156a2.4 2.4 0 0 0-2.4 0L6.699 16.53a2.4 2.4 0 0 0-1.2 2.077v19.78a2.4 2.4 0 0 0 1.2 2.078l17.125 9.89a2.399 2.399 0 0 0 2.4 0l17.124-9.89a2.4 2.4 0 0 0 1.2-2.077v-19.78a2.4 2.4 0 0 0-1.2-2.079L26.222 6.64Z"
                    fill="url(#b)"
                />
                <path
                    d="M24.78 16.815c1.004-.001 2.003.126 2.974.377.952.245 1.87.605 2.734 1.07.48.26.939.555 1.375.88.023.013.035.022.044.025l.003.003a11.519 11.519 0 0 1 2.194 2.128s2.464 3.376 2.464 7.425l.003.665.019 2.842h-7.963v-3.788a3.538 3.538 0 0 0-.299-1.45 3.85 3.85 0 0 0-.827-1.211 3.851 3.851 0 0 0-1.237-.811 3.703 3.703 0 0 0-1.484-.293 3.89 3.89 0 0 0-.78.074c-.244.048-.482.12-.71.219a3.822 3.822 0 0 0-2.061 2.025c-.201.456-.303.95-.298 1.447v3.788c-2.118 0-4.15.828-5.647 2.302a7.798 7.798 0 0 0-2.34 5.556V28.442c-.003-1.045.14-2.085.424-3.092a11.55 11.55 0 0 1 1.196-2.77c.187-.312.39-.614.605-.908l.016-.024a11.883 11.883 0 0 1 3.63-3.239 11.848 11.848 0 0 1 5.964-1.594Z"
                    fill="url(#c)"
                />
            </g>
            <defs>
                <linearGradient
                    id="b"
                    x1={0}
                    y1={0.151}
                    x2={84.707}
                    y2={54.629}
                    gradientUnits="userSpaceOnUse"
                >
                    <stop stopColor="#3BAE5A" />
                    <stop offset={1} stopColor="#1BA16E" />
                </linearGradient>
                <linearGradient
                    id="c"
                    x1={12.943}
                    y1={16.815}
                    x2={49.586}
                    y2={44.098}
                    gradientUnits="userSpaceOnUse"
                >
                    <stop stopColor="#3BAE5A" />
                    <stop offset={1} stopColor="#1BA16E" />
                </linearGradient>
                <clipPath id="a">
                    <path fill="#fff" d="M0 0h49.782v57H0z" />
                </clipPath>
            </defs>
        </svg>
    );
};
