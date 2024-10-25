"use client";

import ChatList from "./ChatsList";
import React from "react";
import ChatsSearchBar from "./ChatsSearchBar";
import NewChatButton from "./NewChatButton";
import { useSelectedChatId } from "@/store/user";
function SideBar() {
    const { isSelectedChatId } = useSelectedChatId();
    const isSelectedChat = isSelectedChatId();
    return (
        <div
            className={`min-w-1/3 relative min-h-screen ${isSelectedChat && "hidden"} max-w-full overflow-y-hidden bg-[#212121] py-2 pl-2 md:block`}
        >
            <ChatsSearchBar />
            <ChatList />
            <div className="absolute bottom-4 right-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <NewChatButton />
            </div>
        </div>
    );
}

export default SideBar;
