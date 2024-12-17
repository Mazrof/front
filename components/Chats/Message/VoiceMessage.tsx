"use client";

import React, { useState, useRef, useEffect } from "react";
import { Play, Pause } from "lucide-react";
import { useMessageContext } from "@/provider/MessageProvider/MessageProvider";

export function VoiceMessage() {
    const [isPlaying, setIsPlaying] = useState(false);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const audioRef = useRef<HTMLAudioElement>(null);
    const { audioUrl } = useMessageContext();
    useEffect(() => {
        const audio = audioRef.current;
        if (audio) {
            audio.addEventListener("loadedmetadata", () => setDuration(audio.duration));
            audio.addEventListener("timeupdate", () => setCurrentTime(audio.currentTime));
            return () => {
                audio.removeEventListener("loadedmetadata", () => setDuration(audio.duration));
                audio.removeEventListener("timeupdate", () => setCurrentTime(audio.currentTime));
            };
        }
    }, []);

    const togglePlayPause = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds.toString().padStart(2, "0")}`;
    };

    return (
        <>
            {audioUrl && (
                <div className="flex max-w-sm items-center space-x-3 rounded-lg bg-gray-100 p-3 dark:bg-gray-800">
                    <button
                        onClick={togglePlayPause}
                        className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-300"
                        aria-label={isPlaying ? "Pause" : "Play"}
                    >
                        {isPlaying ? (
                            <Pause className="h-5 w-5 text-white" />
                        ) : (
                            <Play className="h-5 w-5 text-white" />
                        )}
                    </button>
                    <div className="flex-grow">
                        <div className="relative h-1 w-full rounded-full bg-gray-300 dark:bg-gray-600">
                            <div
                                className="absolute left-0 top-0 h-full rounded-full bg-blue-500"
                                style={{ width: `${(currentTime / duration) * 100}%` }}
                            ></div>
                        </div>
                        <div className="mt-1 flex justify-between text-xs text-gray-500 dark:text-gray-400">
                            <span>{formatTime(currentTime)}</span>
                            <span>{formatTime(duration)}</span>
                        </div>
                    </div>
                    <audio ref={audioRef} src={audioUrl} />
                </div>
            )}
        </>
    );
}
