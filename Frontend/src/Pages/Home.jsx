import React from "react";
import { routes } from "../App";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="flex justify-center min-h-screen items-center">
      <ul>
        <h1 className="text-lg font-bold">Navigasi</h1>
        {routes.map((item, index) => (
          <Link key={index} to={item.path}>
            <li className="border px-2 py-1 hover:bg-purple-400">
              {item.path}
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
}
