import { create } from "zustand";
import { BlockUsers, SelectedChatId } from "@/types/user";
const useSelectedChatId = create<SelectedChatId>((set) => ({
    id: null,
    setChatId: (newId) => set({ id: newId }),
    isSelectedChatId: () => {
        const state: SelectedChatId = useSelectedChatId.getState(); // get the current state
        return state.id !== null;
    },
}));

const useBlockUsers = create<BlockUsers>((set) => ({
    blockUsers: null,
    setBlockUsers: (userList) => {
        set({ blockUsers: userList });
    },
    removeBlockUser: (user) => {
        set((state) => ({
            blockUsers: state.blockUsers
                ? state.blockUsers.filter((blockUser) => blockUser.userId !== user.userId)
                : null,
        }));
    },
}));
export { useSelectedChatId, useBlockUsers };
