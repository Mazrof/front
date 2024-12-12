/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Avatar from "../SideBar/Avatar";
import { useSelectedChatId } from "@/store/user";
import { Contact } from "@/types/SideBar";
import { getContactsList } from "@/services/Contacts/Contacts";
export default function ContactsList() {
  const [hasImage, setHasImage] = useState(true);
  const { setChatId } = useSelectedChatId();
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

  return (
    <div className="custom-scrollbar max-h-screen space-y-4 overflow-y-auto p-2">
      {contacts.map((chat, index) => (
        <div
          key={chat.id}
          className="flex cursor-pointer items-center rounded-lg bg-[#f3f3f3] p-3 shadow-sm  hover:bg-[#e9e9e9] dark:bg-[#212121] dark:hover:bg-[#3b3b3b]"
          onClick={() => setChatId(String(chat.id))}
        >
          {hasImage && index % 2 === 0 ? (
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
            {/* <div className="flex items-center justify-between">
              <p className="max-w-36 truncate text-sm text-gray-400 dark:text-gray-400">
                {chat.status}
              </p>
            </div> */}
          </div>
        </div>
      ))}
    </div>
  );
}
