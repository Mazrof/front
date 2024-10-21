"use client"
import InputMessage from "@/components/Chats/InputMessage";
import InfoChatBar from "./InfoChatBar";
function ChatRoom() {
    return (
        <>
            <InfoChatBar />
            <InputMessage placeHolder="Message" />
        </>
    )
}

export default ChatRoom
