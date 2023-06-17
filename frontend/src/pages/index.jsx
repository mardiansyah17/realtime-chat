import { Allan, Inter } from "next/font/google";
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
import { addConversation, setConversations, setLastMessage } from "@/redux/conversationSlice";
import { addMessages, setMessages } from "@/redux/messagesSlice";
import Modal from "@/components/Modal";

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

const socket = io("http://localhost:5000", { autoConnect: false });
function Home({ token }) {
  const selector = useSelector((state) => state);
  const user = selector.user;
  const conversationIsOpen = selector.messages;
  const allConversation = selector.conversations;
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");
  useEffect(() => {
    if (!socket.connected && user) {
      socket.connect();
      socket.emit("joinUser", user.id);
    }

    const handleReceiveMessage = (data) => {
      const { conversationId, lastMessage, userOne, userTwo } = data.conversationRes;

      const conversation = allConversation.find((data) => data.conversationId == conversationId);
      if (!conversation) {
        const userTo = userOne.id == user.id ? userTwo : userOne;

        dispatch(
          addConversation({
            conversationId,
            lastMessage: lastMessage[0],
            user: userTo,
          })
        );
        console.log(conversationIsOpen);
        if (conversationIsOpen.conversationId == data.oldConversationId) {
          dispatch(
            setMessages({
              conversationId,
              user,
              messages: lastMessage,
            })
          );
        }
        return;
      }
      if (conversationIsOpen.conversationId == conversationId) {
        console.log(data.conversationRes);
        dispatch(
          addMessages({
            id: lastMessage.id,
            content: lastMessage.content,
            status: lastMessage.status,
            sender_id: lastMessage.sender_id,
            createdAt: lastMessage.createdAt,
            conversation_id: lastMessage.conversation_id,
          })
        );
      }
      dispatch(setLastMessage(lastMessage));
    };

    socket.on("reciveMessage", handleReceiveMessage);

    return () => {
      socket.emit("userLeave", user.id);
      socket.disconnect();
      socket.off("reciveMessage", handleReceiveMessage);
    };
  }, [conversationIsOpen, allConversation]);

  const handleMsg = async (e) => {
    e.preventDefault();
    socket.emit("message", {
      content: message,
      sender_id: user.id,
      reciver: conversationIsOpen.user.id,
      conversation_id: conversationIsOpen.conversationId,
    });
    setMessage("");
  };
  return (
    <div className={`${inter.className} md:flex md:w-full h-screen max-h-screen overflow-hidden`}>
      <Modal token={token} />
      <Sidebar socket={socket} token={token} />
      <h1 onClick={() => console.log(selector.messages)}>tes</h1>
      <div className="w-full h-full">
        <HeaderMobile />
        {user && conversationIsOpen.conversationId ? (
          <>
            <Conversation
              msgVal={message}
              msgOnChange={(val) => setMessage(val.target.value)}
              handleMsg={handleMsg}
            />
          </>
        ) : (
          <h1 onClick={() => socket.emit("tes")}>tidak ada</h1>
        )}
      </div>
    </div>
  );
}

export default connect((state) => state)(Home);
