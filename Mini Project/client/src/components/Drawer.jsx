import React from "react";

export default function Drawer({ data, handleCloseDrawer }) {
  return (
    <div
      id="drawer-example"
      className="border fixed top-0 bottom-0 left-0 z-40 h-screen p-4 overflow-y-auto transition-transform bg-white w-80"
      tabIndex="-1"
      aria-labelledby="drawer-label"
    >
      <h5
        id="drawer-label"
        className="inline-flex items-center mb-4 text-base font-semibold text-gray-500"
      >
        <svg
          className="w-4 h-4 me-2.5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
        </svg>
        Info Detail Todo
      </h5>
      <button
        onClick={handleCloseDrawer}
        type="button"
        data-drawer-hide="drawer-example"
        aria-controls="drawer-example"
        className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 absolute top-2.5 end-2.5 flex items-center justify-center"
      >
        <svg
          className="w-3 h-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 14"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
          />
        </svg>
        <span className="sr-only">Close menu</span>
      </button>

      <div className="space-y-4">
        <div className="space-y-1">
          <h1 className="font-bold">Name</h1>
          <p className="py-1 px-2 border rounded-lg">{data.name}</p>
        </div>
        <div className="space-y-1">
          <h1 className="font-bold">Description</h1>
          <p className="py-1 px-2 border rounded-lg">{data.description}</p>
        </div>
      </div>
    </div>
  );
}
