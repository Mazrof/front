"use client";
import { useSelectedChatId } from "@/store/user";
import ChatList from "./ChatsList";
import React from "react";
import ChatsSearchBar from "./ChatsSearchBar";
import NewChatButton from "./NewChatButton";
function SideBar() {
    const { isSelectedChatId } = useSelectedChatId();
    const isSelectedChat = isSelectedChatId();

    return (
        <div
            className={`custom-scrollbar group ${isSelectedChat && "hidden"} relative h-screen w-1/3 overflow-y-scroll bg-[#212121] p-4`}
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
