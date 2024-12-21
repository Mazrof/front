"use client";
import { UploadingAlert } from "@/components/Chats/InputMessage/UploadingAlert";
import InputMessage from "@/components/Chats/InputMessage/InputMessage";
import InfoChatBar from "@/components/Chats/InfoChatBar";

import ChatLayout from "@/components/Chats/ChatLayout";
import { useSelectedChatRoom, useWhoAmI } from "@/store/user";
import GroupDropDownMenu from "../GroupDropDownMenu";
import { GroupData } from "@/types/group";
import { useGroupMembers } from "@/hooks/useGroupMembers";
import { GroupMember } from "@/types/user";

function GroupChats() {
    const { selectedChatRoom } = useSelectedChatRoom();
    console.log("group", selectedChatRoom);
    const { user } = useWhoAmI();
    const myId = user?.user.id;
    // Ensure selectedChatRoom is defined before rendering
    if (!selectedChatRoom) return <div>Loading...</div>;
    const { group } = selectedChatRoom;
    const { id, groupSize, community } = group as GroupData;
    const { name, privacy, imageURL } = community;
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { members, loading, error } = useGroupMembers(id);
    let role: "none" | "admin" | "member" = "none";
    let hasMessagePermissions = false;
    if (!loading && members.length > 0) {
        const myMemberData = members.find((member: GroupMember) => member.userId === myId);
        if (myMemberData) {
            role = myMemberData.role === "admin" ? "admin" : "member";
            hasMessagePermissions = myMemberData.hasMessagePermissions;
        }
    }
    if (loading) return <div>Loading members...</div>;
    if (error) return <div>Error: {error}</div>;
    return (
        <div>
            <InfoChatBar name={name} imageURL={imageURL} chatType="group">
                <GroupDropDownMenu
                    myRole={role}
                    name={name}
                    imageURL={imageURL}
                    groupId={id}
                    groupSize={groupSize}
                    privacy={privacy}
                />
            </InfoChatBar>
            <UploadingAlert />
            <ChatLayout />
            {(role === "admin" || (role === "member" && hasMessagePermissions)) && (
                <InputMessage placeHolder="Message" />
            )}
        </div>
    );
}

export default GroupChats;
