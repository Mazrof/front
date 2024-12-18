// import { getMessages } from "@/services/Messages";
import { MessageType, MessageTypeBE } from "@/types/Message";
import { Message } from "@/components/Chats/Message/Message";
import { MessageImage } from "./Message/MessageImage";
import { MessageText } from "./Message/MessageText";
import { MessageCreatedAt } from "./Message/MessageCreatedAt";
import { MessageVideo } from "./Message/MessageVideo";
import { useMessagesStore, useSelectedChatRoom, useWhoAmI } from "@/store/user";
import { VoiceMessage } from "@/components/Chats/Message/VoiceMessage";
import { MessageDialog } from "./Message/MessageDialog";
function ChatLayout() {
    const { selectedChatRoom } = useSelectedChatRoom();
    const { user } = useWhoAmI();
    const { getChatMessage } = useMessagesStore();
    const parseMessageContent = (content: string | undefined): MessageType => {
        try {
            // Try to parse the content if it's a valid JSON string
            return JSON.parse(content as string);
        } catch (error) {
            // Handle the case where JSON is invalid
            console.error("Error parsing message content:", error);
            return {
                type: "message",
            }; // Return an empty object or a default value
        }
    };

    return (
        <div className="mb-60 max-h-[85vh] w-full overflow-y-scroll px-5 transition-all duration-300 ease-in scrollbar scrollbar-track-transparent scrollbar-thumb-[rgba(0,0,0,0.35)]">
            {getChatMessage(selectedChatRoom?.id as number)?.map(
                (message: MessageTypeBE, index) => (
                    <div
                        className={`container ${message.senderId === user?.user.id ? "ml-auto" : "mr-auto"} w-1/2 px-5 lg:w-1/3`}
                        key={index}
                    >
                        <Message
                            message={
                                {
                                    ...parseMessageContent(message?.content as string),
                                    createdAt: message?.createdAt,
                                } as MessageType
                            }
                        >
                            <MessageImage />
                            <MessageVideo />
                            <VoiceMessage />
                            <MessageDialog/>
                            <MessageText />
                            <MessageCreatedAt />
                        </Message>
                    </div>
                )
            )}
        </div>
    );
}

export default ChatLayout;
