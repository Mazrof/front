"use client"
import { useSelectedChtaId } from "@/store/user";
import ChatRoom from "./ChatRoom";
function ChatLayout() {
    const { isSelectedChatId } = useSelectedChtaId()
    const isSelectedChat = isSelectedChatId()
    return (
        <div className={`dark:bg-dark bg-light relative ${!isSelectedChat && "hidden"} min-h-screen w-3/4 overflow-y-auto md:block overflow-x-hidden flex flex-col`}>
            {isSelectedChat && <ChatRoom />}
        </div>
    );
}

export default ChatLayout;
