import React from "react";

const TableHeader = ({ headers }) => (
  <thead>
    <tr>
      {headers.map((header, index) => (
        <th
          key={index}
          className="px-6 py-3 text-sm font-medium text-black border-[1px]  border-stroke bg-gray_bg text-start"
        >
          {header}
        </th>
      ))}
    </tr>
  </thead>
);

export default TableHeader;
