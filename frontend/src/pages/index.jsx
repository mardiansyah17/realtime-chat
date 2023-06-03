import { Inter } from "next/font/google";
import HeaderMobile from "@/components/HeaderMobile";
import Conversation from "@/components/Conversation";
import Sidebar from "@/components/Sidebar";
import io from "socket.io-client"; // Add this
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import BubleChat from "@/components/BubleChat";
import ChatInput from "@/components/ChatInput";
import axios from "axios";
import { API_URL } from "@/contstant";

const inter = Inter({ subsets: ["latin"] });
export default function Home({ conversations }) {
  const user = useSelector((state) => state.user);
  // const socket = io("http://localhost:5001");
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  // useEffect(() => {
  //   socket.on("connect", (s) => {
  //     console.log("Connected to server");
  //   });
  //   socket.on("newMessage", (data) => {
  //     console.log(data);
  //     setMessages((state) => [...state, data]);
  //   });
  //   return () => socket.off("newMessage");
  // }, []);

  const handleMsg = async (e) => {
    e.preventDefault();
    const messageObj = {
      conversationId: "a",
      message,
      email: user.email,
    };
    socket.emit("sendMessage", messageObj);
    setMessage("");
  };

  return (
    <div className={`${inter.className} md:flex md:w-full h-screen max-h-screen overflow-hidden`}>
      <Sidebar conversations={conversations} />
      <div className="w-full  h-full">
        <HeaderMobile />
        <div className=" h-[93%] md:h-full flex flex-col">
          <div className="p-3 basis-[90%] ">
            {user ? (
              <>
                {messages.map((data, id) => {
                  return (
                    <BubleChat key={id} msg={data.message} userChat={data.email == user.email} />
                  );
                })}
              </>
            ) : (
              ""
            )}
          </div>
          <ChatInput
            msgOnChange={(val) => setMessage(val.target.value)}
            handleMsg={handleMsg}
            message={message}
          />
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps = async (context) => {
  const token = context.req.cookies.auth_token;
  const conversations = token
    ? await axios
        .get(`${API_URL}/conversation/get-all-conversations`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => res.data)
    : null;
  return {
    props: {
      conversations,
    },
  };
};
