// components/UI/AuthInput.tsx
"use client";
import { InputHTMLAttributes } from "react";

interface AuthInputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: JSX.Element;
}

export default function AuthInput({
  icon,
  className,
  ...props
}: AuthInputProps) {
  return (
    <div className="relative">
      {icon && (
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
          {icon}
        </span>
      )}
      <input
        {...props}
        className={`input input-bordered w-full pl-10 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#ff8198] transition-all ${
          className || ""
        }`}
      />
    </div>
  );
}
