import cx from "classnames";
import { ButtonHTMLAttributes, FC } from "react";

type Variant = "primary" | "secondary" | "ghost";

interface GuiButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
}

const variants: Record<Variant, string> = {
  primary:
    "bg-neon-cyan/15 text-neon-cyan border border-neon-cyan/40 hover:bg-neon-cyan/25 hover:shadow-glow-cyan",
  secondary:
    "bg-white/5 text-white/90 border border-white/15 hover:bg-white/10 hover:border-white/30",
  ghost: "bg-transparent text-white/70 border border-transparent hover:bg-white/5 hover:text-white",
};

export const GuiButton: FC<GuiButtonProps> = ({
  children,
  className,
  variant = "primary",
  ...props
}) => (
  <button
    className={cx(
      "font-display text-sm font-semibold uppercase tracking-wider rounded-lg py-2 px-4",
      "transition-all duration-150 active:scale-95 disabled:opacity-40 disabled:pointer-events-none",
      variants[variant],
      className,
    )}
    {...props}
  >
    {children}
  </button>
);
