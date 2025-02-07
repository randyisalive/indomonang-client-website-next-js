import React from "react";

const TableComponentNew = ({
  columns = [],
  data = [],
  title = "Table Title",
  search_bar = true,
}) => {
  return (
    <div className="overflow-x-auto">
      <>
        {title && (
          <div className="my-3">
            <span className=" font-bold text-xl underline">{title}</span>
          </div>
        )}

        {search_bar && (
          <div className="my-3">
            <input
              type="text"
              className="p-3 border rounded-full text-sm pl-3 "
              placeholder="Search..."
            />
          </div>
        )}
      </>

      <table className="min-w-full bg-white border border-gray-200">
        {/* Table Header */}
        <thead className="bg-gray-50">
          <tr>
            {columns.map((column, index) => (
              <th
                key={index}
                className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider"
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>

        {/* Table Body */}
        <tbody className="divide-y divide-gray-200">
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((column, colIndex) => (
                <td
                  key={colIndex}
                  className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                >
                  {column.render ? column.render(row) : row[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableComponentNew;
