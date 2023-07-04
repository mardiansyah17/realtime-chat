import {create} from "zustand";

const useModalNewConversation = create((set) => ({
    isOpen: false,
    onClose: () => set((state) => ({isOpen: false})),
    onOpen: () => set((state) => ({isOpen: true})),
}));

export default useModalNewConversation;
