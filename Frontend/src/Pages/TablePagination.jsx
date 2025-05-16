import axios from "axios";
import React, { useEffect, useState } from "react";
import { API } from "../lib/axios";
import PaginationComponent from "@/components/Pagination";
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
import { toast } from "sonner";

export default function TablePagination() {
  const LIMIT = 10;
  const [todos, setTodos] = useState({ data: [], total: 0 });
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const TOTAL_PAGE = todos.total / LIMIT;

  const handleGetData = async () => {
    setLoading(true);
    try {
      const total = await API.get("/todos");
      const data = await API.get("/todos", {
        params: {
          _page: page,
          _limit: LIMIT,
        },
      });
      if (data.status === 200) {
        setTodos({ data: data.data, total: total.data.length });
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          toast.error(error.response.data.message || error.message);
        } else if (error.request) {
          toast.error("No response from server");
        } else {
          toast.error("Error setting up request:" + error.message);
        }
      } else {
        toast.error("Unexpected error:" + error);
      }
    } finally {
      setLoading(false);
    }
  };

  const onChangePage = (p) => {
    setPage(p);
    handleGetData();
  };

  useEffect(() => {
    handleGetData();
  }, [page]);

  return (
    <div className="flex justify-center w-full h-[100vh] my-6">
      <div className="w-3/5 my-auto">
        <h2 className="font-bold text-xl mb-2">Todo - Page {page}</h2>
        {todos.data && loading ? (
          <div className="flex justify-center mx-auto w-full h-[55vh] items-center">
            <Spinner />
          </div>
        ) : (
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
              {todos.data.map((item, index) => (
                <TableRow className={"border border-gray-800"} key={index}>
                  <TableCell>{item.id}.</TableCell>
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
        )}
        <PaginationComponent
          currentPage={page}
          totalPages={TOTAL_PAGE}
          onPageChange={(p) => onChangePage(p)}
        />
      </div>
    </div>
  );
}
