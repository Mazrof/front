"use client";
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Play, Pause } from "lucide-react";

type VoiceNotePlayerProps = {
    url: string;
};

function VoiceNotePlayer({ url }: VoiceNotePlayerProps) {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    const handlePlayPause = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    return (
        <div className="flex items-center space-x-4">
            <audio ref={audioRef} src={url} />
            <Button aria-label={isPlaying ? "Pause" : "Play"} onClick={handlePlayPause} size="icon">
                {isPlaying ? <Pause /> : <Play />}
            </Button>
            {/* Optional: Display text or other UI elements
            <span>{isPlaying ? "Playing" : "Paused"}</span> */}
        </div>
    );
}

export default VoiceNotePlayer;
