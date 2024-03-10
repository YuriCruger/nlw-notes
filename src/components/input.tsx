import { InputHTMLAttributes } from "react";
import { cn } from "../utils/cn";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  placeholder: string;
  className?: string;
  type: string;
}

export function Input({
  id,
  placeholder,
  className,
  type,
  register,
  ...props
}: InputProps & { register?: any }) {
  return (
    <input
      {...props}
      {...register}
      id={id}
      type={type}
      placeholder={placeholder}
      className={cn(
        "bg-slate-700 placeholder:text-white placeholder:text-opacity-60 w-full p-3 rounded-md focus:outline-none focus:ring-2 ring-emerald-600 transition-all",
        className
      )}
    />
  );
}
