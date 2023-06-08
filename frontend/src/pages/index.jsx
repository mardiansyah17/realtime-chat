import { Inter } from "next/font/google";
import HeaderMobile from "@/components/HeaderMobile";
import Sidebar from "@/components/Sidebar";
import { io } from "socket.io-client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { API_URL } from "@/contstant";
import Conversation from "@/components/Conversation";
const socket = io("http://localhost:5000", { autoConnect: false });
const inter = Inter({ subsets: ["latin"] });
export default function Home({ conversations, token }) {
  const selector = useSelector((state) => state);
  const user = selector.user;
  const conversationId = selector.messages.conversationId;
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    if (!socket.connected) {
      socket.connect();
    }
    console.log("first");
    socket.on("reciveMessage", (message) => {
      dispatch({
        type: "ADD_MESSAGE",
        payload: {
          message,
        },
      });
    });
    return () => {
      socket.disconnect();
    };
  }, []);

  const handleMsg = async (e) => {
    e.preventDefault();
    socket.emit("message", {
      content: message,
      sender_id: user.id,
      conversation_id: conversationId,
    });
  };
  return (
    <div className={`${inter.className} md:flex md:w-full h-screen max-h-screen overflow-hidden`}>
      <Sidebar conversations={conversations} socket={socket} token={token} />
      <div className="w-full  h-full">
        <HeaderMobile />
        {user && conversationId ? (
          <>
            <Conversation
              msgOnChange={(val) => setMessage(val.target.value)}
              handleMsg={handleMsg}
            />
          </>
        ) : (
          <h1>tidak ada</h1>
        )}
      </div>
    </div>
  );
}

export const getServerSideProps = async (context) => {
  const token = context.req.cookies.auth_token || null;
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
