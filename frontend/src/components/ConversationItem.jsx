import { API_URL } from "@/contstant";
import useSidebar from "@/hooks/useSidebar";
import { setMessages } from "@/redux/messagesSlice";
import axios from "axios";
import React, { forwardRef, useEffect } from "react";
import { BiDotsHorizontal, BiDotsVertical, BiExit, BiLogIn } from "react-icons/bi";
import { useDispatch } from "react-redux";
const ConversationItem = forwardRef((props, ref) => {
  const { conversation, token, socket } = props;
  const { conversationId, user } = conversation;
  const { isOpen, onClose } = useSidebar();

  useEffect(() => {
    socket.emit("join", conversationId);
  }, []);

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
        dispatch(
          setMessages({
            conversationId,
            user,
            messages: data.data.messages,
          })
        );
        onClose();
      });
  };
  return (
    <div
      ref={ref}
      onClick={getConversation}
      className="flex flex-col justify-between h-16 mb-3 border-b border-green-300 rounded-md rounded-b-none active:bg-green-100/50 active:bg-opacity-10"
    >
      <div className="flex items-center justify-between">
        <span className="font-medium">{conversation.user.name}</span>
        <BiDotsVertical />
      </div>
      <div className="flex items-center justify-between">
        <span className="block">{conversation.lastMessage.content}</span>
        <span>12:00</span>
      </div>
    </div>
  );
});

export default ConversationItem;
