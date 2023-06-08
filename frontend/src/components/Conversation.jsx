import React, { use, useEffect, useState } from "react";
import BubleChat from "./BubleChat";
import ChatInput from "./ChatInput";
import { useSelector } from "react-redux";

export default function Conversation({ handleMsg, msgOnChange }) {
  const selector = useSelector((state) => state);
  const me = selector.user;
  const messages = selector.messages.messages;
  const user = selector.messages.user;
  return (
    <div className=" h-[93%] md:h-full flex flex-col">
      <div className="hidden md:flex md:items-center md:p-2 shadow-sm bg-white border-b border-b-gray-200 h-14">
        <span>{user ? user.name : ""}</span>
      </div>
      <div className="p-3 basis-[90%] overflow-y-auto ">
        {messages.map((message, id) => {
          return <BubleChat key={id} msg={message.content} userChat={message.sender_id == me.id} />;
        })}
      </div>
      <ChatInput msgOnChange={msgOnChange} handleMsg={handleMsg} />
    </div>
  );
}
