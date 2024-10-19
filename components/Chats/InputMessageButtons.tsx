"use client";
import React from "react";
import { SendMsIcon, VoiceIcon, DeleteIcon } from "@/utils/icons";
import { useInputTextMessage, useIsRecording } from "@/store/inputMessage";
function InputMessageButtons() {
    const { textMessage } = useInputTextMessage();
    const { isRecording, setIsRecoding } = useIsRecording();
    function handleOnClickVoice(e: any) {
        /** Edit
         * function handleOnClickVoice(event:React.MouseEvent<HTMLButtonElement>) because any is bad indication for typescript ;)
         * and Replace every e in the file
         */
        e.preventDefault();
        setIsRecoding(true);
    }
    function handleDeleteRecording(e: any) {
        /** Edit
         * function handleDeleteRecording(event:React.MouseEvent<HTMLButtonElement>) because any is bad indication for typescript ;)
         * and Replace every e in the file
         */
        e.preventDefault();
        setIsRecoding(false);
    }
    function handleSendRecording(e: any) {
        /** Edit
         * function handleSendRecording(event:React.MouseEvent<HTMLButtonElement>) because any is bad indication for typescript ;)
         * and Replace every e in the file
         */
        e.preventDefault();
        setIsRecoding(false);
    }
    return (
        <>
            {textMessage !== "" ? (
                <button type="submit" className="input-message-button">
                    {" "}
                    <SendMsIcon />
                </button>
            ) : (
                <button
                    className={`input-message-button ${isRecording ? "hidden" : ""} `}
                    onClick={(e) => handleOnClickVoice(e)}
                >
                    <VoiceIcon />
                </button>
            )}
            {isRecording && (
                <>
                    <button
                        className="input-message-button mx-20 bg-red-500"
                        onClick={(e) => handleDeleteRecording(e)}
                    >
                        {" "}
                        <DeleteIcon />
                    </button>
                    <button
                        className="input-message-button ml-3"
                        onClick={(e) => handleSendRecording(e)}
                    >
                        {" "}
                        <SendMsIcon />
                    </button>
                </>
            )}
        </>
    );
}
export default InputMessageButtons;
