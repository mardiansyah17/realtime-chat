import { API_URL } from "@/contstant";
import useSidebar from "@/hooks/useSidebar";
import axios from "axios";
import React from "react";
import { BiDotsHorizontal, BiDotsVertical, BiExit, BiLogIn } from "react-icons/bi";
import { useDispatch } from "react-redux";
export default function ConversationItem({ conversation, token, socket }) {
  const { conversationId, user } = conversation;
  const { isOpen, onClose } = useSidebar();

  const dispatch = useDispatch();
  const getConversation = async () => {
    await axios
      .get(`${API_URL}/conversation/get-conversation`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          conversationId,
        },
      })
      .then((data) => {
        dispatch({
          type: "SET_CONVERSATION",
          payload: {
            conversationId,
            user,
            messages: data.data.messages,
          },
        });
        onClose();
        socket.emit("join", conversationId);
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
