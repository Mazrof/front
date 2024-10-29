"use client";
import { UploadingAlert } from "./InputMessage/UploadingAlert";
import InputMessage from "@/components/Chats/InputMessage/InputMessage";

import InfoChatBar from "./InfoChatBar";
import { useSelectedChatId } from "@/store/user";
type ChatRoomProps = {
    children: React.ReactNode;
};
function ChatRoom({ children }: ChatRoomProps) {
    const { isSelectedChatId } = useSelectedChatId();
    const isSelectedChat = isSelectedChatId();
    return (
        <div
            className={`dark:bg-dark bg-light relative ${!isSelectedChat && "hidden"} min-h-screen flex-1 overflow-hidden md:block`}
        >
            {isSelectedChat && (
                <>
                    <InfoChatBar />
                    {children}
                    <UploadingAlert />
                    <InputMessage placeHolder="Message" />
                </>
            )}
        </div>
    );
}

export default ChatRoom;
