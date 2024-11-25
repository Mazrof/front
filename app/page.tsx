"use client";
import ChatLayout from "@/components/Chats/ChatLayout";
import ChatRoom from "@/components/Chats/ChatRoom";
import MessageLoading from "@/components/Chats/Message/MessageLoading";
import ContactsSideBar from "@/components/Contacts/ContactsSideBar";
import SideBar from "@/components/SideBar/SideBar";
import Settings from "@/components/Settings/Settings";
import { Suspense, useState } from "react";
import MainInfo from "@/components/Channels/Info/MainInfo";
export default function Home() {
    const [showContacts, setShowContacts] = useState(false);
    const [chat, setChat] = useState(null);
    const [darkMode, setDarkMode] = useState(false);
    const sideBarProp = {
        darkMode: darkMode,
        setDarkMode: setDarkMode,
        showContacts: showContacts,
        setShowContacts: setShowContacts,
        setChat: setChat,
    };
    return (
        <div className={`min-w-screen flex max-h-screen max-w-full ${darkMode && "dark"} `}>
            {showContacts ? <ContactsSideBar {...sideBarProp} /> : <SideBar {...sideBarProp} />}
            <Settings />
            <MainInfo />
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
