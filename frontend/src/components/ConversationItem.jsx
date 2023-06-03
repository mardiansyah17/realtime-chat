import { API_URL } from "@/contstant";
import axios from "axios";
import React from "react";
import { BiDotsHorizontal, BiDotsVertical, BiExit, BiLogIn } from "react-icons/bi";
export default function ConversationItem({ conversation }) {
  const getConversation = async () => {
    // axios.get(`${API_URL}/get-conversation`,{
    //     he
    // })
  };
  return (
    <li className="flex items-center justify-between h-10 rounded-md active:bg-green-100/50 active:bg-opacity-10 p- mb-3 border-b border-green-300 rounded-b-none">
      <span>{conversation.user.name}</span>
      <BiDotsVertical />
    </li>
  );
}
