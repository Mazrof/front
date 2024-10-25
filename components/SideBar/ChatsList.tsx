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
        name: "Mike Tyson",
        avatar: "/images/default-avatar.gif",
        lastMessage: "See you tomorrow at 3!",
        time: "2 days ago",
        unreadCount: 5,
        pinned: true,
    },
    {
        id: 4,
        name: "Nathan",
        avatar: "/images/default-avatar.gif",
        lastMessage: "Got the files. Thanks!",
        time: "Yesterday",
        unreadCount: 0,
        pinned: true,
    },
    {
        id: 5,
        name: "Harith",
        avatar: "/images/default-avatar.gif",
        lastMessage: "I will kill you watch out",
        time: "Oct 15",
        unreadCount: 0,
        pinned: false,
    },
    {
        id: 6,
        name: "Arther",
        avatar: "/images/default-avatar.gif",
        lastMessage: "Got the files. Thanks!",
        time: "Yesterday",
        unreadCount: 1,
        pinned: false,
    },
    {
        id: 7,
        name: "Ali",
        avatar: "/images/default-avatar.gif",
        lastMessage: "Got the files. Thanks!",
        time: "Yesterday",
        unreadCount: 5,
        pinned: false,
    },
    {
        id: 8,
        name: "Ahmed",
        avatar: "/images/default-avatar.gif",
        lastMessage: "Got the files. Thanks!",
        time: "Sep 28",
        unreadCount: 0,
        pinned: false,
    },
    {
        id: 9,
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
        <div className="custom-scrollbar space-y-4 p-2">
            {chatData.map((chat, index) => (
                <div
                    key={chat.id}
                    className="flex cursor-pointer items-center rounded-lg bg-[#212121] p-3 shadow-sm transition duration-150 hover:bg-[#2B2B2B]"
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
                            <h3 className="text-lg font-semibold text-white">{chat.name}</h3>
                            <span className="text-xs text-gray-500">{chat.time}</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <p className="max-w-36 truncate text-sm text-gray-400">
                                {chat.lastMessage}
                            </p>
                            <div className="flex min-w-7 items-center space-x-1">
                                {chat.unreadCount > 0 ? (
                                    <span className="ml-2 flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 text-xs font-semibold text-white">
                                        {chat.unreadCount}
                                    </span>
                                ) : (
                                    <span className="text-gray-400">✔️</span>
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
