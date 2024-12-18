"use client";
import { UploadingAlert } from "@/components/Chats/InputMessage/UploadingAlert";
import InputMessage from "@/components/Chats/InputMessage/InputMessage";
import InfoChatBar from "@/components/Chats/InfoChatBar";

import ChatLayout from "@/components/Chats/ChatLayout";
import { useSelectedChatRoom } from "@/store/user";
import GroupDropDownMenu from "../GroupDropDownMenu";

function GroupChats() {
    const { group } = useSelectedChatRoom();
    const { id, groupSize, community } = group;
    const { name, privacy, imageURL } = community;
    return (
        <div>
            <InfoChatBar name={name} imageURL={imageURL} chatType="group">
                <GroupDropDownMenu groupId={id} groupSize={groupSize} privacy={privacy} />
            </InfoChatBar>
            <UploadingAlert />
            <ChatLayout />
            <InputMessage placeHolder="Message" />
        </div>
    );
}

export default GroupChats;
