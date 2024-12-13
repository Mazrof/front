"use client";
import { SendMsIcon } from "@/utils/icons";
import { useInputTextMessage, useIsRecording } from "@/store/inputMessage";
import { Socket } from "socket.io-client";
import { getSocket } from "@/lib/socket";
import VoiceNoteHandler from "@/components/Chats/InputMessage/VoiceNoteHandler"; // Import VoiceNoteHandler
import { useIsFirstTimeChat, useSelectedChatRoom } from "@/store/user";

function InputMessageButtons() {
    const { textMessage, setTextMessage } = useInputTextMessage();
    const { isFirstTime } = useIsFirstTimeChat();
    const { isRecording } = useIsRecording();
    const { selectedChatRoom } = useSelectedChatRoom();

    // Regular message sending logic
    function handleOnSendMesage(event: React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault();
        console.log(isFirstTime);
        const socket: Socket = getSocket() as Socket;
        const message = {
            content: JSON.stringify({ text: textMessage }),
            participantId: selectedChatRoom?.id, // id of the place where the message is going to be sent or null if you will provide receiverId for new personal chats //status: "usual", // or null or drafted //durationInMinutes: "30", // can be null self destored //isAnnouncement: false, // for group announcement //isForward: false, // participantType: 'personalChat',// or group or personalChat //channelOrGroupId: 2, //replyTo: null, // or null (the message id to which this message is a reply) //senderId: 58, // Will be deleted after merging auth, //receiverId: 101, //"inputMessageMentions": null
        };
        console.log(message);
        socket?.emit("message:sent", message);
        setTextMessage("");
    }

    return (
        <>
            {isRecording === false && textMessage !== "" ? (
                <button
                    className="input-message-button button-colors"
                    data-testid="sendMsIcon"
                    onClick={handleOnSendMesage}
                >
                    <SendMsIcon />
                </button>
            ) : (
                <VoiceNoteHandler />
            )}
        </>
    );
}

export default InputMessageButtons;
