"use client";
import React from "react";
import { SendMsIcon, VoiceIcon, DeleteIcon } from "@/utils/icons";
import { useInputTextMessage, useIsRecording } from "@/store/inputMessage";
function InputMessageButtons() {
    const { textMessage } = useInputTextMessage();
    const { isRecording, setIsRecoding } = useIsRecording();
    function handleOnClickVoice(event: React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault();
        setIsRecoding(true);
    }
    function handleDeleteRecording(event: React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault();
        setIsRecoding(false);
    }
    function handleSendRecording(event: React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault();
        setIsRecoding(false);
    }
    return (
        <>
            {textMessage !== "" ? (
                <button type="submit" className="input-message-button">
                    <SendMsIcon />
                </button>
            ) : (
                <button
                    className={`input-message-button ${isRecording ? "hidden" : ""} `}
                    onClick={(event) => handleOnClickVoice(event)}
                >
                    <VoiceIcon />
                </button>
            )}
            {isRecording && (
                <>
                    <button
                        className="input-message-button mx-20 bg-red-500 "
                        onClick={(event) => handleDeleteRecording(event)}
                    >
                        <DeleteIcon />
                    </button>
                    <button
                        className="input-message-button "
                        onClick={(event) => handleSendRecording(event)}
                    >
                        <SendMsIcon />
                    </button>
                </>
            )}
        </>
    );
}
export default InputMessageButtons;
