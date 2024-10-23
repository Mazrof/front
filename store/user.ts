import { create } from "zustand";
import { SelectedChatId } from "@/types/user";
const useSelectedChtaId = create<SelectedChatId>((set) => ({
    id: "b",
    setChatId: (newId) => set({ id: newId }),
    isSelectedChatId: () => {
    const state: SelectedChatId = useSelectedChtaId.getState();  // get the current state
    return state.id !== "" 
  }
}));
export { useSelectedChtaId };
