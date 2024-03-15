// TableRow.tsx
import React from "react";

export default function TableRow({ data, onClick }) {
  return (
    <td className="px-6 py-4 text-sm font-normal text-black " onClick={onClick}>
      {data}
    </td>
  );
}
