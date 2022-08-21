import * as React from "react";
import { SVGProps } from "react";

export const MooneyCardIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg {...props} width={25} height={26} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M22.07 3.82H2.93A2.933 2.933 0 0 0 0 6.75v12.5a2.933 2.933 0 0 0 2.93 2.93h19.14A2.933 2.933 0 0 0 25 19.25V6.75a2.933 2.933 0 0 0-2.93-2.93Zm.977 15.43a.978.978 0 0 1-.977.977H2.93a.978.978 0 0 1-.977-.977v-8.3h21.094v8.3Zm0-11.23H1.953V6.75c0-.538.438-.977.977-.977h19.14c.539 0 .977.439.977.977v1.27Z"
      fill="currentColor"
    />
    <path d="M16.21 12.414H3.32v1.953h12.89v-1.953Z" fill="#fff" />
  </svg>
);
