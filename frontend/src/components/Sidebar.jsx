import useSidebar from "@/hooks/useSidebar";
import Link from "next/link";
import React from "react";
// import navLInk from "./navLink";
import {useRouter} from "next/router";
import {HiPlus, HiXMark} from "react-icons/hi2";
import {BiDotsHorizontal, BiDotsVertical, BiExit, BiLogIn} from "react-icons/bi";
import {useSelector} from "react-redux";
import ConversationItem from "./ConversationItem";
import FlipMove from "react-flip-move";
import useModal from "@/hooks/useModalNewConversation";

export default function Sidebar({token, socket}) {
    const {isOpen, onClose} = useSidebar();
    const {onOpen} = useModal();
    const router = useRouter();
    const selector = useSelector((state) => state);
    const user = selector.user;
    const conversations = selector.conversations;
    return (
        <div
            className={`z-10 flex top-0 h-screen sm:relative  fixed ease-in-out duration-500 ${
                isOpen ? "translate-x-0 " : "-translate-x-full sm:translate-x-0"
            }  w-full sm:w-fit `}
        >
            <div className={`  w-80 h-full   bg-white border-r border-gray-300 `}>
                <div
                    onClick={() => onOpen()}
                    className="flex items-center space-x-3 mt-3 border border-green-400 rounded-md w-[90%] mb-3 mx-auto py-2 px-3"
                >
                    <HiPlus/>
                    <span>New chat</span>
                </div>
                <FlipMove typeName="ul" className=" h-[80%] p-3" enterAnimation="accordionVertical">
                    {conversations &&
                        conversations.map((conversation) => {
                            return (
                                <ConversationItem
                                    key={conversation.conversationId}
                                    conversation={conversation}
                                    token={token}
                                    socket={socket}
                                />
                            );
                        })}
                </FlipMove>
                {/* <ul className=" h-[80%] p-3">
          {conversations &&
            conversations.map((conversation) => {
              return (
                <ConversationItem
                  key={conversation.conversationId}
                  conversation={conversation}
                  token={token}
                  socket={socket}
                />
              );
            })}
        </ul> */}
                <div className="flex items-center h-[10%] justify-between px-3 border-t border-t-green-500">
                    {user ? (
                        <>
                            <span>{user.name}</span>
                            <BiExit size={20} className="cursor-pointer"/>
                        </>
                    ) : (
                        <>
                            <span>Masuk</span>
                            <BiLogIn
                                size={20}
                                className="cursor-pointer"
                                onClick={() => window.open("http://localhost:5000/login/google", "_self")}
                            />
                        </>
                    )}
                </div>
            </div>
            <HiXMark className="mt-2 ml-4 sm:hidden" onClick={() => onClose()} size={30}/>
        </div>
    );
}
