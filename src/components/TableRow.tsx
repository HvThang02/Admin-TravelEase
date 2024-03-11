// TableRow.tsx
import React from "react";

const TableRow = ({ data, onClick }) => (
  <td className="px-6 py-4 text-sm font-normal text-black " onClick={onClick}>
    {data}
  </td>
);

export default TableRow;
