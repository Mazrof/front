"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { initializeSocket, disconnectSocket } from "@/lib/socket";
import { useMessagesStore, useWhoAmI } from "@/store/user";
import { failResponse, genericResponse } from "@/types/api";
import { MessageTypeBE } from "@/types/Message";
import { getMessages } from "@/services/Messages";
import { MyChats } from "@/types/user";
import { getChatsListtest } from "@/services/Contacts/Contacts";
import { useRouter } from "next/navigation";

import { Socket } from "socket.io-client";

interface SocketProviderProps {
    children: React.ReactNode;
}

const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
    const { user } = useWhoAmI();
    const pathname = usePathname();
    const { setMessages, checkExistChat, setMessage, addChat } = useMessagesStore(); // Add `addChat` to update the store
    const router = useRouter();

    const [socket, setSocket] = useState<Socket | null>(null);

    // Fetch chats and messages
    const firstFetchMessages = async () => {
        const chatsData: MyChats | failResponse = await getChatsListtest();
        if ((chatsData as failResponse).status === "fail") router.push("/login");
        else {
            for (const chat of chatsData as MyChats) {
                const response: genericResponse<MessageTypeBE[]> = await getMessages({
                    id: chat.id,
                    page: 1,
                    limit: 100,
                });

                if (response.status === "fail" || response.status === "error") {
                    const failApiResponse = response as failResponse;
                    if (failApiResponse?.error?.statusCode === 401) {
                        router.push("/login");
                    }
                } else {
                    const data: MessageTypeBE[] = response as unknown as MessageTypeBE[];
                    setMessages({
                        ...chat,
                        messages: data.reverse(),
                    });
                }
            }
        }
    };

    // Fetch new chat when a message from a new person is received
    const fetchNewChat = async (participantId: number) => {
        try {
            const chatsData: MyChats | failResponse = await getChatsListtest();
            if ((chatsData as failResponse).status === "fail") {
                console.error("Failed to fetch chat list");
                return;
            }

            const newChat = (chatsData as MyChats).find((chat) => chat.id === participantId);

            if (newChat) {
                const response: genericResponse<MessageTypeBE[]> = await getMessages({
                    id: newChat.id,
                    page: 1,
                    limit: 100,
                });
                if (response.status === "fail" || response.status === "error") {
                    const failApiResponse = response as failResponse;
                    if (failApiResponse?.error?.statusCode === 401) {
                        router.push("/login");
                    }
                } else {
                    const data: MessageTypeBE[] = response as unknown as MessageTypeBE[];
                    addChat({
                        ...newChat,
                        messages: data.reverse(),
                    });
                }
            }
        } catch (error) {
            console.error("Error fetching new chat:", error);
        }
    };

    // Initialize socket connection
    async function Initialize() {
        await firstFetchMessages();
        const socketInstance = initializeSocket();
        setSocket(socketInstance);
    }

    useEffect(() => {
        if (pathname === "/" || pathname === "/stories") {
            Initialize();
        } else {
            disconnectSocket();
            setSocket(null);
        }

        return () => {
            disconnectSocket();
            setSocket(null);
        };
    }, [pathname]);

    useEffect(() => {
        if (socket) {
            socket.on("message:receive", (data: MessageTypeBE) => {
                if (!checkExistChat(data.participantId as number)) {
                    console.log("New chat detected, fetching chat list...");
                    fetchNewChat(data.participantId as number);
                } else {
                    setMessage(data, data.participantId as number, user?.user.id as number);
                }
            });
        }

        return () => {
            if (socket) {
                socket.off("message:receive");
            }
        };
    }, [socket]);

    return <>{children}</>;
};

export default SocketProvider;
