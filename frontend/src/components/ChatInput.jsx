import React from "react";
import Input from "./Input";
import { FaPaperPlane } from "react-icons/fa";
export default function ChatInput({ handleMsg, msgOnChange, message }) {
  return (
    <form
      className=" border-t border-t-gray-200 p-3 flex items-center space-x-4 px-5"
      action=""
      onSubmit={handleMsg}
    >
      <input
        placeholder={"Masukan pesan anda"}
        onChange={msgOnChange}
        type="text"
        value={message}
        className="outline-none border border-green-500 p-1 rounded-md active:border-green-600 w-full"
      />
      <button type="submit">
        <FaPaperPlane className="text-green-500" />
      </button>
    </form>
  );
}
