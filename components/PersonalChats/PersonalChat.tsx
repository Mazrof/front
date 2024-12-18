"use client";
import { UploadingAlert } from "../Chats/InputMessage/UploadingAlert";
import InputMessage from "@/components/Chats/InputMessage/InputMessage";
import InfoChatBar from "../Chats/InfoChatBar";
import ChatLayout from "../Chats/ChatLayout";
import { useSelectedChatRoom } from "@/store/user";
function PersonalChat() {
    const { selectedChatRoom } = useSelectedChatRoom();
    console.log("user",selectedChatRoom)
    // Ensure selectedChatRoom is defined before rendering
    if (!selectedChatRoom) return <div>Loading...</div>;
    return (
        <div>
            <InfoChatBar
                name={selectedChatRoom.secondUser?.username as string}
                lastSeen={selectedChatRoom.secondUser?.lastSeen as string}
            >
                {InfoChatBar.PersonalDrop}
            </InfoChatBar>
            <UploadingAlert />
            <ChatLayout />
            <InputMessage placeHolder="Message" />
        </div>
    );
}

export default PersonalChat;
