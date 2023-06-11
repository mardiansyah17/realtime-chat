import { Inter } from "next/font/google";
import HeaderMobile from "@/components/HeaderMobile";
import Sidebar from "@/components/Sidebar";
import { io } from "socket.io-client";
import { useEffect, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { API_URL } from "@/contstant";
import Conversation from "@/components/Conversation";
import { wrapper } from "@/redux/store";
import { addUser } from "@/redux/userSlice";
import { setConversations, setLastMessage } from "@/redux/conversationSlice";
import { addMessages } from "@/redux/messagesSlice";
import Modal from "@/components/Modal";
const socket = io("http://localhost:5000", { autoConnect: false });
const inter = Inter({ subsets: ["latin"] });

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ req, res }) => {
  const token = req.cookies.auth_token || null;
  const conversations = token
    ? await axios
        .get(`${API_URL}/conversation/get-all-conversations`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => res.data.conversations)
    : null;
  store.dispatch(setConversations(conversations));
  return {
    props: {
      token,
    },
  };
});

function Home({ token }) {
  const selector = useSelector((state) => state);
  const user = selector.user;
  const conversationId = selector.messages.conversationId;

  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    if (!socket.connected) {
      socket.connect();
    }
    socket.on("reciveMessage", (message) => {
      const { createdAt, content, conversation_id } = message;

      dispatch(setLastMessage({ createdAt, content, conversationId: conversation_id }));
      if (conversationId) {
        dispatch(addMessages(message));
      }
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
    setMessage("");
  };
  return (
    <div className={`${inter.className} md:flex md:w-full h-screen max-h-screen overflow-hidden`}>
      <Modal token={token} />
      <Sidebar socket={socket} token={token} />
      <div className="w-full h-full">
        <HeaderMobile />
        {user && conversationId ? (
          <>
            <Conversation
              msgVal={message}
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

export default connect((state) => state)(Home);
