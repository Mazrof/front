"use client";
import Image from "next/image";
import React, { useState } from "react";
import Avatar from "../SideBar/Avatar";
const chatData = [
    {
        id: 1,
        name: "John Doe",
        avatar: "/images/default-avatar.gif",
        status: "online",
    },
    {
        id: 2,
        name: "Jane Smith",
        avatar: "/images/default-avatar.gif",
        status: "last seen just now",
    },
    {
        id: 3,
        name: "Jane Smith",
        avatar: "/images/default-avatar.gif",
        status: "last seen 7 minutes ago",
    },
    {
        id: 4,
        name: "Jane Smith",
        avatar: "/images/default-avatar.gif",
        status: "last seen today at 10:20 PM",
    },
    {
        id: 5,
        name: "Jane Smith",
        avatar: "/images/default-avatar.gif",
        status: "last seen yesterday at 10:20 PM",
    },
    {
        id: 6,
        name: "Mike Tyson",
        avatar: "/images/default-avatar.gif",
        status: "last seen 10/24/2024",
    },
    {
        id: 7,
        name: "Nathan",
        avatar: "/images/default-avatar.gif",
        status: "last seen 10/24/2024",
    },
    {
        id: 8,
        name: "Harith",
        avatar: "/images/default-avatar.gif",
        status: "last seen 10/24/2024",
    },
    {
        id: 9,
        name: "Arther",
        avatar: "/images/default-avatar.gif",
        status: "last seen 10/8/2024",
    },
    {
        id: 10,
        name: "Ali",
        avatar: "/images/default-avatar.gif",
        status: "last seen 10/24/2024",
    },
    {
        id: 11,
        name: "Ahmed",
        avatar: "/images/default-avatar.gif",
        status: "last seen 10/8/2024",
    },
    {
        id: 12,
        name: "Jade",
        avatar: "/images/default-avatar.gif",
        status: "last seen 10/8/2024",
    },
];

export default function ContactsList() {
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
                        </div>
                        <div className="flex items-center justify-between">
                            <p className="max-w-36 truncate text-sm text-gray-400 dark:text-gray-400">
                                {chat.status}
                            </p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
