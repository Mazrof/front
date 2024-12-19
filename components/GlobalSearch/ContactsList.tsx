/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { useSelectedChatRoom } from "@/store/user";
import { Contact } from "@/types/SideBar";
import Image from "next/image";
import { ChatRoom, SecondUser } from "@/types/user";
import React, { useEffect, useState } from "react";
import Avatar from "../SideBar/Avatar";
import { GroupData } from "@/types/group";
import { ChannelData } from "@/types/channel";
export default function ContactsList({
    groupedContacts,
    setShowGlobalSearch,
    showGlobalSearch,
}: {
    groupedContacts: {
        users: SecondUser[];
        groups: GroupData[];
        channels: ChannelData[];
    };
    setShowGlobalSearch: (value: boolean) => void;
    showGlobalSearch: boolean;
}) {
    const { setChatRoom } = useSelectedChatRoom();

    // Unified click handler
    // const handleSelect = ((chat,type)) => {
    //     setChatRoom();
    //     setShowGlobalSearch(!showGlobalSearch);
    // };

    const { users, groups, channels } = groupedContacts;

    if (users.length === 0 && groups.length === 0 && channels.length === 0) {
        return (
            <div className="p-4 text-center text-gray-500 dark:text-gray-400">
                No contacts found.
            </div>
        );
    }

    const handleKeyDown = (
        event: React.KeyboardEvent,
        chat: SecondUser | GroupData | ChannelData,
        type: "personalChat" | "group" | "channel"
    ) => {
        if (event.key === "Enter" || event.key === " ") {
            // Set the chat room with the specified type
            setChatRoom({ ...chat, type } as ChatRoom);
            setShowGlobalSearch(!showGlobalSearch);
        }
    };

    return (
        <div className="custom-scrollbar max-h-screen space-y-4 overflow-y-auto p-2">
            {/* Users Section */}
            {users.length > 0 && (
                <div>
                    <h2 className="text-lg font-semibold text-black dark:text-white">Users</h2>
                    {users.map((user) => (
                        <div
                            key={user.id}
                            className="mt-2 flex cursor-pointer items-center rounded-lg bg-[#f3f3f3] p-3 shadow-sm hover:bg-[#e9e9e9] dark:bg-[#212121] dark:hover:bg-[#3b3b3b]"
                            onClick={() => {
                                setChatRoom({
                                    id: Number(user.id),
                                    secondUser: {
                                        id: Number(user.id),
                                        username: user.username,
                                        photo: user.photo,
                                        publicKey: user.publicKey,
                                        phone: String(user.phone),
                                        screenName: user.screenName,
                                    },
                                    type: "personalChat",
                                } as ChatRoom);
                                setShowGlobalSearch(!showGlobalSearch);
                            }}
                            onKeyDown={(event) => handleKeyDown(event, user, "personalChat")} // Handle keyboard events
                            tabIndex={0} // Make the div focusable
                        >
                            <Avatar name={user.username} />
                            <div className="ml-2 flex-col">
                                <h3 className="text-lg font-semibold text-black dark:text-white">
                                    {user.username}
                                </h3>
                                <div className="text-sm text-gray-400 dark:text-gray-400">
                                    {user.phone}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Groups Section */}
            {groups.length > 0 && (
                <div>
                    <h2 className="text-lg font-semibold text-black dark:text-white">Groups</h2>
                    {groups.map((group) => (
                        <div
                            key={group.id}
                            className="mt-2 flex cursor-pointer items-center rounded-lg bg-[#f3f3f3] p-3 shadow-sm hover:bg-[#e9e9e9] dark:bg-[#212121] dark:hover:bg-[#3b3b3b]"
                            onClick={() => {
                                setChatRoom({
                                    id: group.id,
                                    group,
                                    type: "group",
                                } as ChatRoom);
                                setShowGlobalSearch(!showGlobalSearch);
                            }}
                            onKeyDown={(event) => handleKeyDown(event, group, "group")} // Handle keyboard events
                            tabIndex={0} // Make the div focusable
                        >
                            <Avatar name={group.community.name} />
                            <div className="ml-4">
                                <h3 className="text-lg font-semibold text-black dark:text-white">
                                    {group.community.name}
                                </h3>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Channels Section */}
            {channels.length > 0 && (
                <div>
                    <h2 className="text-lg font-semibold text-black dark:text-white">Channels</h2>
                    {channels.map((channel) => (
                        <div
                            key={channel.id}
                            className="mt-2 flex cursor-pointer items-center rounded-lg bg-[#f3f3f3] p-3 shadow-sm hover:bg-[#e9e9e9] dark:bg-[#212121] dark:hover:bg-[#3b3b3b]"
                            onClick={() => {
                                setChatRoom({
                                    id: channel.id,
                                    channel,
                                    type: "channel",
                                } as ChatRoom);
                                setShowGlobalSearch(!showGlobalSearch);
                            }}
                            onKeyDown={(event) => handleKeyDown(event, channel, "channel")} // Handle keyboard events
                            tabIndex={0} // Make the div focusable
                        >
                            <Avatar name={channel.community.name} />
                            <div className="ml-4">
                                <h3 className="text-lg font-semibold text-black dark:text-white">
                                    {channel.community.name}
                                </h3>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
