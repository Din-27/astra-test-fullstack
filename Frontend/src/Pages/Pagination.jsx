import axios from "axios";
import React, { useEffect, useState } from "react";
import { API } from "../libs/axios";

const RenderPageNumbers = ({ totalPage, goToPage, page, pageNumber }) => {
  const pages = [];

  for (let i = 1; i <= totalPage; i++) {
    pages.push(
      <button
        key={i}
        onClick={() => goToPage(i)}
        className={`px-3 py-1 rounded border ${
          i === page ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-800"
        }`}
      >
        {i}
      </button>
    );
  }

  return pages.slice(pageNumber, 3 + pageNumber);
};

export default function Pagination() {
  const LIMIT = 10;
  const [todos, setTodos] = useState({ data: [], total: 0 });
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [pageNumber, setPagePageNumber] = useState(0);
  const TOTAL_PAGE = todos.total / LIMIT;

  const handleGetData = async () => {
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
          setError(error.response.data.message || error.message);
        } else if (error.request) {
          setError("No response from server");
        } else {
          setError("Error setting up request:" + error.message);
        }
      } else {
        setError("Unexpected error:" + error);
      }
    }
  };

  const goToPage = (pageNum) => {
    if (pageNum >= 1 && pageNum <= todos.total) {
      setPage(pageNum);
    }
  };

  useEffect(() => {
    handleGetData();
  }, [page]);

  return (
    <div className="min-h-screen flex justify-center m-4">
      {todos.length === 0 ? (
        <h1 className="my-auto">{error ? error : "Loading..."}</h1>
      ) : (
        <ol>
          <h1 className="text-xl font-bold mb-4">Todos - Page {page}</h1>
          {todos.data.map((item, index) => (
            <li className="border p-1" key={index}>
              <span>{item.id}. </span>
              {item.title}
            </li>
          ))}
          <div className="my-4 space-x-3">
            <button
              className={`px-3 py-1 rounded border bg-blue-800 text-white`}
              onClick={() => setPagePageNumber((prev) => Math.max(1, prev - 1))}
            >
              Previous
            </button>
            <RenderPageNumbers
              page={page}
              pageNumber={pageNumber}
              goToPage={goToPage}
              totalPage={TOTAL_PAGE}
            />
            <button
              className={`px-3 py-1 rounded border bg-blue-800 text-white`}
              onClick={() =>
                setPagePageNumber((prev) => (prev + 1 === 18 ? 17 : prev + 1))
              }
            >
              Next
            </button>
          </div>
        </ol>
      )}
    </div>
  );
}
