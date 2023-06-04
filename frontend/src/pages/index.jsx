import { Inter } from "next/font/google";
import HeaderMobile from "@/components/HeaderMobile";
import Sidebar from "@/components/Sidebar";
import { io } from "socket.io-client";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import BubleChat from "@/components/BubleChat";
import ChatInput from "@/components/ChatInput";
import axios from "axios";
import { API_URL } from "@/contstant";
const socket = io("http://localhost:5000", { autoConnect: false });
const inter = Inter({ subsets: ["latin"] });
export default function Home({ conversations, token }) {
  const { user, messages } = useSelector((state) => state);
  const [message, setMessage] = useState("");

  useEffect(() => {
    socket.connect();
  }, []);

  const handleMsg = async (e) => {
    e.preventDefault();
    socket.emit("message", {
      msg: "mantap",
    });
  };

  return (
    <div className={`${inter.className} md:flex md:w-full h-screen max-h-screen overflow-hidden`}>
      <Sidebar conversations={conversations} token={token} />
      <div className="w-full  h-full">
        <HeaderMobile />
        <div className=" h-[93%] md:h-full flex flex-col">
          <div className="p-3 basis-[90%] ">
            {user && messages ? (
              <>
                {messages.map((data, id) => {
                  console.log(data);
                  return (
                    <BubleChat key={id} msg={data.content} userChat={data.email == user.email} />
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
        .then((res) => res.data.conversations)
    : null;
  return {
    props: {
      conversations,
      token,
    },
  };
};
