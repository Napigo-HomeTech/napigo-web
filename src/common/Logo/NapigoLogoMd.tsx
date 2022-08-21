import React from "react";
import { LogoProps } from "./types";

export const NapigoLogoMd: React.FC<LogoProps> = (props) => {
  const { className, handleClick } = props;

  return (
    <svg
      {...props}
      width={153}
      height={47}
      onClick={handleClick}
      className={`${className ?? ""}`}
      fill="none"
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
      <path
        d="M61.06 28.259h-.405l-7.213-8.255v8.255h-1.368v-11.38h.404l7.26 8.364v-8.364h1.321v11.38Zm20.322 0h-1.415L78.21 24.45h-4.694l-1.742 3.809h-1.477l5.38-11.83h.404l5.3 11.83Zm-3.778-5.162-1.725-3.84-1.742 3.84h3.467ZM90.62 16.88h2.332c1.327 0 2.197.052 2.612.155.414.104.793.29 1.135.56.352.27.627.607.824 1.01.197.405.295.86.295 1.369 0 .508-.099.964-.295 1.368a2.598 2.598 0 0 1-.824 1.01c-.353.26-.788.446-1.306.56-.519.104-1.436.155-2.752.155h-.684v5.193H90.62v-11.38Zm1.337 4.897h1.772c1.047.02 1.757-.145 2.13-.497a1.72 1.72 0 0 0 .575-1.322c0-1.181-.87-1.772-2.611-1.772h-1.866v3.591Zm16.818 6.483h-1.337v-11.38h1.337v11.38Zm21.789-5.566c-.031 1.845-.57 3.28-1.617 4.307-1.036 1.026-2.404 1.539-4.104 1.539-1.948 0-3.503-.596-4.664-1.788-1.16-1.202-1.741-2.607-1.741-4.213 0-1.607.581-2.995 1.741-4.166 1.161-1.182 2.659-1.773 4.493-1.773.995 0 1.918.187 2.767.56.861.363 1.7.922 2.519 1.679l-1.026.98a6.944 6.944 0 0 0-2.052-1.4 5.473 5.473 0 0 0-2.27-.497c-.777 0-1.549.207-2.316.622a4.704 4.704 0 0 0-1.804 1.678 4.272 4.272 0 0 0-.653 2.286c0 1.275.477 2.389 1.431 3.342.963.943 2.166 1.415 3.606 1.415 1.068 0 1.99-.29 2.768-.87.777-.591 1.254-1.395 1.43-2.41h-3.545v-1.29h5.037Zm15.081-6.094c1.109 0 2.13.264 3.063.793a5.64 5.64 0 0 1 2.192 2.161c.539.922.808 1.928.808 3.016a5.928 5.928 0 0 1-.793 3 5.772 5.772 0 0 1-2.176 2.177 5.964 5.964 0 0 1-3.016.793 6.111 6.111 0 0 1-3.016-.778 5.77 5.77 0 0 1-2.192-2.16 5.928 5.928 0 0 1-.793-3c0-1.09.264-2.095.793-3.017a5.772 5.772 0 0 1 2.161-2.192 5.873 5.873 0 0 1 2.969-.793Zm.047 10.634c1.295 0 2.389-.44 3.28-1.322.902-.88 1.353-1.984 1.353-3.31 0-1.328-.456-2.442-1.369-3.343-.901-.902-1.989-1.353-3.264-1.353-1.306 0-2.4.456-3.28 1.368-.871.902-1.306 2.006-1.306 3.311 0 1.296.45 2.395 1.352 3.296.902.902 1.98 1.353 3.234 1.353Z"
        fill="currentColor"
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
