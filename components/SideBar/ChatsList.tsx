/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import Image from "next/image";
import React, { useState,useEffect } from "react";
import Avatar from "./Avatar";
import { useSelectedChatId } from "@/store/user";
import { SetChat } from "@/types/SideBar";
import { getChatsList } from "@/services/Contacts/Contacts";
import { Chat } from "@/types/SideBar";

const ChatList = () => {
    const [hasImage, setHasImage] = useState(true);
    const { setChatId } = useSelectedChatId();
    const [chatsList, setChatsList] = useState<Chat[]>([]); // Apply the type here


    useEffect(() => {
        async function fetchChatsData() {
            try {
                const chatsData = await getChatsList();
                setChatsList(chatsData);
            } catch (error) {
                console.error("Error fetching contacts:", error);
            } 
        }
        fetchChatsData();
    }, []);
    return (
        <div className="custom-scrollbar max-h-screen space-y-4 overflow-y-auto p-2">
            {chatsList.map((chat, index) => (
                <div
                    key={chat.id}
                    className="flex cursor-pointer items-center rounded-lg bg-[#f3f3f3] p-3 shadow-sm transition hover:bg-[#e9e9e9] dark:bg-[#212121] dark:hover:bg-[#3b3b3b]"
                    onClick={() => setChatId(chat.id)}
                >
                    {hasImage && index % 2 == 0 ? (
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
                                {chat.pinned && (
                                    <span className="rounded-full hover:bg-slate-600">📌</span>
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
