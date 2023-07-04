import React from "react";
import { FcGoogle } from "react-icons/fc";
export default function Page() {
  return (
    <div className="flex items-center justify-center h-screen ">
      <button
        className="flex items-center px-3 py-2 text-white bg-green-400 rounded-md"
        onClick={() => window.open("http://localhost:5000/login/google", "_self")}
      >
        <span className="mr-3">Login dengan Google</span>
        <FcGoogle size={25} />
      </button>
    </div>
  );
}
