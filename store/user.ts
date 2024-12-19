import { create } from "zustand";
import { BlockUsers, FirstTimeChat, SelectedChatRoom, useWhoAmIType, WhoAmI } from "@/types/user";
import { useMessagesStoreType, MessagesStoreType, MessageTypeBE } from "@/types/Message";
const useSelectedChatRoom = create<SelectedChatRoom>((set) => ({
    selectedChatRoom: {
        id: 12,
        type: "personalChat",
    },
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

const useMessagesStore = create<useMessagesStoreType>((set, get) => ({
    chatMessages: [], // Initial state for chat messages

    setMessages: (newChatMessages: MessagesStoreType) => {
        set((state) => {
            // Check if the chat already exists
            const chatExists = state.chatMessages.some((chat) => chat.id === newChatMessages.id);

            // If the chat exists, return the state unchanged; otherwise, add the new chat
            if (chatExists) {
                return state;
            }

            return {
                chatMessages: [...state.chatMessages, newChatMessages],
            };
        });
    },
    addChat: (newChat:MessagesStoreType) => {
        set((state) => ({
            chatMessages: [...state.chatMessages, newChat],
        }));
    },
    getChat: (participantId: number) => {
        const state = get(); // Get current store state
        const chat = state.chatMessages.find((chat) => chat.id === participantId);
        return {
            id: chat?.id as number,
            type: chat?.type,
            secondUser: chat?.secondUser,
            group: chat?.group,
            channel: chat?.channel,
            lastMessage: chat?.lastMessage,
        };
    },
    // this function must update if sender not reciver and send media
    setMessage: (newMessage: MessageTypeBE, participantId: number, userId) => {
        set((state) => ({
            chatMessages: state?.chatMessages?.map((chat) =>
                chat.id === participantId
                    ? {
                          ...chat,
                          messages:
                              newMessage.id === -1 || newMessage.senderId != userId
                                  ? [...chat.messages, newMessage]
                                  : chat.messages.map((message, index) =>
                                        message.id === -1 &&
                                        index === chat.messages.findIndex((m) => m.id === -1)
                                            ? newMessage // Update message with ID
                                            : message
                                    ),
                      }
                    : chat
            ),
        }));
    },
    checkExistChat: (participantId: number) => {
        const state = get(); // Get the current store state
        const chatExists = state.chatMessages.some((chat) => chat.id === participantId);
        return chatExists; // Return true if chat exists, otherwise false
    },

    updateMessage: (message: MessageTypeBE, participantId: number) => {
        set((state) => ({
            chatMessages: state.chatMessages.map((chat) =>
                chat.id === participantId
                    ? {
                          ...chat,
                          messages: chat.messages.map(
                              (m) => (m.id === message.id ? { ...m, ...message } : m) // Update the specific message
                          ),
                      }
                    : chat
            ),
        }));
    },
    getChatMessage: (participantId: number) => {
        const state = get(); // Get current store state
        const chat = state.chatMessages.find((chat) => chat.id === participantId);
        return chat ? chat.messages : []; // Return the messages if chat room exists, otherwise return an empty array
    },
    removeMessage: (message: MessageTypeBE, participantId: number) => {
        set((state) => ({
            chatMessages: state.chatMessages.map((chat) =>
                chat.id === participantId
                    ? {
                          ...chat,
                          messages: chat.messages.filter((m) => m.id !== message.id), // Remove the message
                      }
                    : chat
            ),
        }));
    },
}));
const useIsFirstTimeChat = create<FirstTimeChat>((set) => ({
    isFirstTime: false,
    setIsFirstTime: (newIsFirst: boolean) => set({ isFirstTime: newIsFirst }),
}));
const useWhoAmI = create<useWhoAmIType>((set) => ({
    user: null,
    setWhoAmI: (newUser: WhoAmI) => set({ user: newUser }),
}));
export { useSelectedChatRoom, useBlockUsers, useMessagesStore, useIsFirstTimeChat, useWhoAmI };
