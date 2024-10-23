"use client";
import React from "react";
import { useSelectedChatId } from "@/store/user";
function SideBar() {
    const { isSelectedChatId } = useSelectedChatId();
    const isSelectedChat = isSelectedChatId();

    return (
        <div
            className={`px-2 ${isSelectedChat && "hidden"} z-10 max-w-[500px] border-r-2 border-white bg-white sm:w-[600px] sm:min-w-[530px] lg:block`}
        >
            Side Bar
        </div>
    );
}

export default SideBar;
