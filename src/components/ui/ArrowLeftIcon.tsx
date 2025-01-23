"use client";

interface ArrowLeftProps {
    height?: number;
    width?: number;
    className?: string;
}

export default function ArrowLeftIcon({ height = 24, width = 24, className }: ArrowLeftProps) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className={className}
            width={width}
            height={height}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M19 12H6M12 5l-7 7 7 7" />
        </svg>
    );
}