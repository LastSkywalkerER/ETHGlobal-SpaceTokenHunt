import cx from "classnames";
import { FC } from "react";

export const Avatar: FC<{ walletAddress: string; className?: string }> = ({
  walletAddress,
  className,
}) => {
  return (
    <img
      className={cx(
        "h-12 w-12 rounded-full border border-neon-cyan/40 bg-space-900 object-cover p-0.5",
        className,
      )}
      src={`https://robohash.org/${walletAddress}`}
      alt="avatar"
    />
  );
};
