"use client";
import { useSelectedChtaId } from "@/store/user";
import ChatList from "./ChatsList";
import React from "react";
function SideBar() {
    const { isSelectedChatId } = useSelectedChtaId();
    const isSelectedChat = isSelectedChatId();

    return (
        <div className="custom-scrollbar group relative h-screen w-1/3 overflow-y-scroll bg-[#212121] p-4">
            
            <ChatList />

            
        </div>
    );
}

export default SideBar;
