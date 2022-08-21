import * as React from "react";
import { SVGProps } from "react";

export const BudgetIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg {...props} width={25} height={26} fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clipPath="url(#a)">
      <path
        d="M14.512 4.667a3.2 3.2 0 0 1 3.196 3.196 1.042 1.042 0 0 0 2.084 0v-.129a5.284 5.284 0 0 0-5.28-5.15h-.97V1.541a1.041 1.041 0 1 0-2.084 0v1.041h-.97A5.28 5.28 0 0 0 8.82 12.87l2.637.88v7.583h-.97a3.199 3.199 0 0 1-3.196-3.195 1.042 1.042 0 0 0-2.084 0v.128a5.284 5.284 0 0 0 5.28 5.15h.97v1.042a1.042 1.042 0 0 0 2.084 0v-1.041h.97A5.28 5.28 0 0 0 16.18 13.13l-2.637-.88V4.667h.97Zm1.01 10.438a3.196 3.196 0 0 1-1.01 6.228h-.97v-6.888l1.98.66Zm-4.064-3.55-1.979-.66a3.196 3.196 0 0 1 1.009-6.228h.97v6.888Z"
        fill="currentColor"
      />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" transform="translate(0 .5)" d="M0 0h25v25H0z" />
      </clipPath>
    </defs>
  </svg>
);
