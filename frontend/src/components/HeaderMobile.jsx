import React from "react";
import { FaBars, FaPlus, Faplus } from "react-icons/fa";
import useSidebar from "@/hooks/useSidebar";
import { useSelector } from "react-redux";
export default function HeaderMobile() {
  const { isOpen, onOpen } = useSidebar();
  const selector = useSelector((state) => state);
  const user = selector.messages.user;
  return (
    <div className="flex items-center justify-between p-3 px-3 border-b shadow-sm border-b-gray-200 sm:hidden">
      <FaBars size={20} onClick={onOpen} />
      <span>{user ? user.name : ""}</span>
      <FaPlus size={20} className="text-green-500" />
    </div>
  );
}
