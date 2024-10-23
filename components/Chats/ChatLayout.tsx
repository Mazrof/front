import InputMessage from "@/components/Chats/InputMessage";
import { Message } from "@/components/Chats/Message/Message";
import { MessageImage } from "./Message/MessageImage";
import { MessageVideo } from "./Message/MessageVideo";
import { MessageText } from "./Message/MessageText";
import { MessageCreatedAt } from "./Message/MessageCreatedAt";

type MessageResponseType = {
    text: string | undefined;
    imageUrl: string[] | undefined;
    createdAt: string | undefined;
    videoUrl: string[] | undefined;
};
async function ChatLayout() {
    const response = await fetch("http://localhost:4000/messages");
    const messages: MessageResponseType[] = await response.json();
    return (
        <div className="dark:bg-dark bg-light relative hidden min-h-screen w-full overflow-y-auto md:block">
            <div className="container mx-auto w-1/2 lg:w-1/3">
                {messages.map((message, index) => (
                    <Message message={message} key={index}>
                        <MessageImage />
                        <MessageText />
                        <MessageVideo />
                        <MessageCreatedAt />
                    </Message>
                ))}
            </div>
            <InputMessage placeHolder="Message" />
        </div>
    );
}

export default ChatLayout;
