import {API_URL} from "@/contstant";
import {setMessages} from "@/redux/messagesSlice";
import generateRandomStr from "@/utils/generateRandomStr";
import axios from "axios";
import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {deleteConversationSlice} from "@/redux/conversationSlice";
import useModalConfirmDeleteConversation from "@/hooks/useModalConfirmDeleteConversation";

export default function ModalDeleteConversation({token, conversationId}) {
    const {isOpen, onClose} = useModalConfirmDeleteConversation();
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const dispatch = useDispatch();
    const tes = useSelector((state) => state.messages);
    const deleteConversation = async (e) => {

        await axios.delete(`${API_URL}/conversation/delete/${conversationId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then((res) => {
            console.log(conversationId)
            dispatch(deleteConversationSlice({
                conversationId
            }))
            onClose()
        })
    }

    return (
        <>
            {isOpen ? (
                <>
                    <div
                        className="fixed bg-black bg-opacity-20 inset-0 w-screen z-[999] flex items-center justify-center overflow-x-hidden overflow-y-auto  outline-none focus:outline-none">
                        <div

                            className="relative flex flex-col w-4/5 sm:w-2/4 lg:w-2/6 p-3 bg-white border-0 rounded-lg shadow-lg outline-none focus:outline-none "
                        >
                            <div>
                                Anda yakin ingin menghapus percakapan ini
                            </div>

                            <div
                                className="flex items-center justify-center">
                                <button
                                    className="px-3 py-2 mb-1 mr-1 text-sm font-bold text-red-500 uppercase transition-all duration-150 ease-linear outline-none background-transparent focus:outline-none"
                                    type="button"
                                    onClick={() => onClose()}
                                >
                                    Batal
                                </button>
                                <button
                                    className="px-3 py-2 mb-1 mr-1 text-sm font-bold text-white uppercase transition-all duration-150 ease-linear rounded shadow outline-none bg-emerald-500 active:bg-emerald-600 hover:shadow-lg focus:outline-none"
                                    onClick={deleteConversation}
                                >
                                    Iya
                                </button>
                            </div>
                        </div>
                    </div>
                </>
            ) : null}
        </>
    );
}
