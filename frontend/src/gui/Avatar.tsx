import { FC } from "react";

export const Avatar: FC<{ walletAddress: string }> = ({ walletAddress }) => {
  return (
    <img
      className={"w-[50px] h-[50px]"}
      src={`https://robohash.org/${walletAddress}`}
      alt="avatar"
    />
  );
};
