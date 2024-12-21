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
import MessageLoading from "@/components/Chats/Message/MessageLoading";

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
    if (loading) return <MessageLoading />;
    if (error)
        return (
            <div className="flex h-full items-center justify-center text-2xl text-red-700 dark:text-red-400">
                <p className="max-w-screen-md rounded-md bg-white p-3 dark:bg-black">
                    You can &apos;t Access this Channel
                </p>
            </div>
        );
    if (!loading && members.length > 0) {
        const myMemberData = members.find((member: ChannelMember) => member.userId === myId);
        if (myMemberData) {
            role = myMemberData.role === "admin" ? "admin" : "member";
        }
    }

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
            {role === "admin" && <InputMessage placeHolder="Message" />}
        </div>
    );
}

export default ChannelChats;
