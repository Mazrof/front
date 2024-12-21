"use client";

import { LeftArrowIcon, VoiceCallIcon, VideoCallIcon } from "@/utils/icons";
import Image from "next/image";
import Avatar from "../SideBar/Avatar";
import { useSelectedChatRoom } from "@/store/user";
import { useState, ReactNode } from "react";
import Voicecall from "../Voicecalls/Voicecall";
// import ChannelDropDownMenu from "../Channels/ChannelDropDownMenu";
// import GroupDropDownMenu from "../Groups/GroupDropDownMenu";
import PersonalDropDownMenu from "../PersonalChats/PersonalDropDownMenu";

type InfoChatBarProps = {
    name: string;
    chatType: "personalChat" | "group" | "channel";

    imageURL?: string;
    lastSeen?: string;
    children?: ReactNode; // Combine both InfoChatBarProps and InfoProps
};

function InfoChatBar({
    name,
    imageURL,
    lastSeen,
    chatType = "personalChat",
    children,
}: InfoChatBarProps) {
    const { setChatRoom } = useSelectedChatRoom();
    const [isOpen, setIsOpen] = useState(false);
    const openModal = () => setIsOpen(true);

    const handleOnClickArrow = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        setChatRoom(null);
    };

    const handleVoiceCallClick = (event: React.MouseEvent<HTMLDivElement>) => {
        event.preventDefault();
        openModal();
    };

    const handleVideoCallClick = (event: React.MouseEvent<HTMLDivElement>) => {
        event.preventDefault();
        openModal();
    };

    return (
        <>
            {isOpen && <Voicecall setIsOpen={setIsOpen} name={name} />}
            <div className="flex h-16 w-full items-center justify-between border-2 border-gray-200 bg-white px-5 dark:border-slate-800 dark:bg-black">
                <div className="flex gap-6 hover:bg-gray-200 hover:bg-opacity-45">
                    <button
                        className="rounded-full hover:bg-gray-300"
                        onClick={(event) => handleOnClickArrow(event)}
                        data-test="chatList-chatRoom-LeftArrowButton"
                    >
                        <LeftArrowIcon />
                    </button>
                    {imageURL ? (
                        <Image
                            data-test="chatList-chatRoom-image"
                            className="rounded-full"
                            src={imageURL as string}
                            alt="logo"
                            width={24}
                            height={24}
                        />
                    ) : (<div className="rounded-full object-cover" data-test="chatList-chat-avatar">
                        <Avatar name={name} />
                    </div>)}
                    <div className="flex flex-col">
                        <p className="font-semibold" data-test="chatList-chatRoom-name">
                            {name}
                        </p>
                        {(chatType === "personalChat" &&lastSeen) && (
                            <p className="text-gray-700" data-test="chatList-chatRoom-lastSeen">
                                {" "}
                                {`last seen was ${lastSeen} am`}
                            </p>
                        )}
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
                    {children && <div className="call-bar">{children}</div>}
                </div>
            </div>
        </>
    );
}
// InfoChatBar.ChannelDrop = <ChannelDropDownMenu />;
// InfoChatBar.GroupDrop = <GroupDropDownMenu />;
InfoChatBar.PersonalDrop = <PersonalDropDownMenu />;

export default InfoChatBar;
