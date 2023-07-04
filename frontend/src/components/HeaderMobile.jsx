import React from "react";
import { FaBars, FaPlus, Faplus } from "react-icons/fa";
import useSidebar from "@/hooks/useSidebar";
import {useDispatch, useSelector} from "react-redux";
import {AiOutlineArrowLeft} from "react-icons/ai";
import {setMessages} from "@/redux/messagesSlice";
export default function HeaderMobile() {
  const { isOpen, onOpen } = useSidebar();
  const selector = useSelector((state) => state);
  const messages = selector.messages;
  const user = messages.user
    const dispatch = useDispatch()
 const closeConversation = ()=>{
      dispatch(setMessages({
          conversationId:null,
          user:null,
          messages:null
      }))
 }

  return (
    <div className="flex items-center justify-between  p-3 px-3 border-b shadow-sm border-b-gray-200 sm:hidden">
      <FaBars size={20} onClick={onOpen} />
      <span className={`text-center`}>{user ? user.name : ""}</span>
        {
            user?

      <AiOutlineArrowLeft onClick={closeConversation}  size={20} className="text-green-500" />
        :""
        }
    </div>
  );
}
