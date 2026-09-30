import React from 'react';

interface LogoIconProps {
  className?: string;
  size?: number;
  color?: string;
}

export const LogoIcon: React.FC<LogoIconProps> = ({
  className = 'w-9 h-9',
  size,
  color = '#10B981' // Vibrant Emerald Green
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Outer circular arcs matching reference image */}
      <path
        d="M 50 20 A 30 30 0 1 0 35 74"
        stroke={color}
        strokeWidth="7"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M 77 42 A 30 30 0 0 1 48 78"
        stroke={color}
        strokeWidth="7"
        strokeLinecap="round"
        fill="none"
      />
      {/* Central Sharp Lightning Bolt matching reference image */}
      <path
        d="M 62 13 L 31 52 H 70 L 37 87 L 52 46 H 31 Z"
        fill={color}
        stroke={color}
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
};
