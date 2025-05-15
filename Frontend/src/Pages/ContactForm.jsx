import React, { useState } from "react";

export default function ContactForm() {
  const [error, setError] = useState({ value: "", message: "" });
  const [form, setForm] = useState({
    name: "",
    email: "",
  });

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.name === "" || form.name.length === 0) {
      setError({ value: "name", message: `Name is required !` });
    } else if (form.email === "" || form.email.length === 0) {
      setError({ value: "email", message: `Email is required !` });
    } else {
      setError({ value: "", message: "" });
      return alert("Succses");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <form className="flex flex-col gap-y-4" onSubmit={handleSubmit}>
        <label htmlFor="Name">
          <span className="font-medium text-gray-700"> Name </span>
          {error.message && error.value === "name" && (
            <p className="text-red-800 text-sm">{error.message}</p>
          )}
          <input
            id="Name"
            className="p-1 mt-0.5 w-full rounded border shadow-sm sm:text-sm"
            onChange={handleChange}
            value={form.name}
            type="text"
            name="name"
          />
        </label>
        <label htmlFor="Email">
          <span className="font-medium text-gray-700"> Email </span>
          {error.message && error.value === "email" && (
            <p className="text-red-800 text-sm">{error.message}</p>
          )}
          <input
            id="Email"
            className="p-1 mt-0.5 w-full rounded border shadow-sm sm:text-sm"
            onChange={handleChange}
            value={form.email}
            type="text"
            name="email"
          />
        </label>
        <button
          type="submit"
          className="inline-block rounded-sm border border-indigo-600 bg-indigo-600 py-2 text-sm font-medium text-white hover:bg-transparent hover:text-indigo-600 focus:ring-3 focus:outline-hidden"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
