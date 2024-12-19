"use client";
import { useEffect } from "react";
import { useSelectedChatRoom } from "@/store/user";
import PersonalChat from "../PersonalChats/PersonalChat";
import ChannelChats from "../Channels/ChannelChats/ChannelChats";
import GroupChats from "../Groups/GroupChats/GroupChats";

function ChatRoom() {
    const { isSelectedChatRoom, selectedChatRoom } = useSelectedChatRoom();
    const isSelectedChat = isSelectedChatRoom();
    useEffect(() => {}, [isSelectedChat]);
    console.log("selected id", selectedChatRoom);
    return (
        <div
            className={`bg-light dark:bg-dark relative ${
                !isSelectedChat && "hidden"
            } min-h-screen flex-1 overflow-hidden md:block`}
        >
            {isSelectedChat && (
                <>
                    {selectedChatRoom?.type === "personalChat" && <PersonalChat />}
                    {selectedChatRoom?.type === "channel" && <ChannelChats />}
                    {selectedChatRoom?.type === "group" && <GroupChats />}
                    {/* TODO: Add other types like group and channel */}
                </>
            )}
        </div>
    );
}

export default ChatRoom;
