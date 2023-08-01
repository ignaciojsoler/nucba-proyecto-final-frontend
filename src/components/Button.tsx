import { ReactElement } from "react";

interface ButtonProps {
  title: string;
  disabled?: boolean;
  onPress: () => void;
  color?: "primary" | "secondary" | "light" | "dark" | "transparent";
  size?: "small" | "medium" | "large";
  icon?: ReactElement<unknown, never>;
  className?: string;
}

export const Button = (props: ButtonProps) => {
  const { title = "", disabled = false, onPress, color, size, icon, className } = props;
  return (
    <button
      {...props}
      disabled={disabled}
      onClick={onPress}
      className={`
    ${size === "small" ? "py-2 px-5 text-sm font-semibold" : size === "large" ? "py-6 px-20 text-xl font-semibold" : "py-4 px-12 text-lg font-semibold"}
    ${
         color === "secondary"
        ? " bg-emerald-300 text-slate-800 hover:bg-emerald-200"
        : color === "dark"
        ? "bg-slate-800 hover:bg-slate-700"
        : color === "light"
        ? "bg-slate-200 text-slate-800 hover:bg-slate-300"
        : color === "transparent" 
        ? "bg-transparent text-emerald-500 font-bold hover:text-emerald-300"
        : "bg-emerald-600 hover:bg-emerald-500"
    }
    ${className || ""}
    transition-color duration-200 rounded-3xl min-w-120 active:opacity-80
    `}
    >
      {icon} {title}
    </button>
  );
};
