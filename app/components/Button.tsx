"use client";

import React, { forwardRef } from "react";
import { IconType } from "react-icons";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isOutline?: boolean;
  isSmall?: boolean;
  icon?: IconType;
  label?: string;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      disabled,
      type = "button",
      isOutline,
      isSmall,
      icon: Icon,
      label,
      ...props
    },
    ref
  ) => {
    return (
      <button
        disabled={disabled}
        {...props}
        ref={ref}
        className={`relative disabled:opacity-70 disabled:cursor-not-allowed rounded-lg hover:opacity-80 transition w-full ${
          isOutline ? "bg-white" : "bg-rose-500"
        }
        ${isOutline ? "border-black" : "border-rose-500"}
        ${isOutline ? "text-black" : "text-white"}
        ${isSmall ? "py-1" : "py-3"}
        ${isSmall ? "text-sm" : "text-md"}
        ${isSmall ? "font-light" : "font-semibold"}
        ${isSmall ? "border-[1px]" : "border-[2px]"}
        `}
      >
        {Icon && <Icon size={24} className="absolute left-4 top-3" />}
        {label}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;

// interface ButtonProps {
//   label: string;
//   onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
//   disabled?: boolean;
//   outline?: boolean;
//   small?: boolean;
//   icon?: IconType;
// }

// const Button: React.FC<ButtonProps> = ({
//   label,
//   onClick,
//   disabled,
//   icon,
//   outline,
//   small,
// }) => {
//   return <button>{label}</button>;
// };

// export default Button;
