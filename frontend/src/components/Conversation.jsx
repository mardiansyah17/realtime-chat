import React, { use, useEffect, useState } from "react";
import BubleChat from "./BubleChat";
import ChatInput from "./ChatInput";
import { useSelector } from "react-redux";

export default function Conversation({ socket }) {
  const user = useSelector((state) => state.user);
  const [messages, setMessages] = useState([
    {
      room: "a",
      message: "halo",
      email: "mardiansyahm12@gmail.com",
    },
  ]);
  const [message, setMessage] = useState("");
  useEffect(() => {
    socket.on("newMessage", (data) => {
      console.log(data);
      setMessages((state) => [...state, data]);
    });
  }, []);

  const handleMsg = async () => {
    // return console.log(message);
    const messageObj = {
      room: "a",
      message,
      email: user.email,
    };
    console.log("first");
    // Kirim pesan ke server dengan event 'chat message'
    socket.emit("sendMessage", messageObj);
    setMessage("");
  };
  return (
    <div className=" h-[93%] md:h-full flex flex-col">
      <div className="p-3 basis-[90%] ">
        {user ? (
          <>
            {messages.map((data, id) => {
              return <BubleChat key={id} msg={data.message} userChat={data.email == user.email} />;
            })}
          </>
        ) : (
          ""
        )}
      </div>
      <ChatInput msgOnChange={(val) => setMessage(val.target.value)} handleMsg={handleMsg} />
    </div>
  );
}
