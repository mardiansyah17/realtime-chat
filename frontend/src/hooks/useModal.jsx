import { create } from "zustand";

const useModal = create((set) => ({
  isOpen: false,
  onClose: () => set((state) => ({ isOpen: false })),
  onOpen: () => set((state) => ({ isOpen: true })),
}));

export default useModal;
