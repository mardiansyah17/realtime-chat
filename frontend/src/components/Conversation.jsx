import React, { use, useEffect, useState } from "react";
import BubleChat from "./BubleChat";
import ChatInput from "./ChatInput";
import {useDispatch, useSelector} from "react-redux";
import {AiOutlineArrowLeft} from "react-icons/ai";
import {setMessages} from "@/redux/messagesSlice";

export default function Conversation({ handleMsg, msgOnChange, msgVal }) {
  const selector = useSelector((state) => state);
  const me = selector.user;
  const messages = selector.messages.messages;
    const dispatch = useDispatch()

  const user = selector.messages.user;
    const closeConversation = ()=>{
        dispatch(setMessages({
            conversationId:null,
            user:null,
            messages:null
        }))
    }
  return (
    <div className=" h-[93%] sm:h-full flex flex-col">
      <div className="hidden bg-white border-b shadow-sm sm:flex sm:items-center sm:p-2 border-b-gray-200 h-14">
          <AiOutlineArrowLeft onClick={closeConversation}  size={20} className="text-green-500 mr-4" />
        <span>{user ? user.name : ""}</span>
      </div>
      <div className="p-3 basis-[90%] overflow-y-auto ">
        {messages.map((message, id) => {
          return <BubleChat key={id} msg={message.content} userChat={message.sender_id == me.id} />;
        })}
      </div>
      <ChatInput msgOnChange={msgOnChange} handleMsg={handleMsg} message={msgVal} />
    </div>
  );
}
