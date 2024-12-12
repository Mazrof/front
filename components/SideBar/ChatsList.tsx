"use client";
import { useSelectedChatId } from "@/store/user";
import { Chat } from "@/types/SideBar";
import Image from "next/image";
import React from "react";
import Avatar from "./Avatar";

type ChatListProps = {
    chatsList: Chat[]; // Receive the chatsList from props
};

const ChatList: React.FC<ChatListProps> = ({ chatsList }) => {
    const { setChatId } = useSelectedChatId();

    return (
        <div className="custom-scrollbar max-h-screen space-y-4 overflow-y-auto p-2">
            {chatsList.map((chat) => (
                <div
                    key={chat.id}
                    className="flex cursor-pointer items-center rounded-lg bg-[#f3f3f3] p-3 shadow-sm hover:bg-[#e9e9e9] dark:bg-[#212121] dark:hover:bg-[#3b3b3b]"
                    onClick={() => setChatId(String(chat.id))}
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
                                <span className="ml-2 flex h-5 w-5 items-center justify-center rounded-full bg-[#04be2d] text-xs font-semibold text-white dark:bg-blue-500 dark:text-white">
                                    {chat.unreadCount}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ChatList;
