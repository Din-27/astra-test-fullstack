import React from "react";
import Motto from "@/assets/images/motto.png";

export default function Home() {
  return (
    <div
      className="min-h-screen bg-center bg-no-repeat bg-gray-700 bg-blend-multiply"
      style={{ backgroundImage: `url(${Motto})` }}
    ></div>
  );
}
