"use client";

import ChatList from "./ChatsList";
import React from "react";
import ChatsSearchBar from "./ChatsSearchBar";
import NewChatButton from "./NewChatButton";
function SideBar() {
    return (
        <div
            className={`group relative max-h-screen w-full bg-[#212121] py-2 pl-2 md:w-2/3 lg:w-1/3 xl:w-1/4`}
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
