import { create } from "zustand";
import { BlockUsers, SelectedChatRoom } from "@/types/user";
const useSelectedChatRoom = create<SelectedChatRoom>((set) => ({
    selectedChatRoom: null,
    setChatRoom: (newChatRoom) => set({ selectedChatRoom: newChatRoom }),
    isSelectedChatRoom: () => {
        const state: SelectedChatRoom = useSelectedChatRoom.getState(); // get the current state
        return state.selectedChatRoom !== null;
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
                ? state.blockUsers.filter((blockUser) => blockUser.id !== user.id)
                : null,
        }));
    },
}));
export { useSelectedChatRoom, useBlockUsers };
