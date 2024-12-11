// import { getMessages } from "@/services/Messages";
import { MessageType } from "@/types/Message";
import { Message } from "@/components/Chats/Message/Message";
import { MessageImage } from "./Message/MessageImage";
import { MessageText } from "./Message/MessageText";
import { MessageCreatedAt } from "./Message/MessageCreatedAt";
import { MessageVideo } from "./Message/MessageVideo";
function ChatLayout({ messages }: { messages: MessageType[] }) {
    return(
        <div className="mb-32 max-h-[85vh] overflow-y-scroll transition-all duration-300 ease-in scrollbar scrollbar-track-transparent scrollbar-thumb-[rgba(0,0,0,0.35)] px-5">
          {/*  */}
            {messages?.map((message: MessageType, index) => (
                <div className="container ml-auto  w-1/2 px-4 lg:w-1/3" key={index}>
                    <Message message={message}>
                        <MessageImage />
                        <MessageVideo />
                        <MessageText />
                        <MessageCreatedAt />
                    </Message>
            </div>
                ))}
        </div>
    )
    

  
}

export default ChatLayout;
