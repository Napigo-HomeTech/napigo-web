import React from "react";
import { LogoProps } from "./types";

export const NapigoLogoBase: React.FC<LogoProps> = (props) => {
    const { className, handleClick } = props;

    return (
        <svg {...props} width={33} height={38} fill="none" onClick={handleClick} className={`${className ?? ""}`} xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#a)">
                <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M17.154.319a1.636 1.636 0 0 0-1.636 0l-14.7 8.49A1.636 1.636 0 0 0 0 10.224v16.979c0 .584.312 1.124.818 1.416l14.7 8.49c.506.292 1.13.292 1.636 0l14.7-8.49c.506-.292.818-.832.818-1.416v-16.98c0-.584-.312-1.124-.818-1.416l-14.7-8.49Zm.08 4.046a1.577 1.577 0 0 0-1.577 0l-11.255 6.5a1.577 1.577 0 0 0-.788 1.365v13c0 .563.3 1.084.788 1.365l11.255 6.5c.488.282 1.089.282 1.577 0l11.255-6.5c.488-.281.788-.802.788-1.365v-13c0-.564-.3-1.084-.788-1.366l-11.255-6.5Z"
                    fill="url(#b)"
                />
                <path
                    d="M16.286 11.051c.66 0 1.317.083 1.955.248.626.161 1.229.398 1.796.703.316.171.618.365.905.579l.028.016.002.002a7.587 7.587 0 0 1 1.442 1.398s1.62 2.22 1.62 4.88l.001.437.013 1.868h-5.234v-2.49a2.326 2.326 0 0 0-.196-.953 2.53 2.53 0 0 0-.543-.795 2.53 2.53 0 0 0-.813-.533 2.434 2.434 0 0 0-.976-.193 2.561 2.561 0 0 0-.512.05c-.16.03-.317.078-.467.143a2.512 2.512 0 0 0-1.355 1.33c-.132.3-.199.625-.195.952v2.49a5.295 5.295 0 0 0-3.712 1.512 5.125 5.125 0 0 0-1.538 3.652v-7.654a7.402 7.402 0 0 1 .279-2.032 7.592 7.592 0 0 1 1.184-2.418l.01-.016a7.811 7.811 0 0 1 2.386-2.128 7.785 7.785 0 0 1 3.92-1.048Z"
                    fill="url(#c)"
                />
            </g>
            <defs>
                <linearGradient id="b" x1={0} y1={0.1} x2={55.671} y2={35.903} gradientUnits="userSpaceOnUse">
                    <stop stopColor="#3BAE5A" />
                    <stop offset={1} stopColor="#1BA16E" />
                </linearGradient>
                <linearGradient id="c" x1={8.507} y1={11.051} x2={32.589} y2={28.983} gradientUnits="userSpaceOnUse">
                    <stop stopColor="#3BAE5A" />
                    <stop offset={1} stopColor="#1BA16E" />
                </linearGradient>
                <clipPath id="a">
                    <path fill="#fff" d="M0 0h32.718v37.462H0z" />
                </clipPath>
            </defs>
        </svg>
    );
};
