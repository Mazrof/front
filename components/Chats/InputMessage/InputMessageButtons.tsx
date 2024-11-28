"use client";
import React from "react";
import {useState} from 'react';
import { SendMsIcon, VoiceIcon, DeleteIcon } from "@/utils/icons";
import { useInputTextMessage, useIsRecording } from "@/store/inputMessage";
function InputMessageButtons() {
    const { textMessage,setTextMessage } = useInputTextMessage();
    const { isRecording, setIsRecording } = useIsRecording();
    const [recorder, setRecorder] = useState<MediaRecorder| null>(null);
    let audioURL:string='';
    let [recordingDuration, setRecordingDuration] = useState<number>(0);
    let [id,setId] = useState<NodeJS.Timeout>();
    let chunks : Blob[] = [];
    let [saveRecording,setSaveRecording] = useState<boolean>(true);
    function handleOnSendMesage(event: React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault();
        setTextMessage("")
    }
    async function handleOnClickVoice(event: React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault();
        setIsRecording(true);
        
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true } );
        
        const mediaRecorder = new MediaRecorder(stream);

        mediaRecorder.ondataavailable = (event) => {
            chunks.push(event.data);
        };

        mediaRecorder.onstop = () => {
            const audioBlob = new Blob(chunks, { type: 'audio/ogg; codecs=opus'});
            chunks = [];
            audioURL = window.URL.createObjectURL(audioBlob);

            stream.getTracks().forEach(track => {
                track.stop();
            });
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
        setIsRecording(false);
        
     
        setSaveRecording(false);
        
        if (recorder) {
            recorder.stop();
            clearInterval(id);
        }
    }
    function handleSendRecording(event: React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault();
        setIsRecording(false);
       
        setSaveRecording(true);
        
        if (recorder) {
            recorder.stop();
            clearInterval(id);
        }
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
                    <div className="dark:bg-red-500 dark:text-black mr-20 w-5 h-50">
                    {Math.floor(recordingDuration / 60)} : {recordingDuration % 60} 
                    </div>
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
