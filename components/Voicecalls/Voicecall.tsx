import {
    ScreenShareIcon,
    HangUpIcon,
    FullScreenIcon,
    MuteIcon,
    QuitFullScreenIcon,
    VideoCallIcon,
} from "@/utils/icons";
import { useState } from "react";
type VoicecallProps = {
    setIsOpen: (arg: boolean) => void;
    name: string;
};
export default function Voicecall({ setIsOpen, name }: VoicecallProps) {
    const [isMute, setIsMute] = useState(false);
    const [isFullScreen, setIsFullScreen] = useState(false);
    const closeModal = () => setIsOpen(false);
    function handleMute(event: React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault();
        setIsMute(() => !isMute);
    }
    function handleFullScreen(event: React.MouseEvent<HTMLDivElement>) {
        event.preventDefault();
        setIsFullScreen(() => !isFullScreen);
    }
    function handleQuitFullScreen(event: React.MouseEvent<HTMLDivElement>) {
        event.preventDefault();
        setIsFullScreen(() => !isFullScreen);
    }
    function handleEndCall(event: React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault();
        setIsFullScreen(false);
        setIsMute(false);
        setIsOpen(false);
    }
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            {/* Modal content */}
            <div
                className={`relative flex ${isFullScreen ? "h-full w-full" : "h-1/2 w-1/5"} max-w-full flex-col items-center justify-around rounded-lg bg-sky-300 p-6`}
            >
                {/* Close button */}
                <div
                    className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full text-xl text-white hover:bg-sky-400 hover:text-gray-900"
                    onClick={closeModal}
                >
                    <button>&times;</button>
                </div>

                <div
                    className="absolute left-3 top-3 flex h-8 w-8 items-center justify-center rounded-full text-xl text-white hover:bg-sky-400 hover:text-gray-900"
                    onClick={isFullScreen ? handleQuitFullScreen : handleFullScreen}
                >
                    <button>{isFullScreen ? <QuitFullScreenIcon /> : <FullScreenIcon />}</button>
                </div>

                {/* User information */}
                <div className="mt-10 flex flex-col items-center justify-self-start">
                    <h2 className="mb-1 text-2xl font-semibold text-white">{name}</h2>
                    <p className="mb-4 text-white">waiting...</p>
                </div>

                {/* Profile initials or image */}

                {/* Action buttons */}
                <div className="mt-auto flex items-center justify-center gap-6">
                    <button className="flex flex-col items-center text-white" onClick={handleMute}>
                        <span
                            className={`rounded-full p-3 hover:bg-customTeal2 ${isMute ? "bg-customTeal2" : ""}`}
                        >
                            <MuteIcon /> {/* Unmute icon */}
                        </span>
                        <span className="mt-1 text-xs">Mute</span>
                    </button>
                    <button className="flex flex-col items-center text-white">
                        <span className="rounded-full p-3 hover:bg-customTeal2">
                            <VideoCallIcon color="white" /> {/* Start video icon */}
                        </span>
                        <span className="mt-1 text-xs">start video</span>
                    </button>
                    <button className="flex flex-col items-center text-white">
                        <span className="rounded-full p-3 hover:bg-customTeal2">
                            <ScreenShareIcon />
                        </span>
                        <span className="mt-1 text-xs">Screencast</span>
                    </button>
                    <button
                        onClick={handleEndCall}
                        className="bg-red bg flex flex-col items-center text-white"
                    >
                        <span className="rounded-full bg-red-500 p-3 hover:bg-red-600">
                            <HangUpIcon />
                        </span>
                        <span className="mt-1 text-xs">End call</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
