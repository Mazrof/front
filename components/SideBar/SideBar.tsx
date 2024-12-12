"use client";
import { useSettingsPageType } from "@/store/settings";
import { useSelectedChatId } from "@/store/user";
import {
    DarkMode,
    SetDarkMode,
    SetShowContacts,
    SetShowGlobalSearch,
    ShowContacts,
    ShowGlobalSearch,
} from "@/types/SideBar";
import React from "react";
import ChatList from "./ChatsList";
import ChatsSearchBar from "./ChatsSearchBar";
import NewChatButton from "./NewChatButton";
type SideBarProp = {
    darkMode: DarkMode;
    setDarkMode: SetDarkMode;
    showContacts: ShowContacts;
    setShowContacts: SetShowContacts;
    showGlobalSearch: ShowGlobalSearch;
    setShowGlobalSearch: SetShowGlobalSearch;
};

function SideBar(sideBarProp: SideBarProp) {
    const { isSelectedChatId } = useSelectedChatId();
    const { settingPageName } = useSettingsPageType();
    const isSelectedChat = isSelectedChatId();
    if (settingPageName) {
        return null; // Return nothing when settings page is active
    }
    return (
        <div
            className={`${isSelectedChat && "hidden md:block"} sm:w-full md:w-1/3 ${settingPageName && "hidden"}`}
        >
            <div
                className={`group relative h-screen max-w-full overflow-y-hidden bg-white py-2 pl-2 transition-all duration-500 dark:bg-black md:block`}
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
