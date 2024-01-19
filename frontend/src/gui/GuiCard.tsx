import { FC, HTMLAttributes } from "react";
import cx from "classnames";

export const GuiCard: FC<HTMLAttributes<HTMLDivElement>> = ({ children, className, ...props }) => {
  return (
    <div
      {...props}
      className={cx("bg-gray-800 bg-opacity-75 rounded-lg p-4 border border-gray-600", className)}
    >
      {children}
    </div>
  );
};