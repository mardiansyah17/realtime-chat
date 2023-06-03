import React from "react";

export default function Input({ placeholder }) {
  return (
    <input
      placeholder={placeholder}
      type="text"
      className="outline-none border border-green-500 p-1 rounded-md active:border-green-600 w-full"
    />
  );
}
