"use client";

import { useSelectedChatId } from "@/store/user";
import { DarkMode, SetDarkMode, SetShowContacts, ShowContacts } from "@/types/SideBar";
import React from "react";
import ChatList from "./ChatsList";
import ChatsSearchBar from "./ChatsSearchBar";
import NewChatButton from "./NewChatButton";
type SideBarProp = {
    darkMode: DarkMode;
    setDarkMode: SetDarkMode;
    showContacts: ShowContacts;
    setShowContacts: SetShowContacts;
};

function SideBar(sideBarProp: SideBarProp) {
    const { isSelectedChatId } = useSelectedChatId();
    const isSelectedChat = isSelectedChatId();
    return (
        <div className={`${isSelectedChat && "hidden md:block"} sm:w-full md:w-1/4`}>
            <div
                className={`group relative max-h-screen max-w-full overflow-y-hidden bg-white py-2 pl-2 transition-all duration-500 dark:bg-black md:block`}
            >
                <ChatsSearchBar {...sideBarProp} />
                <ChatList />
                <div className="absolute bottom-12 right-4 opacity-0 transition-opacity group-hover:opacity-100">
                    <NewChatButton />
                </div>
            </div>
        </div>
    );
}

export default SideBar;
