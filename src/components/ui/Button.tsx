"use client";

import clsx from "clsx";

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
}

export default function Button({ onClick, children, className }: ButtonProps) {
  return (
    <button
      role="button"
      onClick={onClick}
      className={clsx(
        "px-6 py-3 bg-primary text-white font-semibold rounded-md shadow-lg hover:bg-blue-600 focus:ring-blue-400 focus:ring-2 focus:outline-none active:bg-primary",
        className
      )}
    >
      {children}
    </button>
  );
}
