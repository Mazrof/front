// import { getMessages } from "@/services/Messages";
import { MessageType, MessageTypeBE } from "@/types/Message";
import { Message } from "@/components/Chats/Message/Message";
import { MessageImage } from "./Message/MessageImage";
import { MessageText } from "./Message/MessageText";
import { MessageCreatedAt } from "./Message/MessageCreatedAt";
import { MessageVideo } from "./Message/MessageVideo";
import { useMessagesStore, useSelectedChatRoom } from "@/store/user";
function ChatLayout() {
    const { selectedChatRoom } = useSelectedChatRoom()
    const {getChatMessage}=useMessagesStore()
    return (
        <div className="mb-60 max-h-[85vh] w-full overflow-y-scroll px-5  transition-all duration-300 ease-in scrollbar scrollbar-track-transparent scrollbar-thumb-[rgba(0,0,0,0.35)]">
            {getChatMessage(selectedChatRoom?.id as number)?.map((message: MessageTypeBE, index) => (
                <div className="container ml-auto w-1/2 px-5  lg:w-1/3" key={index}>
                    <Message message={{ ...JSON.parse(message?.content as string), createdAt: message?.createdAt } as MessageType}>
                        <MessageImage />
                        <MessageVideo />
                        <MessageText />
                        <MessageCreatedAt />
                    </Message>
                </div>
            ))}
        </div>
    );
}

export default ChatLayout;
