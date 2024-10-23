import { MessageType } from "@/types/Message";
import ChatRoom from "./ChatRoom";
async function ChatLayout() {
    const response = await fetch("http://localhost:4000/messages");
    const messages: MessageType[] = await response.json();
    return <ChatRoom messages={messages} />;
}

export default ChatLayout;
