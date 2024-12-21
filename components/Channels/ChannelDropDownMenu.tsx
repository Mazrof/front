/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ThreeDotsIcon } from "@/utils/icons";
import AddAdmins from "./AddSubscriber";
import { useState } from "react";
import ChannelSettings from "./ChannelSettings";
import InviteLinkDialog from "./InviteLink";
import { joinChannel } from "@/services/Channel";
import { failResponse } from "@/types/api";
import { toast } from "@/hooks/use-toast";
type channelDropDownMenuProps = {
    channelId: number;
    inviteLink: string;
    canAddComments: boolean;
    privacy: boolean;
};
export default function ChannelDropDownMenu({
    channelId,
    inviteLink,
    canAddComments,
    privacy,
}: channelDropDownMenuProps) {
    const [isAddAdminsOpen, setIsAddAdminsOpen] = useState(false);
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [isInviteLinkOpen, setIsInviteLinkOpen] = useState(false);
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
                    <DropdownMenuItem onClick={() => setIsAddAdminsOpen(true)}>
                        Add Admins
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleJoiningChannel}>Join Channel</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setIsSettingsOpen(true)}>
                        Settings
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setIsInviteLinkOpen(true)}>
                        Invite Link
                    </DropdownMenuItem>
                    {/** TODO : ForWard Message */}
                    <DropdownMenuItem>Forward Message</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            <div className="hidden">
                <AddAdmins
                    channelId={channelId}
                    isOpen={isAddAdminsOpen}
                    onClose={() => setIsAddAdminsOpen(false)}
                />
                <ChannelSettings
                    channelId={channelId}
                    canAddComments={canAddComments}
                    privacy={privacy}
                    isOpen={isSettingsOpen}
                    onClose={() => setIsSettingsOpen(false)}
                />
                <InviteLinkDialog
                    isOpen={isInviteLinkOpen}
                    onClose={() => setIsInviteLinkOpen(false)}
                    inviteLink={inviteLink}
                />
            </div>
        </>
    );
}
