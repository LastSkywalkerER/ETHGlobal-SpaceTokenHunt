import cx from "classnames";
import { FC, HTMLAttributes, useEffect, useState } from "react";

import { Users } from "../shared/api/Users";
import { Avatar } from "./Avatar";
import { GuiCard } from "./GuiCard";
import { Table, TableConfig } from "./Table";

const config: TableConfig[] = [
  {
    accessor: "logo",
    cell: ({ row }) => <Avatar walletAddress={String(row["walletAddress"])} />,
    header: "Logo",
  },
  {
    accessor: "walletAddress",
    cell: ({ data }) => String(data).replace(String(data).slice(5, -3), "..."),
    header: "Wallet address",
  },
  {
    accessor: "totalBalance",
    cell: ({ data }) => Number(data).toFixed(2),
    header: "Total balance",
  },
];

export const RatingBoard: FC<HTMLAttributes<HTMLDivElement>> = (props) => {
  const [ratingData, setRatingData] = useState(
    [] as {
      id: number;
      totalBalance: string;
      walletAddress: string;
    }[],
  );

  useEffect(() => {
    const init = async () => {
      const data = await Users.ratingBoard();

      setRatingData(data);
    };

    init();
  }, []);

  return (
    <GuiCard {...props} className={cx("w-[min(92vw,460px)] p-0", props.className)}>
      <div className="border-b border-white/10 px-5 py-3">
        <h2 className="hud-title">Rating board</h2>
      </div>
      <div className="max-h-[60vh] overflow-auto px-2 pb-2">
        <Table config={config} data={ratingData} />
      </div>
    </GuiCard>
  );
};
