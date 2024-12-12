/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { useSelectedChatId } from "@/store/user";
import { Contact } from "@/types/SideBar";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Avatar from "../SideBar/Avatar";
export default function ContactsList({
    groupedContacts,
    setShowGlobalSearch,
  showGlobalSearch,
}: {
    groupedContacts: {
        users: Contact[];
        groups: Contact[];
        channels: Contact[];
    };
    setShowGlobalSearch: (value: boolean) => void;
  showGlobalSearch: boolean;
}) {
    const { setChatId } = useSelectedChatId();

  // Unified click handler
  const handleSelect = (id: string) => {
    setChatId(id);
    setShowGlobalSearch(!showGlobalSearch);
  };
    const { users, groups, channels } = groupedContacts;

    if (users.length === 0 && groups.length === 0 && channels.length === 0) {
        return (
            <div className="p-4 text-center text-gray-500 dark:text-gray-400">
                No contacts found.
            </div>
        );
    }
    return (
        <div className="custom-scrollbar max-h-screen space-y-4 overflow-y-auto p-2">
            {/* Users Section */}
            {users.length > 0 && (
                <div>
                    <h2 className="text-lg font-semibold text-black dark:text-white">Users</h2>
                    {users.map((user) => (
                        <div
                            key={user.id}
                            className="mt-2 flex cursor-pointer items-center rounded-lg bg-[#f3f3f3] p-3 shadow-sm  hover:bg-[#e9e9e9] dark:bg-[#212121] dark:hover:bg-[#3b3b3b]"
                            onClick={() =>  handleSelect(String(user.id))}
                        >
                            {/* {user.avatar === "" ? (
                         <div className="rounded-full object-cover">
                             <Avatar name={user.name} />
                         </div>
                     ) : (
                         <Image
                             src={user.avatar}
                             alt={user.name}
                             width={50}
                             height={50}
                             className="rounded-full object-cover"
                         />
                    )} */}
                            <Avatar name={user.name} />
                            <div className="flex-col ml-2">
                                <h3 className="text-lg font-semibold text-black dark:text-white">
                                    {user.name}
                                </h3>
                                <div className=" text-sm text-gray-400
                                dark:text-gray-400">
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
                            className="mt-2 flex cursor-pointer items-center rounded-lg bg-[#f3f3f3] p-3 shadow-sm  hover:bg-[#e9e9e9] dark:bg-[#212121] dark:hover:bg-[#3b3b3b]"
                            onClick={() =>  handleSelect(String(group.id))}
                        >
                            {/* {group.avatar === "" ? (
                         <div className="rounded-full object-cover">
                             <Avatar name={group.name} />
                         </div>
                     ) : (
                         <Image
                             src={group.avatar}
                             alt={group.name}
                             width={50}
                             height={50}
                             className="rounded-full object-cover"
                         />
                     )} */}
                            <Avatar name={group.name} />
                            <div className="ml-4">
                                <h3 className="text-lg font-semibold text-black dark:text-white">
                                    {group.name}
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
                            className="mt-2 flex cursor-pointer items-center rounded-lg bg-[#f3f3f3] p-3 shadow-sm  hover:bg-[#e9e9e9] dark:bg-[#212121] dark:hover:bg-[#3b3b3b]"
                            onClick={() =>  handleSelect(String(channel.id))}
                        >
                            {/* {channel.avatar === "" ? (
                         <div className="rounded-full object-cover">
                             <Avatar name={channel.name} />
                         </div>
                     ) : (
                         <Image
                             src={channel.avatar}
                             alt={channel.name}
                             width={50}
                             height={50}
                             className="rounded-full object-cover"
                         />
                     )} */}
                            <Avatar name={channel.name} />
                            <div className="ml-4">
                                <h3 className="text-lg font-semibold text-black dark:text-white">
                                    {channel.name}
                                </h3>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
