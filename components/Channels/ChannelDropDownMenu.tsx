import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ThreeDotsIcon } from "@/utils/icons";
import AddAdmins from "./AddAdmins";
import { useState } from "react";
import AddSubscribers from "./AddSubscribers";
import ChannelSettings from "./ChannelSettings";
import InviteLinkDialog from "./InviteLink";

export default function ChannelDropDownMenu() {
    const [isAddAdminsOpen, setIsAddAdminsOpen] = useState(false);
    const [isAddSubscribersOpen, setIsAddSubscribersOpen] = useState(false);
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [isInviteLinkOpen, setIsInviteLinkOpen] = useState(false);
    const channelId: number = 1;
    {
        /**TODO : Backend Integration */
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
                    <DropdownMenuItem onClick={() => setIsAddSubscribersOpen(true)}>
                        Add Subscriber
                    </DropdownMenuItem>
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
                <AddSubscribers
                    channelId={channelId}
                    isOpen={isAddSubscribersOpen}
                    onClose={() => setIsAddSubscribersOpen(false)}
                />
                <ChannelSettings
                    channelId={channelId}
                    isOpen={isSettingsOpen}
                    onClose={() => setIsSettingsOpen(false)}
                />
                <InviteLinkDialog
                    isOpen={isInviteLinkOpen}
                    onClose={() => setIsInviteLinkOpen(false)}
                    inviteLink="https://google.com"
                />
            </div>
        </>
    );
}
