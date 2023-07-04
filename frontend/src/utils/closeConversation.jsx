import {useDispatch} from "react-redux";
import {setMessages} from "@/redux/messagesSlice";


export const closeConversation = ()=>{
    const dipatch  = useDispatch()
    dipatch(setMessages({
        conversationId:null,
        user:null,
        messages:null
    }))
}