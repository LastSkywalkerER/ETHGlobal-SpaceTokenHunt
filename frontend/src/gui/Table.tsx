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
    <div className="relative overflow-x-auto">
      <table className="w-full text-sm text-left rtl:text-right text-gray-400">
        <thead className="text-xs uppercase bg-gray-700 text-gray-400">
          <tr>
            {config.map(({ accessor, header }) => (
              <th key={accessor} scope="col" className="px-6 py-3">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((rowData, index) => {
            return (
              <tr key={index} className="border-b bg-gray-800 border-gray-700">
                {config.map(({ accessor, cell }) => {
                  return (
                    <td key={`${accessor}-${index}`} className="px-6 py-4">
                      {cell({ data: rowData[accessor], row: rowData, index, accessor })}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
