"use client";
import { useMessagesStore, useSelectedChatRoom } from "@/store/user";
import PersonalChat from "../PersonalChats/PersonalChat";
import ChannelChats from "../Channels/ChannelChats/ChannelChats";
import GroupChats from "../Groups/GroupChats/GroupChats";
import { useEffect } from "react";
import { parseMessageContent, sendMessageBE } from "@/utils/inputMessage";
import { useWhoAmI } from "@/store/user";
import { useInputTextMessage } from "@/store/inputMessage";
function ChatRoom() {
    const { isSelectedChatRoom, selectedChatRoom, previousChatRoom } = useSelectedChatRoom();
    const isSelectedChat = isSelectedChatRoom();
    const { setMessage, getChatMessage } = useMessagesStore();
    const { textMessage, setTextMessage } = useInputTextMessage();
    const { user } = useWhoAmI();
    useEffect(() => {
        console.log("previous",previousChatRoom,"current",selectedChatRoom)
        if (previousChatRoom && textMessage !== "" && previousChatRoom.id !== selectedChatRoom?.id) {
            sendMessageBE(
                previousChatRoom,
                user,
                setMessage,
                { text: textMessage, type: "message" },
                "drafted"
            );
            setTextMessage("");
        }
        if (selectedChatRoom) {
            const lastMessage = getChatMessage(selectedChatRoom.id).at(0);
            if (lastMessage && lastMessage?.status === "drafted") {
                console.log("last message",lastMessage)
                const text = parseMessageContent(lastMessage?.content as string)?.text;
                setTextMessage(text as string);
            }
        }
    }, [selectedChatRoom]);
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
