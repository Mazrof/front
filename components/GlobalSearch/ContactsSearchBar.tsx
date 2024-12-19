/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { sendQuery } from "@/services/Contacts/Contacts";
import { ChannelData } from "@/types/channel";
import { GroupData } from "@/types/group";
import {
    Channel,
    Contact,
    Group,
    SetShowGlobalSearch,
    ShowGlobalSearch,
    User,
} from "@/types/SideBar";
import { SecondUser } from "@/types/user";
import Image from "next/image";
import { useEffect, useState } from "react";
export default function ContactsSearchBar({
    showGlobalSearch,
    setShowGlobalSearch,
    onSearch,
}: {
    showGlobalSearch: ShowGlobalSearch;
    setShowGlobalSearch: SetShowGlobalSearch;
    onSearch: (contacts: {
        users: SecondUser[];
        groups: GroupData[];
        channels: ChannelData[];
    }) => void;
}) {
    const [isLoading, setIsLoading] = useState(false);
    const [query, setQuery] = useState("");

    async function handleSendQuery() {
        if (!query.trim()) return; // Avoid sending empty queries
        setIsLoading(true);
        try {
            const result = await sendQuery(query);
            console.log(result);
            const groupedContacts = {
                users: result.data.users.map((user: SecondUser) => ({
                    id: user.id,
                    username: user.username,
                    email: user.email,
                    photo: user.photo,
                    screenName: user.screenName,
                    phone: user.phone,
                    publicKey: user.publicKey,
                    lastSeen: user.lastSeen,
                    activeNow: user.activeNow,
                })),
                groups: result.data.groups.map((group: GroupData) => ({
                    id: group.id,
                    groupSize: group.groupSize,
                    community: group.community,
                })),
                channels: result.data.channels.map((channel: ChannelData) => ({
                    id: channel.id,
                    invitationLink: channel.invitationLink,
                    community: channel.community,
                    canAddComments: channel.canAddComments,
                })),
            };

            onSearch(groupedContacts);
        } catch (error) {
            console.error("Error fetching contacts:", error);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <header className="flex items-center justify-between bg-[#fcfcfc] p-4 shadow-md dark:bg-[#2C2F33]">
            <div className="relative mx-4 flex flex-row space-x-6">
                <button onClick={() => setShowGlobalSearch(!showGlobalSearch)}>
                    <Image
                        src="/images/left-arrow.gif"
                        width={50}
                        height={50}
                        alt="back arrow"
                        className="rounded-full"
                    ></Image>
                </button>
                <input
                    type="text"
                    placeholder="Search Contacts"
                    className="w-full rounded-full bg-[#f3f2f2] px-4 py-2 text-black focus:outline-none dark:bg-[#3E4146] dark:text-white"
                    onChange={(e) => setQuery(e.target.value)}
                />
                <button
                    onClick={handleSendQuery}
                    disabled={isLoading || !query.trim()}
                    className={`rounded-full bg-blue-500 p-2 text-white ${
                        isLoading || !query.trim() ? "opacity-50" : "hover:bg-blue-600"
                    }`}
                >
                    {isLoading ? "🔄" : "🔍"}
                </button>
            </div>
        </header>
    );
}
