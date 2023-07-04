import {API_URL} from "@/contstant";
import useSidebar from "@/hooks/useSidebar";
import {setMessages} from "@/redux/messagesSlice";
import axios from "axios";
import React, {forwardRef, useEffect} from "react";
import {BiDotsHorizontal, BiDotsVertical, BiExit, BiLogIn, BiTrash} from "react-icons/bi";
import {useDispatch} from "react-redux";
import {deleteConversationSlice} from "@/redux/conversationSlice";
import ModalDeleteConversation from "@/components/ModalDeleteConversation";

import useModalConfirmDeleteConversation from "@/hooks/useModalConfirmDeleteConversation";


const ConversationItem = forwardRef((props, ref) => {
    const {conversation, token, socket} = props;
    const {conversationId, user} = conversation;
    const {isOpen, onClose} = useSidebar();
    const modalConfirmDelete = useModalConfirmDeleteConversation()
    useEffect(() => {
        socket.emit("join", conversationId);
    }, []);

    const dispatch = useDispatch();
    const getConversation = async () => {
        await axios
            .get(`${API_URL}/conversation/get-conversation`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                params: {
                    conversationId,
                },
            })
            .then((data) => {
                dispatch(
                    setMessages({
                        conversationId,
                        user,
                        messages: data.data.messages,
                    })
                );
                onClose();
            });
    };
    return (
        <>
            <ModalDeleteConversation token={token} conversationId={conversationId}/>
            <li
                ref={ref}
                onClick={getConversation}
                className="flex flex-col justify-between h-16 mb-3 border-b border-green-300 rounded-md rounded-b-none active:bg-green-100/50 active:bg-opacity-10 relative"
            >
                <div className="flex items-center justify-between">
                    <span className="font-medium">{conversation.user.name}</span>
                    {/*<div onClick={(e) => {*/}
                    {/*    e.stopPropagation()*/}
                    {/*    modalConfirmDelete.onOpen()*/}
                    {/*}} className={` p-2 absolute right-0`}>*/}
                    {/*    <BiTrash className={``} size={20}/>*/}

                    {/*</div>*/}
                </div>
                <div className="flex items-center justify-between">
                    <span className="block">{conversation.lastMessage.content}</span>
                    {/*<span>12:00</span>*/}
                </div>
            </li>
        </>
    )
        ;
});

export default ConversationItem;
