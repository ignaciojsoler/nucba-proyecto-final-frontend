import { ReactElement } from "react";

interface ButtonProps {
  title?: string;
  disabled?: boolean;
  onClick: () => void;
  color?: "primary" | "secondary" | "light" | "dark" | "transparent";
  size?: "small" | "medium" | "large";
  icon?: ReactElement<unknown, never>;
  className?: string;
  children?: ReactElement,
  widthFull?: boolean
}

export const Button = (props: ButtonProps) => {
  const {
    title = "",
    disabled = false,
    onClick,
    color,
    size,
    icon,
    className,
    children,
    widthFull
  } = props;
  return (
    <button
      {...props}
      disabled={disabled}
      onClick={onClick}
      className={`
    ${
      size === "small"
        ? "text-sm font-semibold"
        : size === "large"
        ? " text-xl font-semibold"
        : "min-w-40 h-14 font-semibold"
    }
    ${
      color === "secondary"
        ? " bg-emerald-300 text-slate-800 hover:bg-emerald-200"
        : color === "dark"
        ? "bg-slate-800 hover:bg-slate-700"
        : color === "light"
        ? "bg-slate-200 text-slate-800 hover:bg-slate-300"
        : color === "transparent"
        ? "bg-transparent text-slate-200 font-bold hover:text-slate-300"
        : "bg-emerald-600 text-slate-200 hover:bg-emerald-500"
    }
    ${className || ""}
    ${widthFull ? "w-full" : ""}
    transition-color duration-200 rounded-lg active:opacity-80
    `}
    >
      {icon} {title} {children}
    </button>
  );
};
