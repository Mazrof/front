import { GetServerSideProps } from "next";
import { MessageType } from "@/types/Message";
import ChatRoom from "./ChatRoom";

interface ChatLayoutProps {
    messages?: MessageType[];
}

export const getServerSideProps: GetServerSideProps = async () => {
    try {
        const response = await fetch("http://localhost:4000/messages");
        const messages = await response.json();
        return { props: { messages } };
    } catch (error) {
        console.error("Error fetching messages:", error);
        return { props: { messages: [] } }; // Fallback with empty array
    }
};

const ChatLayout: React.FC<ChatLayoutProps> = ({ messages }) => {
    return <ChatRoom messages={messages} />;
};

export default ChatLayout;
