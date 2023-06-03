import { API_URL } from "@/contstant";
import axios from "axios";
import React from "react";
import { BiDotsHorizontal, BiDotsVertical, BiExit, BiLogIn } from "react-icons/bi";
import { useDispatch } from "react-redux";
export default function ConversationItem({ conversation }) {
  const dispatch = useDispatch();
  const getConversation = async () => {
    await axios
      .get(`${API_URL}/conversation/get-conversation`, {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoibWFyZGlhbnN5YWhtMDAyQGdtYWlsLmNvbSIsIm5hbWUiOiJNdWhhbW1hZCBNYXJkaWFuc3lhaCIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS9BQWNIVHRmd1dKOXhGT3VodTFad3h3Um93Wk9pNVh4X3JhWTcwWmhuN3Budj1zOTYtYyJ9LCJpYXQiOjE2ODU4MDk0Nzh9.O78yAVhXzBMiquAgrWxolXl8wULN_lKNu2K9PFvWAHE`,
        },
        params: {
          conversationId: conversation.conversationId,
        },
      })
      .then((data) => {
        dispatch({ type: "SET_CONVERSATION", payload: data.data });
        console.log(data.data);
      });
  };
  return (
    <li
      onClick={getConversation}
      className="flex items-center justify-between h-10 rounded-md active:bg-green-100/50 active:bg-opacity-10 p- mb-3 border-b border-green-300 rounded-b-none"
    >
      <span>{conversation.user.name}</span>
      <BiDotsVertical />
    </li>
  );
}
