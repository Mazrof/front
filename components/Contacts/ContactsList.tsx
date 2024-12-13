/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Avatar from "../SideBar/Avatar";
import { useSelectedChatRoom } from "@/store/user";
import { Contact } from "@/types/SideBar";
import { ChatRoom } from "@/types/user";
import { getContactsList } from "@/services/Contacts/Contacts";
export default function ContactsList() {
    const { setChatRoom } = useSelectedChatRoom();
    const [contacts, setContacts] = useState<Contact[]>([]); // Apply the type here

    useEffect(() => {
        async function fetchContacts() {
            try {
                const contactsData = await getContactsList();
                setContacts(contactsData);
            } catch (error) {
                console.error("Error fetching contacts:", error);
            }
        }
        fetchContacts();
    }, []);

    if (contacts.length === 0)
        return (
            <div className="p-4 text-center text-gray-500 dark:text-gray-400">
                No contacts found.
            </div>
        );
    return (
        <div className="custom-scrollbar max-h-screen space-y-4 overflow-y-auto p-2">
            {contacts.map((chat, index) => (
                <div
                    key={chat.id}
                    className="flex cursor-pointer items-center rounded-lg bg-[#f3f3f3] p-3 shadow-sm hover:bg-[#e9e9e9] dark:bg-[#212121] dark:hover:bg-[#3b3b3b]"
                    onClick={() => setChatRoom({ ...chat, type: "personalChat" } as ChatRoom)}
                >
                    {chat.avatar.length < 100 ? (
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
                    </div>
                </div>
            ))}
        </div>
    );
}
