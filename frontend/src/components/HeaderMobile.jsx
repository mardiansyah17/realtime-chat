import React from "react";
import { FaBars, FaPlus, Faplus } from "react-icons/fa";
import useSidebar from "@/hooks/useSidebar";
export default function HeaderMobile() {
  const { isOpen, onOpen } = useSidebar();

  return (
    <div className="flex items-center justify-between px-3 border-b border-b-gray-200 shadow-sm p-3 md:hidden">
      <FaBars size={20} onClick={onOpen} />
      <span>New Chat</span>
      <FaPlus size={20} className="text-green-500" onClick={() => console.log("first")} />
    </div>
  );
}
