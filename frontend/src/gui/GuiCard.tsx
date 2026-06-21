import cx from "classnames";
import { FC, HTMLAttributes } from "react";

export const GuiCard: FC<HTMLAttributes<HTMLDivElement>> = ({ children, className, ...props }) => {
  return (
    <div {...props} className={cx("glass p-4", className)}>
      {children}
    </div>
  );
};
