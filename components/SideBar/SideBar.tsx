"use client";
import { useSelectedChtaId } from "@/store/user";
import React from "react";
import ChatList from "./ChatsList";
import ChatsSearchBar from "./ChatsSearchBar";
import NewChatbtn from "./NewChatBtn";
function SideBar() {
    const { isSelectedChatId } = useSelectedChtaId();
    const isSelectedChat = isSelectedChatId();

    return (
        <div className="custom-scrollbar group relative h-screen w-1/3 overflow-y-scroll bg-[#212121] p-4">
            <ChatsSearchBar />
            <ChatList />
            <div className="absolute bottom-4 right-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <NewChatbtn />
            </div>
        </div>
    );
}

export default SideBar;
