import { FC, ReactNode } from "react";

export type DataType = string | number | Record<string, string | number>;

export interface TableConfig {
  accessor: string;
  header: string | ReactNode;
  cell: (props: {
    data: DataType;
    accessor: string;
    row: TableData;
    index: number;
  }) => string | ReactNode;
}

export type TableData = Record<TableConfig["accessor"], DataType>;

export const Table: FC<{ config: TableConfig[]; data: TableData[] }> = ({ config, data }) => {
  return (
    <table className="w-full border-separate border-spacing-0 text-left text-sm">
      <thead>
        <tr>
          {config.map(({ accessor, header }) => (
            <th
              key={accessor}
              scope="col"
              className="sticky top-0 z-10 whitespace-nowrap bg-space-800/90 px-4 py-3 font-display text-[11px] font-semibold uppercase tracking-wider text-neon-cyan/80 backdrop-blur-md first:rounded-tl-lg last:rounded-tr-lg"
            >
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.length === 0 && (
          <tr>
            <td colSpan={config.length} className="px-4 py-8 text-center text-sm text-white/40">
              No data yet
            </td>
          </tr>
        )}
        {data.map((rowData, index) => {
          return (
            <tr key={index} className="group transition-colors hover:bg-white/[0.04]">
              {config.map(({ accessor, cell }) => {
                return (
                  <td
                    key={`${accessor}-${index}`}
                    className="whitespace-nowrap border-b border-white/5 px-4 py-3 align-middle text-white/85"
                  >
                    {cell({ data: rowData[accessor], row: rowData, index, accessor })}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
