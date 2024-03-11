import React from "react";

export default function TableImage({ data }) {
  return (
    <td className="px-6 py-4 text-sm font-normal text-black">
      <img src={data} alt="" className="w-[12vh] h-[12vh] rounded-md" />
    </td>
  );
}
