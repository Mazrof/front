"use client";
import Image from "next/image";
import React, { useState } from "react";
import Avatar from "./Avatar";
const chatData = [
    {
        id: 1,
        name: "John Doe",
        avatar: "/images/default-avatar.gif",
        lastMessage: "Hey! How are you?",
        time: "10:30 AM",
        unreadCount: 2,
        pinned: true,
    },
    {
        id: 2,
        name: "Jane Smith",
        avatar: "/images/default-avatar.gif",
        lastMessage: "Got the files. Thanks!",
        time: "10:20 PM",
        unreadCount: 0,
        pinned: false,
    },
    {
        id: 3,
        name: "Jane Smith",
        avatar: "/images/default-avatar.gif",
        lastMessage: "Got the files. Thanks!",
        time: "10:20 PM",
        unreadCount: 0,
        pinned: false,
    },
    {
        id: 4,
        name: "Jane Smith",
        avatar: "/images/default-avatar.gif",
        lastMessage: "Got the files. Thanks!",
        time: "10:20 PM",
        unreadCount: 0,
        pinned: false,
    },
    {
        id: 5,
        name: "Jane Smith",
        avatar: "/images/default-avatar.gif",
        lastMessage: "Got the files. Thanks!",
        time: "10:20 PM",
        unreadCount: 0,
        pinned: false,
    },
    {
        id: 6,
        name: "Mike Tyson",
        avatar: "/images/default-avatar.gif",
        lastMessage: "See you tomorrow at 3!",
        time: "2 days ago",
        unreadCount: 5,
        pinned: true,
    },
    {
        id: 7,
        name: "Nathan",
        avatar: "/images/default-avatar.gif",
        lastMessage: "Got the files. Thanks!",
        time: "Yesterday",
        unreadCount: 0,
        pinned: true,
    },
    {
        id: 8,
        name: "Harith",
        avatar: "/images/default-avatar.gif",
        lastMessage: "I will kill you watch out",
        time: "Oct 15",
        unreadCount: 0,
        pinned: false,
    },
    {
        id: 9,
        name: "Arther",
        avatar: "/images/default-avatar.gif",
        lastMessage: "Got the files. Thanks!",
        time: "Yesterday",
        unreadCount: 1,
        pinned: false,
    },
    {
        id: 10,
        name: "Ali",
        avatar: "/images/default-avatar.gif",
        lastMessage: "Got the files. Thanks!",
        time: "Yesterday",
        unreadCount: 5,
        pinned: false,
    },
    {
        id: 11,
        name: "Ahmed",
        avatar: "/images/default-avatar.gif",
        lastMessage: "Got the files. Thanks!",
        time: "Sep 28",
        unreadCount: 0,
        pinned: false,
    },
    {
        id: 12,
        name: "Jade",
        avatar: "/images/default-avatar.gif",
        lastMessage: "Got the files. Thanks!",
        time: "Aug 9",
        unreadCount: 3,
        pinned: false,
    },
];

const ChatList = () => {
    const [hasImage, setHasImage] = useState(true);

    return (
        <div className="custom-scrollbar max-h-screen space-y-4 overflow-y-auto p-2">
            {chatData.map((chat, index) => (
                <div
                    key={chat.id}
                    className="flex cursor-pointer items-center rounded-lg bg-[#f3f3f3] p-3 shadow-sm transition hover:bg-[#e9e9e9] dark:bg-[#212121] dark:hover:bg-[#3b3b3b]"
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
