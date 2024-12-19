"use client";
import { UploadingAlert } from "@/components/Chats/InputMessage/UploadingAlert";
import InputMessage from "@/components/Chats/InputMessage/InputMessage";
import InfoChatBar from "@/components/Chats/InfoChatBar";

import ChatLayout from "@/components/Chats/ChatLayout";
import { useSelectedChatRoom } from "@/store/user";
import ChannelDropDownMenu from "../ChannelDropDownMenu";
import { ChannelData } from "@/types/channel";
// import { useIsFirstTimeChat, useMessagesStore, useSelectedChatRoom, useWhoAmI } from "@/store/user";
// import { failResponse, genericResponse } from "@/types/api";
// import { useRouter } from "next/navigation";

function ChannelChats() {
    const { selectedChatRoom } = useSelectedChatRoom();
    console.log("channel", selectedChatRoom);
    // Ensure selectedChatRoom is defined before rendering
    if (!selectedChatRoom) return <div>Loading...</div>;
    const { channel } = selectedChatRoom;
    const { id, invitationLink, community, canAddComments } = channel as ChannelData;
    const { name, privacy, imageURL } = community;
    return (
        <div>
            <InfoChatBar name={name} imageURL={imageURL} chatType="channel">
                <ChannelDropDownMenu
                    channelId={id}
                    inviteLink={invitationLink}
                    privacy={privacy}
                    canAddComments={canAddComments}
                />
            </InfoChatBar>
            <UploadingAlert />
            <ChatLayout />
            <InputMessage placeHolder="Message" />
        </div>
    );
}

export default ChannelChats;
