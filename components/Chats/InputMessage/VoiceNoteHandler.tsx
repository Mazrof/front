"use client";

import React, { useRef, useState } from "react";
import { useIsRecording } from "@/store/inputMessage";
import { toast } from "@/hooks/use-toast";
import { getSocket } from "@/lib/socket";
import { DeleteIcon, SendMsIcon, StopRecordingIcon, VoiceIcon } from "@/utils/icons";
import { Card, CardContent } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const VoiceNoteHandler = () => {
    const { isRecording, setIsRecording } = useIsRecording();
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
    const [audioURL, setAudioURL] = useState<string | null>(null);
    const [recordingTime, setRecordingTime] = useState<number>(0);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    // Start recording
    const handleStartRecording = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            const mediaRecorder = new MediaRecorder(stream);
            mediaRecorderRef.current = mediaRecorder;

            const chunks: BlobPart[] = [];
            mediaRecorder.ondataavailable = (e) => chunks.push(e.data);
            mediaRecorder.onstop = () => {
                const audioBlob = new Blob(chunks, { type: "audio/ogg; codecs=opus" });
                setAudioBlob(audioBlob);
                setAudioURL(URL.createObjectURL(audioBlob));
            };

            mediaRecorder.start();
            setIsRecording(true);

            // Start the timer
            timerRef.current = setInterval(() => {
                setRecordingTime((prevTime) => prevTime + 1);
            }, 1000);
        } catch {
            toast({
                title: "Error",
                description: "Unable to access the microphone.",
                variant: "destructive",
            });
        }
    };

    // Stop recording
    const handleStopRecording = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        if (mediaRecorderRef.current) {
            mediaRecorderRef.current.stop();
            mediaRecorderRef.current.stream.getTracks().forEach((track) => track.stop());

            // Clear the timer
            if (timerRef.current) clearInterval(timerRef.current);
            setRecordingTime(0);
            setIsRecording(false);
        }
    };

    // Send the recording
    const handleSendRecording = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        if (audioBlob) {
            const socket = getSocket();
            const message = {
                content: JSON.stringify({ audio: audioBlob }),
                participantId: "8", // Replace with dynamic data
            };

            socket?.emit("message:sent", message);
            toast({
                title: "Success",
                description: "Voice note sent!",
            });

            // Reset state
            setAudioBlob(null);
            setAudioURL(null);
            setRecordingTime(0);
        }
    };

    // Format time for display
    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    };

    // Recording in Progress UI
    const RecordingUI = () => (
        <Card className="mx-auto w-full max-w-xs shadow-md dark:border-gray-700 dark:bg-gray-800">
            <CardContent className="flex flex-col items-center space-y-4 p-4">
                <div className="flex items-center space-x-2">
                    <div className="h-3 w-3 animate-pulse rounded-full bg-red-500"></div>
                    <span className="text-lg font-semibold dark:text-white">
                        {formatTime(recordingTime)}
                    </span>
                </div>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <button
                                className="rounded-full bg-red-500 p-3 text-white transition-colors duration-200 hover:bg-red-600"
                                onClick={handleStopRecording}
                            >
                                <StopRecordingIcon />
                            </button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Stop Recording</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </CardContent>
        </Card>
    );

    // Audio Preview UI
    const AudioPreviewUI = () => (
        <Card className="mx-auto w-full max-w-xs shadow-md dark:border-gray-700 dark:bg-gray-800">
            <CardContent className="flex flex-col items-center space-y-4 p-4">
                <audio
                    controls
                    src={audioURL || ""}
                    className="mb-2 w-full rounded-md dark:bg-gray-700"
                />
                <div className="flex justify-center space-x-4">
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <button
                                    className="rounded-full bg-blue-500 p-2 text-white transition-colors duration-200 hover:bg-blue-600"
                                    onClick={handleSendRecording}
                                >
                                    <SendMsIcon />
                                </button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Send Voice Note</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>

                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <button
                                    className="rounded-full bg-gray-500 p-2 text-white transition-colors duration-200 hover:bg-gray-600"
                                    onClick={() => {
                                        setAudioBlob(null);
                                        setAudioURL(null);
                                    }}
                                >
                                    <DeleteIcon />
                                </button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Delete Voice Note</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>
            </CardContent>
        </Card>
    );

    // Start Recording Button
    const StartRecordingButton = () => (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <button
                        className="rounded-full bg-blue-700 p-3 text-white transition-colors duration-200 hover:bg-blue-800"
                        onClick={handleStartRecording}
                    >
                        <VoiceIcon />
                    </button>
                </TooltipTrigger>
                <TooltipContent>
                    <p>Start Voice Recording</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );

    return (
        <div className="flex items-center justify-center">
            {isRecording ? (
                <RecordingUI />
            ) : audioURL ? (
                <AudioPreviewUI />
            ) : (
                <StartRecordingButton />
            )}
        </div>
    );
};

export default VoiceNoteHandler;
