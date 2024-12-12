/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import ChatLayout from "@/components/Chats/ChatLayout";
import ChatRoom from "@/components/Chats/ChatRoom";
import MessageLoading from "@/components/Chats/Message/MessageLoading";
import ContactsSideBar from "@/components/Contacts/ContactsSideBar";
import GlobalSearchSideBar from "@/components/GlobalSearch/GlobalSearchSideBar";
import Settings from "@/components/Settings/Settings";
import SideBar from "@/components/SideBar/SideBar";
import { Suspense, useState, useEffect } from "react";
import { getChatsList,getChatsListtest } from "@/services/Contacts/Contacts";  // Make sure the import is correct

export default function Home() {
    const [showContacts, setShowContacts] = useState(false);
    const [showGlobalSearch, setShowGlobalSearch] = useState(false);
    const [darkMode, setDarkMode] = useState(false);

    // Fetch chats data once and store it in sessionStorage
    useEffect(() => {
        async function fetchChatsData() {
            try {
                // Check if data already exists in sessionStorage
                const storedData = sessionStorage.getItem("chatsList");
                if (!storedData) {
                    const chatsData = await getChatsListtest();
                    // Store the data in sessionStorage
                    sessionStorage.setItem("chatsList", JSON.stringify(chatsData));
                }
            } catch (error) {
                console.error("Error fetching chats data:", error);
            }
        }
        fetchChatsData();
    }, []); // Run once when the component mounts

    const sideBarProp = {
        darkMode,
        setDarkMode,
        showContacts,
        setShowContacts,
        showGlobalSearch,
        setShowGlobalSearch,
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
