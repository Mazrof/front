"use client";
import InputMessage from "@/components/Chats/InputMessage";
import { Message } from "@/components/Chats/Message/Message";
import { MessageImage } from "./Message/MessageImage";
import { MessageVideo } from "./Message/MessageVideo";
import { MessageText } from "./Message/MessageText";
import { MessageCreatedAt } from "./Message/MessageCreatedAt";
import InfoChatBar from "./InfoChatBar";
import { useSelectedChatId } from "@/store/user";
import { MessageType } from "@/types/Message";
type ChatRoomProps = {
    messages: MessageType[];
};
function ChatRoom({ messages }: ChatRoomProps) {
    const { isSelectedChatId } = useSelectedChatId();
    const isSelectedChat = isSelectedChatId();
    return (
        <div
            className={`dark:bg-dark bg-light relative ${!isSelectedChat && "hidden"} max-h-screen w-1/3 lg:w-2/3 xl:w-3/4`}
        >
            {isSelectedChat && (
                <>
                    <InfoChatBar />
                    <div className="mb-32 max-h-[85vh] overflow-y-scroll transition-all duration-300 ease-in scrollbar scrollbar-track-transparent scrollbar-thumb-[rgba(0,0,0,0.35)]">
                        <div className="container mx-auto w-1/2 px-4 lg:w-1/3">
                            {messages.map((message: MessageType, index) => (
                                <Message message={message} key={index}>
                                    <MessageImage />
                                    <MessageText />
                                    <MessageVideo />
                                    <MessageCreatedAt />
                                </Message>
                            ))}
                        </div>
                    </div>
                    <InputMessage placeHolder="Message" />
                </>
            )}
        </div>
    );
}

export default ChatRoom;
