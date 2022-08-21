import * as React from "react";
import { SVGProps } from "react";

export const PlannerIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg {...props} width={25} height={26} fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clipPath="url(#a)" fill="currentColor">
      <path d="M23.958 11.958A1.042 1.042 0 0 0 22.917 13a10.452 10.452 0 1 1-3.021-7.314.895.895 0 0 1-.104.022h-3.125a1.042 1.042 0 0 0 0 2.084h3.125a3.125 3.125 0 0 0 3.125-3.125V1.542a1.042 1.042 0 0 0-2.084 0v2.15A12.493 12.493 0 1 0 25 13a1.042 1.042 0 0 0-1.042-1.042Z" />
      <path d="M12.5 6.75a1.042 1.042 0 0 0-1.042 1.042V13c0 .276.11.541.306.736l3.125 3.125a1.042 1.042 0 0 0 1.472-1.473l-2.82-2.82V7.793A1.041 1.041 0 0 0 12.5 6.75Z" />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" transform="translate(0 .5)" d="M0 0h25v25H0z" />
      </clipPath>
    </defs>
  </svg>
);
