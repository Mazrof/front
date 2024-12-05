"use client";

import { LeftArrowIcon, VoiceCallIcon, VideoCallIcon } from "@/utils/icons";
import Image from "next/image";
import logo from "../../public/images/logo.jpg";

import { useSelectedChatId } from "@/store/user";
import { useState } from "react";
import Voicecall from "../Voicecalls/Voicecall";
// import GroupDropDownMenu from "../Groups/GroupDropDownMenu";
type InfoChatBarProps = {
    name: string;
    lastSeen: string;
};
function InfoChatBar({ name, lastSeen }: InfoChatBarProps) {
    const { setChatId } = useSelectedChatId();

    const [isOpen, setIsOpen] = useState(false);
    const openModal = () => setIsOpen(true);

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

    return (
        <>
            {isOpen && <Voicecall setIsOpen={setIsOpen} name={name} />}
            <div className="flex h-16 w-full items-center justify-between border-2 border-gray-200 bg-white px-5 dark:border-slate-800 dark:bg-black">
                <div className="flex gap-6 hover:bg-gray-200 hover:bg-opacity-45">
                    <button
                        className="rounded-full hover:bg-gray-300"
                        onClick={(event) => handleOnClickArrow(event)}
                        // data-test="chatList-chatRoom-LeftArrowButton"
                    >
                        <LeftArrowIcon />
                    </button>
                    <Image
                        data-test="chatList-chatRoom-image"
                        className="rounded-full"
                        src={logo}
                        alt="logo"
                        width={50}
                        height={50}
                    />
                    <div className="flex flex-col">
                        <p className="font-semibold" data-test="chatList-chatRoom-name">
                            {name}
                        </p>
                        <p className="text-gray-700" data-test="chatList-chatRoom-lastSeen">
                            {" "}
                            {`last seen was ${lastSeen} am`}
                        </p>
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
                    <button className="call-bar">{/* <GroupDropDownMenu  /> */}</button>
                </div>
            </div>
        </>
    );
}

export default InfoChatBar;
