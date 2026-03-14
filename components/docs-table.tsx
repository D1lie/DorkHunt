import { ReactNode } from "react";

interface DocsTableProps {
  headers: string[];
  rows: string[][];
}

export function DocsTable({ headers, rows }: DocsTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b border-green-500/30">
            {headers.map((header, i) => (
              <th
                key={i}
                className="text-left py-3 px-4 text-sm font-semibold text-green-400 bg-green-500/5"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr
              key={i}
              className="border-b border-green-500/10 hover:bg-green-500/5 transition-colors"
            >
              {row.map((cell, j) => (
                <td
                  key={j}
                  className="py-3 px-4 text-sm text-gray-300 font-mono"
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
