import React from "react";
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

export default function ItemList({ data: dataList }) {
  const [data, setData] = useState(dataList);

  const handleDelete = (index) => {
    setData(data.filter((_, itemIndex) => itemIndex !== index));
  };

  return (
    <div className="flex justify-center w-full min-h-screen">
      <div className="w-2/5 my-auto">
        <Table>
          <TableCaption>A list of your recent name.</TableCaption>
          <TableHeader>
            <TableRow className={"border border-gray-800"}>
              <TableHead className="w-[100px]">No</TableHead>
              <TableHead className="w-[100px] text-center">Name</TableHead>
              <TableHead className={"text-right"}>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className={"border border-gray-800"}>
            {data.map((item, index) => (
              <TableRow className={"border border-gray-800"} key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell className="font-medium text-center">
                  {item.name}
                </TableCell>
                <TableCell className={"text-right"}>
                  <Button onClick={() => handleDelete(index)}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="icon icon-tabler icons-tabler-outline icon-tabler-trash"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M4 7l16 0" />
                      <path d="M10 11l0 6" />
                      <path d="M14 11l0 6" />
                      <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                      <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                    </svg>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
