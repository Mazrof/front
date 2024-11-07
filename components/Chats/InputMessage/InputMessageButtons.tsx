"use client";
import React from "react";
import { SendMsIcon, VoiceIcon, DeleteIcon } from "@/utils/icons";
import { useInputTextMessage, useIsRecording } from "@/store/inputMessage";
function InputMessageButtons() {
    const { textMessage,setTextMessage } = useInputTextMessage();
    const { isRecording, setIsRecording } = useIsRecording();
    function handleOnSendMesage(event: React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault();
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
                <button className="input-message-button button-colors" data-testid="sendMsIcon" onClick={(event) => handleOnSendMesage(event)}
>
                    <SendMsIcon  />
                </button>
            ) : (
                <button
                    className={`input-message-button button-colors ${isRecording ? "hidden" : ""} `}
                        onClick={(event) => handleOnClickVoice(event)}
                        data-testid="voiceIcon"
                >
                        <VoiceIcon  />
                </button>
            )}
            {isRecording && (
                <>
                    <button
                        className="input-message-button mr-20 bg-red-500"
                        onClick={(event) => handleDeleteRecording(event)}
                        data-testid="deleteIcon" 
                    >
                        <DeleteIcon />
                    </button>
                    <button
                        className="input-message-button button-colors"
                        onClick={(event) => handleSendRecording(event)}
                        data-testid="sendVoiceIcon"
                    >
                        <SendMsIcon  />
                    </button>
                </>
            )}
        </>
    );
}
export default InputMessageButtons;
