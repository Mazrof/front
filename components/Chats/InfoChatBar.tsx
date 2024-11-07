"use client";
import {
    LeftArrowIcon,
    VoiceCallIcon,
    VideoCallIcon,
    ThreeDotsIcon,
    ScreenShareIcon,
    HangUpIcon,
    FullScreenIcon,
    MuteIcon,
    QuitFullScreenIcon,
} from "@/utils/icons";
import Image from "next/image";
import logo from "../../public/images/logo.jpg";
import { useSelectedChatId } from "@/store/user";
import { useState } from "react";
function InfoChatBar({ name, lastSeen }) {
    const { setChatId } = useSelectedChatId();
    const [isOpen, setIsOpen] = useState(false);
    const [isMute, setIsMute] = useState(false);
    const [isFullScreen, setIsFullScreen] = useState(false);
    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    function handleOnClickArrow(event: React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault();
        setChatId(null);
    }
    function handleVoiceCallClick(event: React.MouseEvent<HTMLDivElement>) {
        event.preventDefault();
        openModal();
    }
    function handleVideoCallClick(event: React.MouseEvent<HTMLDivElement>) {
        event.preventDefault();
        openModal();
    }
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
        <>
            {isOpen && (
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
                            <button>
                                {isFullScreen ? <QuitFullScreenIcon /> : <FullScreenIcon />}
                            </button>
                        </div>

                        {/* User information */}
                        <div className="mt-10 flex flex-col items-center justify-self-start">
                            <h2 className="mb-1 text-2xl font-semibold text-white">{name}</h2>
                            <p className="mb-4 text-white">waiting...</p>
                        </div>

                        {/* Profile initials or image */}

                        {/* Action buttons */}
                        <div className="mt-auto flex items-center justify-center gap-6">
                            <button
                                className="flex flex-col items-center text-white"
                                onClick={handleMute}
                            >
                                <span
                                    className={`hover:bg-customTeal2 rounded-full p-3 ${isMute ? "bg-customTeal2" : ""}`}
                                >
                                    <MuteIcon /> {/* Unmute icon */}
                                </span>
                                <span className="mt-1 text-xs">Mute</span>
                            </button>
                            <button className="flex flex-col items-center text-white">
                                <span className="hover:bg-customTeal2 rounded-full p-3">
                                    <VideoCallIcon color="white" /> {/* Start video icon */}
                                </span>
                                <span className="mt-1 text-xs">start video</span>
                            </button>
                            <button className="flex flex-col items-center text-white">
                                <span className="hover:bg-customTeal2 rounded-full p-3">
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
            )}
            <div className="flex h-16 w-full items-center justify-between border-2 border-gray-200 bg-white px-5 dark:border-slate-800 dark:bg-black">
                <div className="flex gap-6">
                    <button
                        className="rounded-full hover:bg-gray-300"
                        onClick={(event) => handleOnClickArrow(event)}
                    >
                        <LeftArrowIcon />
                    </button>
                    <Image className="rounded-full" src={logo} alt="logo" width={50} height={50} />
                    <div className="flex flex-col">
                        <p className="font-semibold">{name}</p>
                        <p className="text-gray-700"> {`last seen was ${lastSeen} am`}</p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <div className="call-bar" onClick={handleVideoCallClick}>
                        <a>
                            <span>
                                <VideoCallIcon color="black" />
                            </span>
                        </a>
                    </div>
                    <div className="call-bar" onClick={handleVoiceCallClick}>
                        <a>
                            <span>
                                <VoiceCallIcon />
                            </span>
                        </a>
                    </div>
                    <div className="call-bar">
                        <a>
                            <span>
                                <ThreeDotsIcon />
                            </span>
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
}

export default InfoChatBar;
