import cx from "classnames";
import { FC, HTMLAttributes } from "react";

export const GuiButton: FC<HTMLAttributes<HTMLButtonElement>> = ({
  children,
  className,
  ...props
}) => (
  <button
    className={cx(
      "bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded",
      className,
    )}
    {...props}
  >
    {children}
  </button>
);
