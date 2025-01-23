"use client";

import clsx from "clsx";

interface CheckmarkIconProps {
  height?: number;
  width?: number;
  className?: string;
}

export default function CheckmarkIcon({
  height = 24,
  width = 24,
  className,
}: CheckmarkIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox={`0 0 ${height} ${width}`}
      strokeWidth="1.5"
      stroke="currentColor"
      className={clsx("size-6", className)}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m5.5 12.5 3 3 6-6"
      />
    </svg>
  );
}
