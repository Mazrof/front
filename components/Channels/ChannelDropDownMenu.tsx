/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ThreeDotsIcon } from "@/utils/icons";
import AddSubscriber from "./AddSubscriber";
import { useState } from "react";
import ChannelSettings from "./ChannelSettings";
import InviteLinkDialog from "./InviteLink";
import { joinChannel } from "@/services/Channel";
import { failResponse } from "@/types/api";
import { toast } from "@/hooks/use-toast";
import DeleteChannel from "./DeleteChannel";
import EditMember from "./EditMember";
import LeaveChannel from "./LeaveChannel";
import DeleteMember from "./DeleteMember";
type channelDropDownMenuProps = {
    myRole: "admin" | "member" | "none";
    name: string;
    imageURL: string;
    channelId: number;
    inviteLink: string;
    canAddComments: boolean;
    privacy: boolean;
};
export default function ChannelDropDownMenu({
    myRole,
    name,
    imageURL,
    channelId,
    inviteLink,
    canAddComments,
    privacy,
}: channelDropDownMenuProps) {
    const [isAddSubscriberOpen, setIsAddSubscriberOpen] = useState(false);
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [isDeleteChannelOpen, setIsDeleteChannelOpen] = useState(false);
    const [isEditMemberOpen, setIsEditMemberOpen] = useState(false);
    const [isDeleteMemberOpen, setIsDeleteMemberOpen] = useState(false);
    const [isLeaveChannelOpen, setIsLeaveChannelOpen] = useState(false);

    const handleJoiningChannel = async () => {
        try {
            const body: { token: string } = { token: inviteLink };
            const response = await joinChannel(body);
            console.log(response);
            if (response.status === "fail") {
                const failApiResponse = response as failResponse;
                toast({
                    title: "Error Joining Channel",
                    description: failApiResponse.message || "Something went wrong.",
                    duration: 5000,
                });
            } else {
                toast({
                    title: "Joined Successfully",
                    description: "You have successfully joined the channel.",
                    duration: 5000,
                });
            }
        } catch (error) {
            toast({
                title: "Unexpected Error",
                description: "An unexpected error occurred. Please try again.",
                duration: 5000,
            });
        }
    };

    {
        /** TODO : Backend Integration */
    }
    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <ThreeDotsIcon />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    {myRole === "none" && (
                        <DropdownMenuItem onClick={handleJoiningChannel}>
                            Join Channel
                        </DropdownMenuItem>
                    )}
                    {myRole === "admin" && (
                        <DropdownMenuItem onClick={() => setIsAddSubscriberOpen(true)}>
                            Add Subscriber
                        </DropdownMenuItem>
                    )}
                    {myRole === "admin" && (
                        <DropdownMenuItem onClick={() => setIsEditMemberOpen(true)}>
                            Edit Member
                        </DropdownMenuItem>
                    )}
                    {myRole === "admin" && (
                        <DropdownMenuItem onClick={() => setIsDeleteMemberOpen(true)}>
                            Delete Member
                        </DropdownMenuItem>
                    )}
                    {myRole === "admin" && (
                        <DropdownMenuItem onClick={() => setIsSettingsOpen(true)}>
                            Settings
                        </DropdownMenuItem>
                    )}
                    {myRole === "admin" && (
                        <DropdownMenuItem onClick={() => setIsDeleteChannelOpen(true)}>
                            DeleteChannel
                        </DropdownMenuItem>
                    )}
                    {myRole !== "none" && (
                        <DropdownMenuItem onClick={() => setIsLeaveChannelOpen(true)}>
                            Leave Channel
                        </DropdownMenuItem>
                    )}
                    {/** TODO : ForWard Message */}
                    <DropdownMenuItem>Forward Message</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            <div className="hidden">
                <AddSubscriber
                    channelId={channelId}
                    isOpen={isAddSubscriberOpen}
                    onClose={() => setIsAddSubscriberOpen(false)}
                />
                <ChannelSettings
                    name={name}
                    imageURL={imageURL}
                    channelId={channelId}
                    canAddComments={canAddComments}
                    privacy={privacy}
                    isOpen={isSettingsOpen}
                    onClose={() => setIsSettingsOpen(false)}
                />
                <DeleteMember
                    isOpen={isDeleteMemberOpen}
                    onClose={() => setIsDeleteMemberOpen(false)}
                    channelId={channelId}
                />
                <DeleteChannel
                    isOpen={isDeleteChannelOpen}
                    channelId={channelId}
                    onClose={() => setIsDeleteChannelOpen(false)}
                />
                <EditMember
                    channelId={channelId}
                    isOpen={isEditMemberOpen}
                    onClose={() => setIsEditMemberOpen(false)}
                />
                <LeaveChannel
                    channelId={channelId}
                    isOpen={isLeaveChannelOpen}
                    onClose={() => setIsLeaveChannelOpen(false)}
                />
            </div>
        </>
    );
}
