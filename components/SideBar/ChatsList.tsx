"use client";
import { getChatsListtest } from "@/services/Contacts/Contacts";
import { useSelectedChatRoom } from "@/store/user";
import { Chat } from "@/types/SideBar";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Avatar from "./Avatar";
import { ChatRoom } from "@/types/user";

const ChatList = () => {
    const { setChatRoom } = useSelectedChatRoom();
    const [chatsList, setChatsList] = useState<Chat[]>([]); // Apply the type here

    useEffect(() => {
        async function fetchChatsData() {
            try {
                // Check if data already exists in sessionStorage
                const storedData = sessionStorage.getItem("chatsList");

                if (storedData) {
                    // If stored data exists, use it directly
                    setChatsList(JSON.parse(storedData));
                } else {
                    // If no data in sessionStorage, fetch it
                    const chatsData = await getChatsListtest();
                    console.log(chatsData);

                    const validChatsData = chatsData.map(
                        (chatdata: {
                            id: number;
                            lastMessage: { content: string; createdAt: string };
                            messagesCount: number;
                            secondUser: { photo: string; username: string };
                        }) => ({
                            id: chatdata.id,
                            lastMessage: JSON.parse(chatdata.lastMessage.content).text, // Extract text from JSON string
                            time: chatdata.lastMessage.createdAt,
                            unreadCount: chatdata.messagesCount,
                            avatar: chatdata.secondUser.photo,
                            name: chatdata.secondUser.username,
                        })
                    );

                    // Store the fetched chats in sessionStorage
                    setChatsList(validChatsData);
                    sessionStorage.setItem("chatsList", JSON.stringify(validChatsData));
                }
            } catch (error) {
                console.error("Error fetching chats data:", error);
            }
        }

        // Fetch chat data when the component mounts
        fetchChatsData();
    }, []); // Empty dependency array ensures this runs only once on mount

    return (
        <div className="custom-scrollbar max-h-screen space-y-4 overflow-y-auto p-2">
            {chatsList.map((chat) => (
                <div
                    key={chat.id}
                    className="flex cursor-pointer items-center rounded-lg bg-[#f3f3f3] p-3 shadow-sm hover:bg-[#e9e9e9] dark:bg-[#212121] dark:hover:bg-[#3b3b3b]"
                    onClick={() => setChatRoom({ ...chat, type: "personalChat" } as ChatRoom)}
                >
                    {chat.avatar.length > 100 ? (
                        <Image
                            src={chat.avatar}
                            alt={chat.name}
                            width={50}
                            height={50}
                            className="rounded-full object-cover"
                        />
                    ) : (
                        <div className="rounded-full object-cover">
                            <Avatar name={chat.name} />
                        </div>
                    )}

                    <div className="ml-4 flex-grow">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-semibold text-black dark:text-white">
                                {chat.name}
                            </h3>
                            <span className="text-xs text-gray-400 dark:text-gray-500">
                                {chat.time}
                            </span>
                        </div>
                        <div className="flex items-center justify-between">
                            <p className="max-w-36 truncate text-sm text-gray-400 dark:text-gray-400">
                                {chat.lastMessage}
                            </p>
                            <div className="flex min-w-7 items-center space-x-1">
                                {chat.unreadCount > 0 ? (
                                    <span className="ml-2 flex h-5 w-5 items-center justify-center rounded-full bg-[#04be2d] text-xs font-semibold text-white dark:bg-blue-500 dark:text-white">
                                        {chat.unreadCount}
                                    </span>
                                ) : (
                                    <span>✔️</span>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ChatList;
