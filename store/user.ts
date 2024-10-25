import { create } from "zustand";
import { SelectedChatId } from "@/types/user";
const useSelectedChatId = create<SelectedChatId>((set) => ({
  id: "b",
  setChatId: (newId) => set({ id: newId }),
  isSelectedChatId: () => {
    const state: SelectedChatId = useSelectedChatId.getState();  // get the current state
    return state.id !== ""
  }
}));
export { useSelectedChatId };
