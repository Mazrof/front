/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import ChatLayout from "@/components/Chats/ChatLayout";
import ChatRoom from "@/components/Chats/ChatRoom";
import MessageLoading from "@/components/Chats/Message/MessageLoading";
import ContactsSideBar from "@/components/Contacts/ContactsSideBar";
import GlobalSearchSideBar from "@/components/GlobalSearch/GlobalSearchSideBar";
import Settings from "@/components/Settings/Settings";
import SideBar from "@/components/SideBar/SideBar";
import { Suspense, useState } from "react";

export default function Home() {
    const [showContacts, setShowContacts] = useState(false);
    const [showGlobalSearch, setShowGlobalSearch] = useState(false);
    const [chat, setChat] = useState(null);
    const [darkMode, setDarkMode] = useState(false);
    const sideBarProp = {
        darkMode: darkMode,
        setDarkMode: setDarkMode,
        showContacts: showContacts,
        setShowContacts: setShowContacts,
        showGlobalSearch: showGlobalSearch,
        setShowGlobalSearch: setShowGlobalSearch,
    };

    return (
        <div className={`min-w-screen flex max-h-screen max-w-full ${darkMode && "dark"} `}>
            {showContacts ? (
                <ContactsSideBar {...sideBarProp} />
            ) : showGlobalSearch ? (
                <GlobalSearchSideBar {...sideBarProp} />
            ) : (
                <SideBar {...sideBarProp} />
            )}
            <Settings />
            <Suspense
                fallback={
                    <ChatRoom>
                        <MessageLoading />
                    </ChatRoom>
                }
            >
                <ChatLayout />
            </Suspense>
        </div>
    );
}
