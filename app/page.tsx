"use client";
import ChatLayout from "@/components/Chats/ChatLayout";
import ChatRoom from "@/components/Chats/ChatRoom";
import MessageLoading from "@/components/Chats/Message/MessageLoading";
import ContactsSideBar from "@/components/Contacts/ContactsSideBar";
import SideBar from "@/components/SideBar/SideBar";
import { Suspense, useState } from "react";
export default function Home() {
    const [showContacts, setShowContacts] = useState(false);
    const [darkMode, setDarkMode] = useState(false);
    const sideBarProp = {
        darkMode: darkMode,
        setDarkMode: setDarkMode,
        showContacts: showContacts,
        setShowContacts: setShowContacts,
    };

    return (
        <div className={`min-w-screen flex max-h-screen max-w-full ${darkMode && "dark"} `}>
            {showContacts ? <ContactsSideBar {...sideBarProp} /> : <SideBar {...sideBarProp} />}
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
