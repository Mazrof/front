"use client";
import { UploadingAlert } from "@/components/Chats/InputMessage/UploadingAlert";
import InputMessage from "@/components/Chats/InputMessage/InputMessage";
import InfoChatBar from "@/components/Chats/InfoChatBar";

import ChatLayout from "@/components/Chats/ChatLayout";
import { useSelectedChatRoom } from "@/store/user";
import GroupDropDownMenu from "../GroupDropDownMenu";
import { GroupData } from "@/types/group";

function GroupChats() {
    const { selectedChatRoom } = useSelectedChatRoom();
    console.log("group", selectedChatRoom);
    // Ensure selectedChatRoom is defined before rendering
    if (!selectedChatRoom) return <div>Loading...</div>;
    const { group } = selectedChatRoom;
    const { id, groupSize, community } = group as GroupData;
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
