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
    <GuiCard
      {...props}
      className={cx("overflow-auto max-h-[500px] max-w-[400px]", props.className)}
    >
      <Table config={config} data={ratingData} />
    </GuiCard>
  );
};
