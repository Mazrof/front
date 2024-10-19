import InputMessage from "@/components/Chats/InputMessage";
import {
    Message,
    MessageCreatedAt,
    MessageImage,
    MessageText,
    MessageVideo,
} from "@/components/Chats/Message";

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
            <div>
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
