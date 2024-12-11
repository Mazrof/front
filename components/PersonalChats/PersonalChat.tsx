"use client";
import { UploadingAlert } from "../Chats/InputMessage/UploadingAlert";
import InputMessage from "@/components/Chats/InputMessage/InputMessage";
import InfoChatBar from "../Chats/InfoChatBar";
//import { MessageType } from "@/types/Message";
//import { getMessages } from "@/services/Messages";
import { useEffect } from "react";
//import ChatLayout from "../Chats/ChatLayout";
function PersonalChat() {
   // const [messages, setMessages] = useState<MessageType[] | null>(null);
    const FetchMessage = async () => {
      //const messages: any = await getMessages();
      //console.log(messages)
        //setMessages(messages);
    };
    useEffect(() => {
        FetchMessage();
    });
    return (
        <div>
            <InfoChatBar name={"Ahmed Mostafa"} lastSeen={"10:00"}>
                {InfoChatBar.PersonalDrop}
            </InfoChatBar>
            <UploadingAlert />
            {/* <ChatLayout messages={messages as MessageType[]} /> */}
            <InputMessage placeHolder="Message" />
        </div>
    );
}

export default PersonalChat;
