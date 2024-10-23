"use client";
import { UploadingAlert } from "./InputMessage/UploadingAlert";
import InputMessage from "@/components/Chats/InputMessage/InputMessage";
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
