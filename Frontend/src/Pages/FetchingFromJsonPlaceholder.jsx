import React, { useEffect, useState } from "react";
import axios from "axios";
import { API } from "../lib/axios";
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
import Spinner from "@/components/Spinner";

export default function FetchingFromJsonPlaceholder() {
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const handleGetData = async () => {
    try {
      const data = await API.get("/todos");
      if (data.status === 200) {
        setTodos(data.data);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          setError(error.response.data.message || error.message);
        } else if (error.request) {
          setError("No response from server");
        } else {
          setError("Error setting up request:" + error.message);
        }
      } else {
        setError("Unexpected error:" + error);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleGetData();
  }, []);

  return error ? (
    <div className="flex justify-center w-full min-h-screen items-center">
      <h1>{error}</h1>
    </div>
  ) : loading ? (
    <div className="flex justify-center w-full min-h-screen items-center">
      <Spinner />
    </div>
  ) : (
    <div className="flex justify-center w-full min-h-screen my-24">
      <div className="w-3/5 my-auto">
        <Table>
          <TableCaption>A list of your recent name.</TableCaption>
          <TableHeader>
            <TableRow className={"border border-gray-800"}>
              <TableHead className="w-[10px]">No</TableHead>
              <TableHead className="w-[100px] text-left">Title</TableHead>
              <TableHead className={"text-center"}>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className={"border border-gray-800"}>
            {todos.map((item, index) => (
              <TableRow className={"border border-gray-800"} key={index}>
                <TableCell>{index + 1}.</TableCell>
                <TableCell className="font-medium text-left">
                  {item.title}
                </TableCell>
                <TableCell className={"text-right w-[10px]"}>
                  <span>
                    {item.completed ? (
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
                        className="icon icon-tabler icons-tabler-outline icon-tabler-check"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M5 12l5 5l10 -10" />
                      </svg>
                    ) : (
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
                        className="icon icon-tabler icons-tabler-outline icon-tabler-x"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M18 6l-12 12" />
                        <path d="M6 6l12 12" />
                      </svg>
                    )}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
