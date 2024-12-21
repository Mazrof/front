"use client";
import { UploadingAlert } from "@/components/Chats/InputMessage/UploadingAlert";
import InputMessage from "@/components/Chats/InputMessage/InputMessage";
import InfoChatBar from "@/components/Chats/InfoChatBar";
import ChatLayout from "@/components/Chats/ChatLayout";
import { useSelectedChatRoom, useWhoAmI } from "@/store/user";
import ChannelDropDownMenu from "../ChannelDropDownMenu";
import { ChannelData } from "@/types/channel";
import { useChannelMembers } from "@/hooks/useChannelMembers";
import { ChannelMember } from "@/types/user";

function ChannelChats() {
    const { selectedChatRoom } = useSelectedChatRoom();
    const { user } = useWhoAmI();
    const myId = user?.user.id;

    if (!selectedChatRoom) return <div>Loading...</div>;
    const { channel } = selectedChatRoom;
    const { id: channelId, invitationLink, community, canAddComments } = channel as ChannelData;
    const { name, privacy, imageURL } = community;
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { members, loading, error } = useChannelMembers(channelId);

    let role: "none" | "admin" | "member" = "none";
    if (!loading && members.length > 0) {
        const myMemberData = members.find((member: ChannelMember) => member.userId === myId);
        if (myMemberData) {
            role = myMemberData.role === "admin" ? "admin" : "member";
        }
    }

    if (loading) return <div>Loading members...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <InfoChatBar name={name} imageURL={imageURL} chatType="channel">
                <ChannelDropDownMenu
                    myRole={role}
                    name={name}
                    imageURL={imageURL}
                    channelId={channelId}
                    inviteLink={invitationLink}
                    privacy={privacy}
                    canAddComments={canAddComments}
                />
            </InfoChatBar>
            <UploadingAlert />
            <ChatLayout />
            {role !== "admin" && <InputMessage placeHolder="Message" />}
        </div>
    );
}

export default ChannelChats;
