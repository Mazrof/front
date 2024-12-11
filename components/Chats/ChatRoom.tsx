"use client";
import { UploadingAlert } from "./InputMessage/UploadingAlert";
import InputMessage from "@/components/Chats/InputMessage/InputMessage";

import InfoChatBar from "./InfoChatBar";
import { useSelectedChatRoom } from "@/store/user";
type ChatRoomProps = {
    children: React.ReactNode;
};
function ChatRoom({ children }: ChatRoomProps) {
    const { isSelectedChatRoom } = useSelectedChatRoom();
    const isSelectedChat = isSelectedChatRoom();
    return (
        <div
            className={`bg-light dark:bg-dark relative ${!isSelectedChat && "hidden"} min-h-screen flex-1 overflow-hidden md:block`}
        >
            {isSelectedChat && (
                <>
                    <InfoChatBar name={"Ahmed Mostafa"} lastSeen={"10:00"} />
                    {children}
                    <UploadingAlert />
                    <InputMessage placeHolder="Message" />
                </>
            )}
        </div>
    );
}

export default ChatRoom;
