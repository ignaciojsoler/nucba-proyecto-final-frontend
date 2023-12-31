import { ReactElement } from "react";

interface ButtonProps {
  title?: string;
  disabled?: boolean;
  onClick: () => void;
  color?: "primary" | "secondary" | "light" | "dark" | "transparent" | "neutral" | "outline";
  size?: "small" | "medium" | "large";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon?: ReactElement<unknown, any>;
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
        ? "text-sm px-4 h-12 min-w-30 font-semibold"
        : size === "large"
        ? "px-8 min-w-50 h-20 text-xl font-semibold"
        : "px-6 min-w-40 h-14 font-semibold"
    }
    ${
      color === "secondary"
        ? " bg-purple-900 text-slate-200 hover:bg-purple-800"
        : color === "dark"
        ? "bg-slate-900 hover:bg-slate-800"
        : color === "neutral"
        ? "bg-slate-800 hover:bg-slate-700"
        : color === "light"
        ? "bg-slate-200 text-slate-800 hover:bg-slate-300"
        : color === "outline"
        ? "bg-transparent text-emerald-600 font-bold border-2 border-emerald-600 hover:text-emerald-500 hover:border-emerald-500"
        : color === "transparent"
        ? "bg-transparent text-slate-200 font-bold hover:text-slate-300"
        : "bg-emerald-600 text-slate-200 hover:bg-emerald-500"
    }
    ${className || ""}
    ${widthFull ? "w-full" : ""}
    inline-flex space-x-2 justify-center items-center transition-color duration-200 rounded-lg active:opacity-80
    `}
    >
      <p>{icon}</p> <p>{title}</p> <p>{children}</p>
    </button>
  );
};
