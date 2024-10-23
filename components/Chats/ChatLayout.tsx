import InputMessage from "@/components/Chats/InputMessage";
import { Message } from "@/components/Chats/Message/Message";
import { MessageImage } from "./Message/MessageImage";
import { MessageVideo } from "./Message/MessageVideo";
import { MessageText } from "./Message/MessageText";
import { MessageCreatedAt } from "./Message/MessageCreatedAt";
import { MessageType } from "@/types/Message";
async function ChatLayout() {
    const response = await fetch("http://localhost:4000/messages");
    const messages: MessageType[] = await response.json();
    return (
        <div className="dark:bg-dark bg-light relative max-h-screen w-full md:block">
            <div className="scrollbar scrollbar-track-transparent scrollbar-thumb-[rgba(0,0,0,0.35)] mb-32 mt-12 max-h-[85vh] overflow-y-scroll transition-all duration-300 ease-in">
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
        </div>
    );
}

export default ChatLayout;
