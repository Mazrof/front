import { getMessages } from "@/services/Messages";
import ChatRoom from "./ChatRoom";
import { MessageType } from "@/types/Message";
import { Message } from "@/components/Chats/Message/Message";
import { MessageImage } from "./Message/MessageImage";
import { MessageVideo } from "./Message/MessageVideo";
import { MessageText } from "./Message/MessageText";
import { MessageCreatedAt } from "./Message/MessageCreatedAt";
async function ChatLayout() {
    const messages: MessageType[] = await getMessages();

    const renderedMessages = (
        <div className="mb-32 max-h-[85vh] overflow-y-scroll transition-all duration-300 ease-in scrollbar scrollbar-track-transparent scrollbar-thumb-[rgba(0,0,0,0.35)]">
            <div className="container mx-auto w-1/2 px-4 lg:w-1/3">
                {messages?.map((message: MessageType, index) => (
                    <Message message={message} key={index}>
                        <MessageImage />
                        <MessageVideo />
                        <MessageText />
                        <MessageCreatedAt />
                    </Message>
                ))}
            </div>
        </div>
    );

    return <ChatRoom>{renderedMessages}</ChatRoom>;
}

export default ChatLayout;
