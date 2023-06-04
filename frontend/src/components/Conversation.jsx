import React, { use, useEffect, useState } from "react";
import BubleChat from "./BubleChat";
import ChatInput from "./ChatInput";
import { useSelector } from "react-redux";

export default function Conversation({ handleMsg }) {
  const selector = useSelector((state) => state);
  const user = selector.user;
  const messages = selector.messages.messages;

  return (
    <div className=" h-[93%] md:h-full flex flex-col">
      <div className="p-3 basis-[90%] ">
        {messages.map((message, id) => {
          return <BubleChat key={id} msg={message.content} userChat={message.sender == user.id} />;
        })}
      </div>
      <ChatInput msgOnChange={(val) => setMessage(val.target.value)} handleMsg={handleMsg} />
    </div>
  );
}
