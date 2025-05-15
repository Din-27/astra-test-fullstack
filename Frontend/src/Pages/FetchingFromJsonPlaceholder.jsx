import React, { useEffect, useState } from "react";
import axios from "axios";
import { API } from "../libs/axios";

export default function FetchingFromJsonPlaceholder() {
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState("");

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
    }
  };

  useEffect(() => {
    handleGetData();
  }, []);

  return (
    <div className="min-h-screen flex justify-center m-4">
      {todos.length === 0 ? (
        <h1 className="my-auto">{error ? error : "Loading..."}</h1>
      ) : (
        <ol className="list-decimal">
          {todos.map((item, index) => (
            <li className="border p-1" key={index}>
              {item.title}
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
