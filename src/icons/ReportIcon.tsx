import * as React from "react";
import { SVGProps } from "react";

export const ReportIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg {...props} width={25} height={26} fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clipPath="url(#a)" fill="currentColor">
      <path d="M23.958 23.417H3.125a1.042 1.042 0 0 1-1.042-1.042V1.542a1.042 1.042 0 1 0-2.083 0v20.833A3.125 3.125 0 0 0 3.125 25.5h20.833a1.041 1.041 0 1 0 0-2.083Z" />
      <path d="M15.625 21.333a1.041 1.041 0 0 0 1.042-1.041V13a1.042 1.042 0 1 0-2.084 0v7.292a1.042 1.042 0 0 0 1.042 1.041ZM7.292 21.333a1.041 1.041 0 0 0 1.041-1.041V13a1.042 1.042 0 0 0-2.083 0v7.292a1.042 1.042 0 0 0 1.042 1.041ZM19.792 21.333a1.041 1.041 0 0 0 1.041-1.041v-12.5a1.041 1.041 0 1 0-2.083 0v12.5a1.041 1.041 0 0 0 1.042 1.041ZM11.458 21.333a1.041 1.041 0 0 0 1.042-1.041v-12.5a1.041 1.041 0 1 0-2.083 0v12.5a1.041 1.041 0 0 0 1.041 1.041Z" />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" transform="translate(0 .5)" d="M0 0h25v25H0z" />
      </clipPath>
    </defs>
  </svg>
);
