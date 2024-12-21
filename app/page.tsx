/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import ChatRoom from "@/components/Chats/ChatRoom";
import MessageLoading from "@/components/Chats/Message/MessageLoading";
import ContactsSideBar from "@/components/Contacts/ContactsSideBar";
import GlobalSearchSideBar from "@/components/GlobalSearch/GlobalSearchSideBar";
import Settings from "@/components/Settings/Settings";
import SideBar from "@/components/SideBar/SideBar";
import { useEffect, useState } from "react";
import { useWhoAmI } from "@/store/user";
import { getWhoAmI } from "@/services/User";
import { failResponse, genericResponse, successResponse } from "@/types/api";
import { WhoAmI } from "@/types/user";
import { useRouter } from "next/navigation";
export default function Home() {
    const [showContacts, setShowContacts] = useState(false);
    const [showGlobalSearch, setShowGlobalSearch] = useState(false);
    const [chat, setChat] = useState(null);
    const [darkMode, setDarkMode] = useState(false);
    const router = useRouter();
    const { setWhoAmI } = useWhoAmI();
    const sideBarProp = {
        darkMode: darkMode,
        setDarkMode: setDarkMode,
        showContacts: showContacts,
        setShowContacts: setShowContacts,
        showGlobalSearch: showGlobalSearch,
        setShowGlobalSearch: setShowGlobalSearch,
    };
    const getUser = async () => {
        const response: genericResponse<WhoAmI> = await getWhoAmI();
        if (response.status === "fail" || response.status === "error") {
            const failApiResponse = response as failResponse;
            router.push("/login");
        } else {
            const data = (response as successResponse<WhoAmI>).data;
            setWhoAmI(data);
        }
    };
    useEffect(() => {
        getUser();
    }, []);
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

            <ChatRoom />
        </div>
    );
}
