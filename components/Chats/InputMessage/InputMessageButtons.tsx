"\
e client";
import { SendMsIcon } from "@/utils/icons";
import { useInputTextMessage, useIsRecording } from "@/store/inputMessage";
import { Socket } from "socket.io-client";
import { getSocket } from "@/lib/socket";
import VoiceNoteHandler from "@/components/Chats/InputMessage/VoiceNoteHandler"; // Import VoiceNoteHandler
 import { MessageTypeBE } from "@/types/Message";
import {  useMessagesStore, useSelectedChatRoom, useWhoAmI } from "@/store/user";

function InputMessageButtons() {
    const { textMessage, setTextMessage } = useInputTextMessage();
    const { isRecording } = useIsRecording();
    const { selectedChatRoom } = useSelectedChatRoom();
    const { setMessage } = useMessagesStore();
    const {user}=useWhoAmI()
    // Regular message sending logic
    function handleOnSendMesage(event: React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault();
        const socket: Socket = getSocket() as Socket
        const message:MessageTypeBE= {
            content:JSON.stringify({text:textMessage,type:"message"}),
            participantId: selectedChatRoom?.id as number, // id of the place where the message is going to be sent or null if you will provide receiverId for new personal chats
            status: undefined, // or null or drafted
            durationInMinutes: undefined, // can be null self destored
            isAnnouncement: false, // for group announcement
            isForward: false,
            participantType: undefined , // or group or personalChat when mention
            channelOrGroupId: undefined,
            replyTo:
                (selectedChatRoom?.id as number) !== 31
                    ? selectedChatRoom?.secondUser?.id
                    : undefined, // or null (the message id to which this message is a reply)
            receiverId: undefined,
            inputMessageMentions: undefined,
            senderId:user?.user.id
        }
        // untill return
        setMessage({...message,id:-1},selectedChatRoom?.id as number,user?.user?.id as number)
        socket?.emit("message:sent", message)
        setTextMessage("")

    }

    return (
        <>
            {isRecording === false && textMessage !== "" ? (
                <button
                    className="rounded-full bg-blue-700 p-3 text-white transition-colors duration-200 hover:bg-blue-800 "
                    data-testid="sendMsIcon"
                    onClick={handleOnSendMesage}
                >
                    <SendMsIcon/>
                </button>
            ) : (
                <VoiceNoteHandler />
            )}
        </>
    );
}

export default InputMessageButtons;
