"use client";
import React from "react";
import { SendMsIcon, VoiceIcon, DeleteIcon } from "@/utils/icons";
import { useInputTextMessage, useIsRecording } from "@/store/inputMessage";
import { Socket } from "socket.io-client";
import { getSocket } from "@/lib/socket";
// import { MessageTypeBE } from "@/types/Message";
import { useIsFirstTimeChat, useSelectedChatRoom } from "@/store/user";
function InputMessageButtons() {
    const { textMessage, setTextMessage } = useInputTextMessage();
    const { isRecording, setIsRecording } = useIsRecording();
    const {isFirstTime}=useIsFirstTimeChat()
    const {selectedChatRoom}=useSelectedChatRoom()
    function handleOnSendMesage(event: React.MouseEvent<HTMLButtonElement>) {
        console.log(isFirstTime)
        event.preventDefault();
        const socket: Socket = getSocket() as Socket
        const message= {
            content:JSON.stringify({text:textMessage}),
            participantId: selectedChatRoom?.id, // id of the place where the message is going to be sent or null if you will provide receiverId for new personal chats
            //status: "usual", // or null or drafted
            //durationInMinutes: "30", // can be null self destored
            //isAnnouncement: false, // for group announcement
            //isForward: false,
           // participantType: 'personalChat',// or group or personalChat
            //channelOrGroupId: 2,
            //replyTo: null, // or null (the message id to which this message is a reply)
            //senderId: 58, // Will be deleted after merging auth,
            //receiverId: 101,
             //"inputMessageMentions": null
        }
        console.log(message)
        socket?.emit("message:sent",message)
        setTextMessage("")

    }
    function handleOnClickVoice(event: React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault();
        setIsRecording(true);
    }
    function handleDeleteRecording(event: React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault();
        setIsRecording(false);
    }
    function handleSendRecording(event: React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault();
        setIsRecording(false);
    }
    return (
        <>
            {textMessage !== "" ? (
                <button
                    className="input-message-button button-colors"
                    data-testid="sendMsIcon"
                    onClick={(event) => handleOnSendMesage(event)}
                    data-test="chatList-chatRoom-sendMessage"
                >
                    <SendMsIcon />
                </button>
            ) : (
                <button
                    className={`input-message-button button-colors ${isRecording ? "hidden" : ""} `}
                    onClick={(event) => handleOnClickVoice(event)}
                    data-testid="voiceIcon"
                    data-test="chatList-chatRoom-startRecording"
                >
                    <VoiceIcon />
                </button>
            )}
            {isRecording && (
                <>
                    <button
                        className="input-message-button mr-20 bg-red-500"
                        onClick={(event) => handleDeleteRecording(event)}
                        data-testid="deleteIcon"
                        data-test="chatList-chatRoom-deleteRecording"
                    >
                        <DeleteIcon />
                    </button>
                    <button
                        className="input-message-button button-colors"
                        onClick={(event) => handleSendRecording(event)}
                        data-testid="sendVoiceIcon"
                        data-test="chatList-chatRoom-sendRecording"
                    >
                        <SendMsIcon />
                    </button>
                </>
            )}
        </>
    );
}
export default InputMessageButtons;
