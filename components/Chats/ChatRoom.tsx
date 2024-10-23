"use client";
import { UploadingAlert } from "./UploadingAlert";
import InputMessage from "@/components/Chats/InputMessage";
import InfoChatBar from "./InfoChatBar";
function ChatRoom() {
    return (
        <>
            <InfoChatBar />
            <UploadingAlert />
            <InputMessage placeHolder="Message" />
        </>
    );
}

export default ChatRoom;
