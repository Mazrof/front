"use client";
import { getChatsListtest } from "@/services/Contacts/Contacts";
import { useMessagesStore, useSelectedChatRoom } from "@/store/user";
import { Chat } from "@/types/SideBar";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Avatar from "./Avatar";
import { ChatRoom } from "@/types/user";
import { parseMessageContent } from "@/utils/inputMessage";
const ChatList = () => {
    const { setChatRoom } = useSelectedChatRoom();
    const [chatsList, setChatsList] = useState<Chat[]>([]); // Apply the type here
    const { getChat, chatMessages } = useMessagesStore();
    useEffect(() => {
        async function fetchChatsData() {
            try {
                // Check if data already exists in sessionStorage
                const storedData = sessionStorage.getItem("chatsList");

                if (storedData) {
                    // If stored data exists, use it directly
                    setChatsList(JSON.parse(storedData));
                    console.log("store");
                } else {
                    // If no data in sessionStorage, fetch it
                    const chatsData = await getChatsListtest();
                    console.log("sidebar", chatsData);

                    const validChatsData = chatsData.map(
                        (chatdata: {
                            id: number;
                            lastMessage: { content: string; createdAt: string };
                            messagesCount: number;
                            secondUser: { photo: string; username: string };
                            type: "group" | "personalChat" | "channel";
                        }) => ({
                            id: chatdata.id,
                            lastMessage: parseMessageContent(chatdata.lastMessage.content), // Extract text from JSON string
                            time: chatdata.lastMessage.createdAt,
                            unreadCount: chatdata.messagesCount,
                            avatar: chatdata.secondUser.photo,
                            name: chatdata.secondUser.username,
                            type: chatdata.type,
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
            {chatMessages.map((chat) => (
                <div
                    key={chat.id}
                    className="flex cursor-pointer items-center rounded-lg bg-[#f3f3f3] p-3 shadow-sm hover:bg-[#e9e9e9] dark:bg-[#212121] dark:hover:bg-[#3b3b3b]"
                    onClick={() => setChatRoom(getChat(chat.id) as ChatRoom)}
                >
                    {chatMessages.length > 100 ? (
                        <Image
                            src={
                                chat.secondUser?.photo ||
                                (chat.channel?.community.imageURL as string) ||
                                (chat.group?.community.imageURL as string)
                            }
                            alt={
                                chat.secondUser?.username ||
                                (chat.channel?.community.name as string) ||
                                (chat.group?.community.name as string)
                            }
                            width={50}
                            height={50}
                            className="rounded-full object-cover"
                            data-test="chatList-chat-avatar"
                        />
                    ) : (
                        <div className="rounded-full object-cover" data-test="chatList-chat-avatar">
                            <Avatar
                                name={
                                    chat.secondUser?.username ||
                                    (chat.channel?.community.name as string) ||
                                    (chat.group?.community.name as string)
                                }
                            />
                        </div>
                    )}

                    <div className="ml-4 flex-grow">
                        <div className="flex items-center justify-between">
                            <h3
                                className="text-lg font-semibold text-black dark:text-white"
                                data-test="chatList-chat-name"
                            >
                                {chat.secondUser?.username ||
                                    (chat.channel?.community.name as string) ||
                                    (chat.group?.community.name as string)}
                            </h3>
                            <span
                                className="text-xs text-gray-400 dark:text-gray-500"
                                data-test="chatList-chat-lastSeen"
                            >
                                {chat.lastMessage?.createdAt}
                            </span>
                        </div>
                        <div className="flex items-center justify-between">
                            <p
                                className="max-w-36 truncate text-sm text-gray-400 dark:text-gray-400"
                                data-test="chatList-chat-lastMessage"
                            >
                                {parseMessageContent(chat.lastMessage?.content as string)?.text}
                            </p>
                            <div className="flex min-w-7 items-center space-x-1">
                                {(chat?.messagesCount as number) > 0 ? (
                                    <span
                                        className="ml-2 flex h-5 w-5 items-center justify-center rounded-full bg-[#04be2d] text-xs font-semibold text-white dark:bg-blue-500 dark:text-white"
                                        data-test="chatList-chat-unReadCount"
                                    >
                                        {chat.messagesCount}
                                    </span>
                                ) : (
                                    <span data-test="chatList-chat-lastMessageStatus">✔️</span>
                                )}
                                {/* {chat.pinned && (
                                    <span
                                        className="rounded-full hover:bg-slate-600"
                                        data-test="chatList-chat-pinned"
                                    >
                                        📌
                                    </span>
                                )} */}
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ChatList;
