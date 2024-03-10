import { LabelHTMLAttributes } from "react";

interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  htmlFor: string;
  title: string;
}

export function Label({ htmlFor, title }: LabelProps) {
  return (
    <label htmlFor={htmlFor} className="text-opacity-60 text-white">
      {title}
    </label>
  );
}
