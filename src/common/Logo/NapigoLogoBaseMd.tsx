import React from "react";
import { LogoProps } from "./types";

export const NapigoLogoBaseMd: React.FC<LogoProps> = (props) => {
    const { className, handleClick } = props;

    return (
        <svg
            {...props}
            width={42}
            height={47}
            fill="none"
            onClick={handleClick}
            className={`${className ?? ""}`}
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M21.521.4a2.052 2.052 0 0 0-2.052 0L1.026 11.05A2.052 2.052 0 0 0 0 12.829V34.13c0 .734.391 1.411 1.026 1.778l18.443 10.65a2.052 2.052 0 0 0 2.052 0l18.443-10.65a2.052 2.052 0 0 0 1.026-1.778V12.828c0-.733-.39-1.41-1.026-1.777L21.522.4Zm.1 5.076a1.978 1.978 0 0 0-1.978 0L5.523 13.63a1.978 1.978 0 0 0-.99 1.713v16.31c0 .707.378 1.36.99 1.713l14.12 8.155a1.978 1.978 0 0 0 1.979 0l14.12-8.155a1.978 1.978 0 0 0 .99-1.713v-16.31c0-.707-.378-1.36-.99-1.713l-14.12-8.155Z"
                fill="url(#a)"
            />
            <path
                d="M20.433 13.865c.828 0 1.652.104 2.452.31.785.203 1.542.5 2.254.883a9.41 9.41 0 0 1 1.135.726c.018.01.028.018.035.02l.003.003a9.5 9.5 0 0 1 1.81 1.754c-.001 0 2.03 2.784 2.03 6.123l.003.548.016 2.343h-6.566v-3.123a2.918 2.918 0 0 0-.246-1.196 3.175 3.175 0 0 0-.682-.998 3.179 3.179 0 0 0-1.02-.669 3.056 3.056 0 0 0-1.224-.242 3.208 3.208 0 0 0-.643.062c-.201.039-.398.1-.586.18a3.151 3.151 0 0 0-1.7 1.67c-.165.376-.249.783-.245 1.193v3.123a6.643 6.643 0 0 0-4.656 1.899 6.429 6.429 0 0 0-1.93 4.581v-9.603a9.288 9.288 0 0 1 .35-2.549 9.527 9.527 0 0 1 1.486-3.033l.012-.02a9.796 9.796 0 0 1 2.994-2.67 9.763 9.763 0 0 1 4.918-1.315Z"
                fill="url(#b)"
            />
            <defs>
                <linearGradient
                    id="a"
                    x1={0}
                    y1={0.125}
                    x2={69.846}
                    y2={45.045}
                    gradientUnits="userSpaceOnUse"
                >
                    <stop stopColor="#3BAE5A" />
                    <stop offset={1} stopColor="#1BA16E" />
                </linearGradient>
                <linearGradient
                    id="b"
                    x1={10.673}
                    y1={13.865}
                    x2={40.887}
                    y2={36.362}
                    gradientUnits="userSpaceOnUse"
                >
                    <stop stopColor="#3BAE5A" />
                    <stop offset={1} stopColor="#1BA16E" />
                </linearGradient>
            </defs>
        </svg>
    );
};
