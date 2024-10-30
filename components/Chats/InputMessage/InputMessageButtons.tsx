"use client";
import React from "react";
import {useState} from 'react';
import { SendMsIcon, VoiceIcon, DeleteIcon } from "@/utils/icons";
import { useInputTextMessage, useIsRecording } from "@/store/inputMessage";
function InputMessageButtons() {
    const { textMessage } = useInputTextMessage();
    const { isRecording, setIsRecoding } = useIsRecording();
    
    const [recorder, setRecorder] = useState<MediaRecorder| null>(null);
    let [recordingDuration, setRecordingDuration] = useState<number>(0);
    let [id,setId] = useState<NodeJS.Timeout>();
    let chunks : Blob[] = [];

    async function handleOnClickVoice(event: React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault();
        setIsRecoding(true);
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
        
        const mediaRecorder = new MediaRecorder(stream);

        mediaRecorder.ondataavailable = (event) => {
            chunks.push(event.data);
        };

        mediaRecorder.onstop = (event) => {
            const audioBlob = new Blob(chunks, { type: 'audio/ogg; codecs=opus'});
            chunks = [];
            const audioURL = window.URL.createObjectURL(audioBlob);
      
            const audioMessage = new Audio();
            audioMessage.src = audioURL;
            audioMessage.controls = true;
            document.body.appendChild(audioMessage);
            setRecordingDuration(0);
            
        };

        mediaRecorder.onstart = () => {
            setRecordingDuration(0);
        };
        mediaRecorder.start();
        setRecorder(mediaRecorder);
        setId( setInterval(() => {setRecordingDuration(recordingDuration++)},1000) ); 
    }
    function handleDeleteRecording(event: React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault();
        setIsRecoding(false);
        if (recorder) {
            chunks=[];
            clearInterval(id);
            setRecordingDuration(0);
        }
    }
    function handleSendRecording(event: React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault();
        setIsRecoding(false);
        if (recorder) {
            recorder.stop();
            clearInterval(id);
        }
    }
    return (
        <>
            {textMessage !== "" ? (
                <button type="submit" className="input-message-button button-colors">
                    <SendMsIcon />
                </button>
            ) : (
                <button
                    className={`input-message-button button-colors ${isRecording ? "hidden" : ""} `}
                    onClick={(event) => handleOnClickVoice(event)}
                >
                    <VoiceIcon />
                </button>
            )}
            {isRecording && (
                <>
                    <div  className=" bg-red-500 rounded-full border-solid mr-20"> {recordingDuration} </div>
                    <button
                        className="input-message-button mr-20 bg-red-500"
                        onClick={(event) => handleDeleteRecording(event)}
                    >
                        <DeleteIcon />
                    </button>
                    <button
                        className="input-message-button button-colors"
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
