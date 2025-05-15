import React from "react";
import { useState } from "react";

export default function ItemList() {
  const [data, setData] = useState([
    { name: "Apple" },
    { name: "Banana" },
    { name: "Cherry" },
  ]);

  const handleDelete = (index) => {
    setData(data.filter((_, itemIndex) => itemIndex !== index));
  };

  return (
    <ul className="text-center">
      {data.map((item, index) => (
        <li key={index}>
          <span>-</span> {item.name}{" "}
          <span onClick={() => handleDelete(index)} className="cursor-pointer">
            hapus
          </span>
        </li>
      ))}
    </ul>
  );
}
